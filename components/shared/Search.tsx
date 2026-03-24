'use client';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { SearchBox, Hits, useSearchBox } from 'react-instantsearch';
import { InstantSearchNext } from 'react-instantsearch-nextjs';
import Link from 'next/link';

const algoliaAppId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!;
const algoliaApiKey = process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!;

const searchClient = algoliasearch(algoliaAppId, algoliaApiKey);

function SearchResults() {
    const { query } = useSearchBox();

    if (!query) {
        return null;
    }

    return (
        <div className="text-left bg-background p-3 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Результаты для: {query}</h2>
            <Hits
                hitComponent={({ hit }) => (
                    <div className="p-2 border-b">
                        <Link href={`/services/${hit.slug}`}
                            passHref
                            className="text-blue-600 hover:text-blue-700 hover:underline">
                            {hit.title}
                        </Link>
                        <p>{hit.description}</p>
                    </div>
                )}
            />
        </div>
    );
}

export function Search() {
    return (
        <InstantSearchNext
            indexName="services"
            searchClient={searchClient}
            ignoreMultipleHooksWarning={true}
            future={{ preserveSharedStateOnUnmount: true }}
            routing={{
                router: {
                    cleanUrlOnDispose: false,
                    windowTitle(routeState) {
                        const indexState = routeState.indexName || {};
                        return indexState.query
                            ? `Результаты поиска: ${indexState.query}`
                            : 'Результаты поиска';
                    },
                }
            }}
        >
            {/* SearchBox for input */}
            <SearchBox
                placeholder="Поиск услуги..."
                classNames={{
                    input: `
                      border-2 border-gray-500 rounded-lg 
                      p-3 m-2 w-full max-w-2xl mx-auto
                      text-lg
                      focus:border-blue-500 focus:ring-2 focus:ring-blue-400
                      shadow-sm bg-background
                    `,
                    submit: 'hidden',
                    reset: 'hidden',
                }}
            />

            {/* Search results component */}
            <SearchResults />
        </InstantSearchNext>
    );
}