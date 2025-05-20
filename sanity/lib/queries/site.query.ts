import { defineQuery } from "next-sanity";

export const salesQuery = defineQuery(`*[_type == "salesType" && isActive][0] {
    _id,
    title,
    description,
    isActive,
    discountPercentage,
    products[0]->
}`);

export const NAVIGATION_QUERY = defineQuery(`*[_type == "navigation"] {
    _id,
    title,
    links[]{
      title,
      "url": slug.current,
      submenu[]{
        title,
        "url": slug.current,
        services[]->{
            title,
            description,
            "url": slug.current,
            image
        }
      }
    }
  }`);

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0] {
    siteContactInfo
  }`);