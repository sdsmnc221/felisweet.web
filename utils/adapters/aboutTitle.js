import imageAdapter from './imageAdapter'

export default function ($prismic, slice) {
  const { primary } = slice

  return {
    text: $prismic.asHTML(primary?.text),
    image: imageAdapter(primary?.image),
    classText: primary?.additional_class_text,
    classImage: primary?.additional_class_image,
    textRight: primary?.text_align_right,
  }
}
