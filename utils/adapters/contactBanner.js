import imageAdapter from './imageAdapter'

export default function ($prismic, moduleContactBanner, moduleSocialMedia, moduleCatus) {
  const data = moduleContactBanner?.data
  return {
    title: [$prismic.asHTML(data.title), $prismic.asHTML(moduleCatus)],
    email: {
      label: data.email_label,
      content: data.email,
      link: 'mailto:' + data.email,
    },
    tel: {
      label: data.tel_label,
      content: data.tel,
      link: 'tel:+33' + data.tel.slice(1).replaceAll(' ', ''),
    },
    contactNote: $prismic.asHTML(data.contact_note),
    contactPlanningLabel: data.contact_planning_cta_label,
    illustrations: {
      head: imageAdapter(data.illustration_head).filename,
      foot: imageAdapter(data.illustration_foot).filename,
      socialCats: imageAdapter(data.illustration_social_cats).filename,
    },
    socialMedia: moduleSocialMedia.map(({ data: socialMedia }) => ({
      title: socialMedia.title,
      link: socialMedia.link,
      icon: imageAdapter(socialMedia.icon),
    })),
  }
}
