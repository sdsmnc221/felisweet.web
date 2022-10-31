import imageAdapter from './imageAdapter'

export default async function ($prismic, id) {
  const moduleService = await $prismic.api.getByID(id)
  const data = moduleService.data
  if (data) {
    return {
      title: data.title,
      description: $prismic.asHTML(data.description),
      imagePos: data.image_position,
      imageSrc: imageAdapter(data.image)?.filename,
    }
  } else return undefined
}
