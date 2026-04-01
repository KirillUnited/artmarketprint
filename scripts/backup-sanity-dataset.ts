import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

// Load environment variables from .env files
dotenv.config({ path: '.env' });
dotenv.config({ path: '.env.local' });

async function backupSanityDataset() {
  try {
    console.log('🔄 Starting Sanity dataset backup...');

    // Create backups directory if it doesn't exist
    const backupsDir = path.join(__dirname, '..', 'backups');
    if (!fs.existsSync(backupsDir)) {
      fs.mkdirSync(backupsDir, { recursive: true });
      console.log('📁 Created backups directory');
    }

    // Generate timestamped filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupFileName = `sanity-backup-${timestamp}.tar.gz`;
    const backupFilePath = path.join(backupsDir, backupFileName);

    // Get Sanity configuration from environment variables
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

    if (!projectId) {
      throw new Error('NEXT_PUBLIC_SANITY_PROJECT_ID is not defined in environment variables');
    }

    console.log(`📦 Creating backup of Sanity dataset "${dataset}"...`);

    // Execute Sanity CLI export command
    // Note: We're exporting the entire dataset except products which will be deleted
    // The Sanity CLI export command doesn't have a direct way to exclude types,
    // so we'll export everything and note that products will be deleted separately
    const command = `npx sanity dataset export ${dataset} "${backupFilePath}"`;

    try {
      execSync(command, { stdio: 'inherit' });
      console.log(`✅ Backup completed successfully: ${backupFilePath}`);

      // Get file size
      const stats = fs.statSync(backupFilePath);
      const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`📊 Backup file size: ${fileSizeMB} MB`);

      return backupFilePath;
    } catch (execError) {
      throw new Error(`Failed to execute Sanity backup command: ${execError}`);
    }
  } catch (error) {
    console.error('❌ Error during Sanity backup:', error);
    throw error;
  }
}

// Run the backup if this file is executed directly
if (require.main === module) {
  backupSanityDataset()
    .then(() => {
      console.log('🎉 Sanity dataset backup completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Sanity dataset backup failed:', error);
      process.exit(1);
    });
}

export { backupSanityDataset };