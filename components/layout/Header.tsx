import React from 'react';

import Navbar from '@/components/shared/Navbar';
import {client} from '@/sanity/client';
import {NAVIGATION_QUERY} from '@/sanity/lib/queries';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';

export default async function Header() {
	const navigation = await client.fetch(NAVIGATION_QUERY);
	const sales = await getSanityDocuments(`*[_type == "salesType" && isActive][0]`) || null;

	return <Navbar navigation={navigation[0].links} sales={sales} />;
}
