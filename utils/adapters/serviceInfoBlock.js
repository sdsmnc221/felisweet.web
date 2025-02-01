import imageAdapter from './imageAdapter'

const adapter = ({ $prismic, data }) => {
  const { primary, variation } = data

  return {
    variation,
    title: primary?.title,
    subtitles: {
      up: $prismic.asHTML(primary?.subtitle_up),
      down: $prismic.asHTML(primary?.subtitle_down),
    },
    description: $prismic.asHTML(primary?.description),
    illustration: imageAdapter(primary?.illustration),
    warning: {
      text: $prismic.asHTML(primary?.warning),
      icon: imageAdapter(primary?.warning_icon),
      position: primary?.warningblockposition,
    },
    ...(variation === 'isWhite' && {
      illustrations: {
        top: imageAdapter(primary?.illustration_top),
        bottom: imageAdapter(primary?.illustration_bottom),
      },
      attachedTop: primary?.attached_top,
    }),
    hasOuterBorder: primary?.has_outer_border,
  }
}

export default adapter
