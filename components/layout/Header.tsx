import React from 'react';
import { defineQuery } from 'next-sanity';

import Navbar from '@/components/shared/Navbar';
import { client } from '@/sanity/client';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';

/**
 * Header component that fetches navigation and sales data from Sanity and passes it to the Navbar component.
 * @returns {JSX.Element} The Navbar component with navigation and sales data.
 */
export default async function Header() {
    // Fetch navigation data from Sanity
    const navigation = await client.fetch(NAVIGATION_QUERY);

    // Fetch active sales data from Sanity
    const salesQuery = defineQuery(`*[_type == "salesType" && isActive][0] {
        _id,
        title,
        description,
        isActive,
        discountPercentage,
        products[0]->
    }`);
    const sales: any = await getSanityDocuments(salesQuery) || null;

    // Return the Navbar component with fetched data
    return <Navbar navigation={navigation[0].links} products={sales?.products} sales={sales} />;
}
