'use client';
import React from 'react';
import MegaDropdownNavbar from '@/components/shared/navbar/MegaDropdownNavbar';

export default function MegaDropdownDemoPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Mega Dropdown Menu Example</h1>
      
      <div className="p-6 border rounded-lg shadow-sm bg-white mb-8">
        <h2 className="text-xl font-semibold mb-4">Complete Navbar Example</h2>
        <p className="mb-6 text-gray-600">
          This example shows how to integrate the MegaDropdownMenu component into a complete navbar layout.
        </p>
        
        <div className="border rounded bg-gray-50">
          <MegaDropdownNavbar />
        </div>
      </div>
      
      <div className="mt-8 p-6 border rounded-lg shadow-sm bg-white">
        <h2 className="text-xl font-semibold mb-4">Usage Instructions</h2>
        <p className="mb-4 text-gray-600">
          The MegaDropdownMenu component supports 1-4 columns and can display multiple categories with icons and descriptions.
        </p>
        <pre className="p-4 bg-gray-100 rounded overflow-x-auto">
          {`import MegaDropdownMenu from '@/components/ui/MegaDropdownMenu';

<MegaDropdownMenu 
  triggerLabel="Услуги" 
  triggerIcon={<WrenchIcon size={18} />}
  categories={servicesCategories} 
  columns={2} 
/>`}
        </pre>
      </div>
    </div>
  );
}