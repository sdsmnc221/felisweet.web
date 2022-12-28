import imageAdapter from './imageAdapter'

const adapter = ({ $prismic, data }) => {
  const { primary } = data

  return {
    title: primary?.title,
    subtitles: {
      up: $prismic.asHTML(primary?.subtitle_up),
      down: $prismic.asHTML(primary?.subtitle_down),
    },
    description: $prismic.asHTML(primary?.description),
    illustration: imageAdapter(primary?.illustration),
  }
}

export default adapter
