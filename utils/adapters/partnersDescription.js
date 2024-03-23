export default function ($prismic, data) {
  return {
    text: $prismic.asHTML(data),
  }
}
