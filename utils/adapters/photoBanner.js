import imageAdapter from './imageAdapter'

const adapter = ({ $prismic, data }) => {
  return {
    image: imageAdapter(data.image),
    bubbleDescription: {
      title: data.title,
      text: $prismic.asHTML(data.description),
      desktop: imageAdapter(data.bubble_desktop),
      mobile: imageAdapter(data.bubble_mobile),
    },
    bubbleImage: imageAdapter(data.bubble_image),
  }
}

export default adapter
