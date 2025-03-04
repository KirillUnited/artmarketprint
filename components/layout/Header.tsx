import React from 'react';

import Navbar from '@/components/shared/Navbar';
import { client } from '@/sanity/client';
import { NAVIGATION_QUERY } from '@/sanity/lib/queries';
import { getSanityDocuments } from '@/lib/fetch-sanity-data';
import { defineQuery } from 'next-sanity';

export default async function Header() {
	const navigation = await client.fetch(NAVIGATION_QUERY);
	const sales: any = await getSanityDocuments(defineQuery(`*[_type == "salesType" && isActive][0] {
		_id,
		title,
		description,
		isActive,
		discountPercentage,
		products[0]->
		}`)) || null;

	console.log(sales)

	return <Navbar navigation={navigation[0].links} sales={sales} products={sales?.products} />;
}
