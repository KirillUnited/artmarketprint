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
      tags[]->{
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
      tags[]->{
        _id,
        title
      }
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
      tags[]->{
        _id,
        title
      }
    }
  }`;