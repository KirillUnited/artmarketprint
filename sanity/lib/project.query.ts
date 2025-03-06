export const PROJECT_FIELDS = `
    _id,
    title,
    "currentSlug": slug.current,
    shortDescription,
    "imageUrl": image.asset->url,
    altText,
    "gallery": gallery[] {
      "imageUrl": asset->url,
      "altText": altText,
      _key
    },
    category_tags[]->{
      _id,
      title
    },
    service_tags[]->{
      _id,
      title
    }
`;
export const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)][0...$limit] {
    ${PROJECT_FIELDS}
  }`;

export const PROJECTS_BY_SERVICE_QUERY = `*[_type == "project"][references(*[_type == "service" && slug.current == $slug]._id)] {
      _id,
      title,
      "currentSlug": slug.current,
      shortDescription,
      "imageUrl": image.asset->url,
      altText,
      gallery[],
      service_tags[]->{
        _id,
        title
      }
  }`;
export const PROJECTS_BY_CATEGORY_QUERY = `*[_type == "project"][references(*[_type == "category" && slug.current == $slug]._id)] {
      _id,
      title,
      "currentSlug": slug.current,
      shortDescription,
      "imageUrl": image.asset->url,
      altText,
      gallery[],
      category_tags[]->{
        _id,
        title
      },
  }`;
export const PROJECT_QUERY = `*[_type == "project"][slug.current == $slug] {
    ${PROJECT_FIELDS},
    description
  }`;
export const PROJECT_SLUGS_QUERY: string = `*[_type == "completedProjects"] {
    projects[] {
      _id,
      "slug": slug.current
    }
  }`;
export const HOME_PAGE_PROJECTS_QUERY = `*[_id == "siteSettings"][0]{
    homePage->{
      content[_type == "projectList"][0]
    }
  }`;
export const RELATED_PROJECTS_QUERY = `*[_type == "project" && _id != $id][0...$limit] {
    ${PROJECT_FIELDS}
}`;