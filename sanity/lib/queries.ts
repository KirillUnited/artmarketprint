export const SERVICES_QUERY = `*[
  _type == "service"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{title,
    description,
    image, 
    price,
    "currentSlug": slug.current}`;

export const CATEGORIES_QUERY = `*[
  _type == "category"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{title,
    description,
    image, 
    price,
    "currentSlug": slug.current}`;

export const PROJECTS_QUERY = `*[_type == "completedProjects"]{
    title,
    subtitle,
    description,
    projects[][0...$limit]{
      title,
      "currentSlug": slug.current,
      shortDescription,
      "imageUrl": image.asset->url,
      altText,
      category_tags[]->{
        _id,
        title
      },
      service_tags[]->{
        _id,
        title
      }
    }
  }`;

export const PROJECTS_BY_SERVICE_QUERY = `*[_type == "completedProjects"] {
    projects[references(*[_type == "service" && slug.current == $slug]._id)]{
      title,
      "currentSlug": slug.current,
      shortDescription,
      "imageUrl": image.asset->url,
      altText,
      service_tags[]->{
        _id,
        title
      }
    }
  }`;
export const PROJECTS_BY_CATEGORY_QUERY = `*[_type == "completedProjects"] {
    projects[references(*[_type == "category" && slug.current == $slug]._id)]{
      title,
      "currentSlug": slug.current,
      shortDescription,
      "imageUrl": image.asset->url,
      altText,
      category_tags[]->{
        _id,
        title
      },
    }
  }`;
export const PROJECT_QUERY = `*[_type == "completedProjects"] {
    projects[slug.current == $slug]{
      title,
      "currentSlug": slug.current,
      shortDescription,
      description,
      "imageUrl": image.asset->url,
      altText,
      category_tags[]->{
        _id,
        title
      },
      service_tags[]->{
        _id,
        title
      }
    }
  }`;
export const PROJECT_SLUGS_QUERY: string = `*[_type == "completedProjects"] {
    projects[] {
      "slug": slug.current
    }
  }`;

export const NAVIGATION_QUERY = `*[_type == "navigation"] {
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
          "url": slug.current
      }
    }
  }
}`;