import MyComponent from '../../../../slices/RectTextBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/RectTextBlock'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"image":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1587613865763-4b8b0d19e8ab"},"image_with_border":true,"image_position":"up"}],"primary":{"text":[{"type":"paragraph","text":"Aliquip veniam dolor ullamco sint sunt id excepteur et est reprehenderit occaecat quis dolore. Ipsum ullamco reprehenderit commodo quis veniam aute labore minim minim.","spans":[]}],"with_border":false},"slice_type":"rect_text_block","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
