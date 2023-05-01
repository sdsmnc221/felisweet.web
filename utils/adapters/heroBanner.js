import moduleLogoAdapter from './moduleLogo'
import imageAdapter from './imageAdapter'

const adapter = async ({
  $prismic,
  $enhancedLinkSerializer,
  data,
  moduleLogo,
  moduleLogoIllustration,
}) => {
  return {
    illustration: data.illustration,
    illustrationAlt: data.illustration_alt,
    illustrationText: data.logo_text,
    illustrationLogo:
      moduleLogoIllustration &&
      moduleLogoIllustration.data &&
      (await moduleLogoAdapter(
        $prismic,
        $enhancedLinkSerializer,
        moduleLogoIllustration.id
      )),
    text: data.text,
    logo:
      moduleLogo &&
      moduleLogo.data &&
      (await moduleLogoAdapter(
        $prismic,
        $enhancedLinkSerializer,
        moduleLogo.id
      )),
    bubbleChat: imageAdapter(data.bubble_chat),
  }
}

export default adapter
