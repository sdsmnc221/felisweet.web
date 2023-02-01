// import imageAdapter from './imageAdapter'

export default function ($prismic, slice) {
  const { items } = slice

  return {
    formations: items.map((item) => ({
      year: item.year,
      name: $prismic.asHTML(item.name),
      certificate: item.certificate,
      description: $prismic.asHTML(item.description),
    })),
  }
}
