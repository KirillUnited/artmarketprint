export const PROJECTS_QUERY = `*[_type == "completedProjects"]{
    title,
    subtitle,
    description,
    projects[]{
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