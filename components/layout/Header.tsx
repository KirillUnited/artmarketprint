import React from 'react';

import Navbar from '@/components/shared/navbar/Navbar';
import { client } from '@/sanity/client';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import { getSanityDocuments } from '@/sanity/lib/fetch-sanity-data';
import { salesQuery } from '@/sanity/lib/queries';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries/site.query';

/**
 * Header component that fetches navigation and sales data from Sanity and passes it to the Navbar component.
 * @returns {JSX.Element} The Navbar component with navigation and sales data.
 */
export default async function Header() {
    // Fetch navigation data from Sanity
    const navigation = await client.fetch(NAVIGATION_QUERY);

    // Fetch active sales data from Sanity
    const sales: any = (await getSanityDocuments(salesQuery))?.[0] || null;

    // Fetch site settings from Sanity
    const SITE_SETTINGS = (await getSanityDocuments(SITE_SETTINGS_QUERY))?.[0];

    // Return the Navbar component with fetched data
    return <Navbar navigation={navigation[0].links} sales={sales} siteSettings={SITE_SETTINGS} />;
}
