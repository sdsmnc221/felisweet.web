export default (link, isDocument, route, store) => {
  if (!link) {
    process.env.NODE_ENV !== 'production' &&
      // eslint-disable-next-line no-console
      console.warn("Missing Link. Please check you didn't mispell a field name")
    return null
  }

  if (!link.tags) {
    link.tags = []
  }

  if (link.link_type === 'Document' || isDocument) {
    return { field: { ...link } }
  } else if (link.link_type === 'Web') {
    const href = link.url
    return {
      href,
      external: link.target === '_blank' ? 'blank' : '',
    }
  } else if (link.type === 'application/pdf' || link.type?.includes('image')) {
    return {
      href: link.url,
      external: 'blank',
    }
  } else if (
    link.link_type === 'Any' ||
    link.link_type === null ||
    link.link_type === undefined
  ) {
    return null
  }
}
