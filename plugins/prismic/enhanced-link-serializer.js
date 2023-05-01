import linkSerializer from './link-serializer'

export default ({ route, store, i18n }, inject) => {
  inject('enhancedLinkSerializer', (link, isDocument) =>
    linkSerializer(link, isDocument, route, store)
  )
}
