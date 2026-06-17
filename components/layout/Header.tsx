import Navbar from '@/components/shared/navbar/Navbar';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import { salesQuery } from '@/sanity/lib/queries';
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries/site.query';
import { sanityFetch } from '@/sanity/lib/sanityFetch';

/**
 * Header component that fetches navigation and sales data from Sanity and passes it to the Navbar component.
 * @returns {JSX.Element} The Navbar component with navigation and sales data.
 */
export default async function Header() {
    // Fetch data from Sanity
    const [navigation, sales, siteSettings] = await Promise.all([
        sanityFetch({ query: NAVIGATION_QUERY }), 
        sanityFetch({ query: salesQuery }), 
        sanityFetch({ query: SITE_SETTINGS_QUERY })
    ]);

    // Return the Navbar component with fetched data
    return <Navbar navigation={navigation[0]?.links ?? []} sales={sales} siteSettings={siteSettings} />;
}
