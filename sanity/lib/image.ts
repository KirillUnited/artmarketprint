import {createImageUrlBuilder, SanityImageSource} from '@sanity/image-url'

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId: 'p5q8f9ac', dataset: 'production' })

export const urlFor = (source: SanityImageSource) => {
    return builder.image(source).format('webp').fit('crop')
}
