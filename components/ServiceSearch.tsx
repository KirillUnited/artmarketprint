"use client";

import SearchExperience, { SearchConfig } from "@/components/search";
import { SEARCH_CONFIG, SEARCH_ATTRIBUTES, SEARCH_PARAMETERS } from "@/lib/search-config";

// Main service search component
export function ServiceSearch() {
  // Configuration for Algolia search
  const searchConfig: SearchConfig = {
    applicationId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || "",
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY || "",
    indexName: SEARCH_CONFIG.INDEX_NAME,
    placeholder: SEARCH_CONFIG.PLACEHOLDER,
    hitsPerPage: SEARCH_CONFIG.HITS_PER_PAGE,
    attributes: SEARCH_ATTRIBUTES,
    searchParameters: SEARCH_PARAMETERS,
    buttonText: "Поиск товаров"
  };

  const buttonProps = {
    className: "flex items-center gap-2 px-4 py-2 text-sm border rounded-md hover:bg-muted transition-colors"
  };

  return (
    <SearchExperience
      {...searchConfig}
      buttonProps={buttonProps}
      buttonText={
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <span>Поиск товаров</span>
        </>
      }
    />
  );
}