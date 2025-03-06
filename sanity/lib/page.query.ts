import { defineQuery } from "next-sanity";
import { PROJECT_FIELDS } from "./project.query";

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
          "imageUrl": image.asset->url,
          ctaButtonList[] {
            _key,
            text,
            buttonType,
            link
          }
      }
    }
  }`;

export const FAQ_QUERY = `*[_type == "page"][0] {
    content[_type == "faqs"][0] {
      slides[]{
        _key,
        orientation,
        title,
        subtitle,
        description,
        "imageUrl": image.asset->url,
        ctaButtonList[] {
          _key,
          text,
          buttonType,
          link
        }
    }
  }
}`;
export const SECTION_FIELDS = `
    title,
    description,
    isActive,
    link,
    subtitle
`;
export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
    homePage->{
      content[] {
        _type == "hero" => {
          _key,
          _type,
          slides[]
        },
        _type == "serviceList" => {
          _key,
          _type,
          ${SECTION_FIELDS},
          services[]->
        },
        _type == "imageTextBlock" => {
          _key,
          _type,
          ${SECTION_FIELDS},
          "imageUrl": image.asset->url,
          ctaButtonList[],
          orientation
        },
        _type == "categoryList" => {
          _key,
          _type,
          ${SECTION_FIELDS},
          services[]->
        },
        _type == "projectList" => {
          _key,
          _type,
          ${SECTION_FIELDS},
          showLastProjects,
          projects[]-> {
            ${PROJECT_FIELDS}
          }
        },
        _type == "faqs" => {
          _key,
          _type,
          ${SECTION_FIELDS},
          faqs[]->,
          faqsFooter
        },
        _type == "contactUsBlock" => {
          _key,
          _type,
          ${SECTION_FIELDS},
          showContactForm,
          showContacts,
          showMapEmbed
        },
      }
    }
  }`);
