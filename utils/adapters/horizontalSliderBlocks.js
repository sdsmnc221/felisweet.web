import imageAdapter from './imageAdapter'

export default function ({ $prismic, data }) {
  if (!data) return null

  const { primary, items } = data

  return {
    top: {
      illustration: imageAdapter(primary?.illustration_top),
      text: $prismic.asHTML(primary?.top_block_text),
    },
    bottom: {
      illustration: imageAdapter(primary?.illustration_bottom),
      text: $prismic.asHTML(primary?.bottom_block_text),
    },
    sliders: items.map((item) => $prismic.asHTML(item.block_text)),
  }
}
