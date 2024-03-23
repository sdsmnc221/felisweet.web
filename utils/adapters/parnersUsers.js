import imageAdapter from './imageAdapter'

export default function ($prismic, $enhancedLinkSerializer, data) {
  return data.map((obj) => ({
    name: obj?.name,
    description: $prismic.asHTML(obj?.description),
    fullWidth: obj?.fullWidth,
    link: $enhancedLinkSerializer(obj?.link),
    logo: imageAdapter(obj?.logo),
  }))
}
