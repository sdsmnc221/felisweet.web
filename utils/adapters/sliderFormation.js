import imageAdapter from './imageAdapter'

export default function ($prismic, slice) {
  const { primary, items } = slice

  return {
    cta: {
      text: primary?.cta_text,
      image: imageAdapter(primary?.cta_bg_image),
    },
    formations: items.map((item) => ({
      year: item.year,
      name: $prismic.asHTML(item.name),
      certificate: item.certificate,
      description: $prismic.asHTML(item.description),
    })),
  }
}
