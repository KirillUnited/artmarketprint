"use client";

import { Highlight } from "react-instantsearch";
import type { Hit } from "instantsearch.js";
import { ServiceSearchHit } from "@/types/service-search";
import { SEARCH_CONFIG } from "@/lib/search-config";
import { Card } from "@heroui/card";
import { Image } from "@heroui/image";
import Link from "next/link";

interface SearchHitProps {
  hit: Hit<ServiceSearchHit>;
}

export function SearchHit({ hit }: SearchHitProps) {
  return (
    <Link href={`/services/${hit.slug}`} className="block">
      <Card className="flex flex-row items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
        {hit.imageUrl ? (
          <div className="w-16 h-16 flex-shrink-0">
            <Image
              src={hit.imageUrl}
              alt={hit.title}
              width={64}
              height={64}
              className="object-cover rounded-md"
            />
          </div>
        ) : (
          <div className="w-16 h-16 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
              <circle cx="9" cy="9" r="2"></circle>
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
            </svg>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground">
            <Highlight attribute="title" hit={hit} />
          </h3>

          {hit.description && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              <Highlight attribute="description" hit={hit} />
            </p>
          )}

          {hit.price && (
            <p className="text-sm font-medium text-foreground mt-2">
              {hit.price}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
}