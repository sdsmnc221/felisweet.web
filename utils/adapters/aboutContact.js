import imageAdapter from './imageAdapter'

export default function ($prismic, $enhancedLinkSerializer, slice) {
  const { primary, items } = slice

  console.log(slice)

  return {
    cta: {
      text: $prismic.asHTML(primary?.cta_text),
      image: imageAdapter(primary?.cta_image),
      link: $enhancedLinkSerializer(primary?.cta_link),
    },
    links: items.map((item) => ({
      text: item.text,
      image: imageAdapter(item.icon),
      link: $enhancedLinkSerializer(item.link),
    })),
  }
}
