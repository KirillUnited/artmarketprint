import { QueryParams } from "next-sanity"
import { client } from "../client"

export const sanityFetch = ({
    query,
    params = {},
    revalidate = 60, // default revalidation time in seconds
    tags = [],
}: {
    query: string,
    params?: QueryParams
    revalidate?: number | false
    tags?: string[]
}) => {
    return client.fetch(query, params, {
        next: {
            revalidate: tags.length ? false : revalidate, // for simple, time-based revalidation
            tags, // for tag-based revalidation
        },
    })
}
