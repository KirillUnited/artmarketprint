import React from 'react';

import Navbar from '@/components/shared/Navbar';
import {client} from '@/sanity/client';
import {NAVIGATION_QUERY} from '@/lib/queries';

export default async function Header() {
	const navigation = await client.fetch(NAVIGATION_QUERY);

	return <Navbar navigation={navigation[0].links} />;
}
