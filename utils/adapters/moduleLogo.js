import imageAdapter from './imageAdapter'

export default async function ($prismic, $enhancedLinkSerializer, id) {
  const moduleLogo = await $prismic.api.getByID(id)
  const data = moduleLogo.data

  if (data) {
    return {
      image: imageAdapter(data.image, data.alt),
      link: $enhancedLinkSerializer(data.link),
      ...(data.size ? { size: data.size + 'vw' } : {}),
      noLink: data.noLink,
    }
  } else return undefined
}
