import { execSync } from 'child_process';

const DOC_TYPE = 'product'; // Replace with the type you want to delete
const PROJECT_ID = 'p5q8f9ac'; // Replace with your Sanity project ID
const DATASET = 'production'; // Replace with your Sanity dataset
const API_VERSION = '2024-01-01';
const API_HOST = `https://${PROJECT_ID}.api.sanity.io`;
const HOSTNAME = `amp`

async function deleteAllOfTypeWithCLI() {
    try {
        // Query all document IDs of the specified type using the Sanity CLI
        const queryCmd = `npx sanity documents query "*[_type=='${DOC_TYPE}']{_id}" --project ${PROJECT_ID} --dataset ${DATASET} --api-version ${API_VERSION} --hostname ${HOSTNAME}`;
        const queryResult = execSync(queryCmd, { encoding: 'utf-8' });

        // Parse the JSON output
        const docs = JSON.parse(queryResult);

        if (docs.length === 0) {
            console.log(`No documents of type "${DOC_TYPE}" found.`);
            return;
        }

        // Delete each document using the Sanity CLI
        for (const doc of docs) {
            const deleteCmd = `npx sanity documents delete "${doc._id}" --project ${PROJECT_ID} --dataset ${DATASET} --api-version ${API_VERSION} --host ${HOSTNAME}`;
            execSync(deleteCmd, { stdio: 'inherit' });
            console.log(`Deleted document: ${doc._id}`);
        }

        console.log(`All documents of type "${DOC_TYPE}" have been deleted using Sanity CLI.`);
    } catch (err) {
        console.error('Error deleting documents with Sanity CLI:', err);
    }
}

deleteAllOfTypeWithCLI();