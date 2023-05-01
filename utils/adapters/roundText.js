import imageAdapter from './imageAdapter'

export default function ($prismic, slice) {
  const { primary, items } = slice

  return {
    text: $prismic.asHTML(primary?.text),
    textClass: primary?.text_class,
    images:
      items.length &&
      items.map(({ image, image_class: imageClass }) => ({
        image: imageAdapter(image),
        imageClass,
      })),
  }
}
