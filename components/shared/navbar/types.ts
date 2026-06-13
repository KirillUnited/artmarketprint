import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { SanityDocument } from 'next-sanity';

/**
 * A single entry in the navigation (top-level or submenu).
 */
export interface NavSubmenuService {
	title: string;
	description?: string;
	url?: string;
	image?: SanityImageSource;
}

export interface NavSubmenu {
	title: string;
	url?: string;
	services?: NavSubmenuService[];
}

export interface NavLink {
	title: string;
	url?: string;
	submenu?: NavSubmenu[];
}

/**
 * Active sales banner document.
 */
export interface SalesProductRef {
	slug?: { current?: string };
}

export interface Sales {
	_id?: string;
	title?: string;
	description?: string;
	isActive?: boolean;
	discountPercentage?: number;
	products?: SalesProductRef | null;
}

/**
 * Site contact info, mirrored from the Sanity schema.
 */
export interface SitePhone {
	_key: string;
	number: string;
	link: string;
}

export type SocialPlatform = 'instagram' | 'telegram' | 'viber' | 'whatsapp';

export interface SiteSocialLink {
	platform: SocialPlatform;
	url: string;
	title?: string;
	showInNav?: boolean;
}

export interface SiteContactInfo {
	phones?: SitePhone[];
	socialLinks?: SiteSocialLink[];
}

export interface SiteSettings {
	siteContactInfo?: SiteContactInfo;
}

/**
 * Public props for the Navbar orchestrator.
 * `siteSettings` is typed loosely on the Sanity side, so we accept the full document.
 */
export interface NavbarProps {
	navigation: NavLink[];
	sales: Sales | null;
	siteSettings: SanityDocument<SiteSettings> | null;
}

/**
 * Shared props for both desktop and mobile variants.
 * `itemsCount` is the basket item count from the client store.
 */
export interface NavbarVariantProps {
	navigation: NavLink[];
	siteSettings: SiteSettings | null;
	itemsCount: number;
}
