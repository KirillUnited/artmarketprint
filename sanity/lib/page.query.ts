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

export const HERO_QUERY = `*[_type == "page"][0] {
      content[_type == "hero"][0] {
        slides[]{
          _key,
          orientation,
          title,
          subtitle,
          description,
          "imageUrl": image.asset->url
      }
    }
  }`;