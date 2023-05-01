import imageAdapter from './imageAdapter'

export default function ($prismic, slice) {
  const { primary, items } = slice

  return {
    text: $prismic.asHTML(primary?.text),
    withBorder: primary?.with_border,
    bigText: primary?.big_text,
    textClass: primary?.text_class,
    images: {
      up:
        items.length &&
        items
          .filter(({ image_position: imagePos }) => imagePos === 'up')
          .map((image) => ({
            image: imageAdapter(image.image),
            withBorder: image.image_with_border,
            class: image.image_class,
          })),
      down:
        items.length &&
        items
          .filter(({ image_position: imagePos }) => imagePos === 'down')
          .map((image) => ({
            image: imageAdapter(image.image),
            withBorder: image.image_with_border,
            class: image.image_class,
          })),
    },
  }
}
