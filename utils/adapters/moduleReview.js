export default function ($prismic, item) {
  return {
    author: item.author,
    text: $prismic.asHTML(item.review),
  }
}
