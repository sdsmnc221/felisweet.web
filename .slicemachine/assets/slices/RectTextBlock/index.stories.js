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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"image":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"},"image_with_border":false,"image_position":"down","image_class":"silly"}],"primary":{"text":[{"type":"paragraph","text":"Laborum occaecat id aliquip. Est sint reprehenderit proident qui sint sunt non.","spans":[]}],"with_border":true,"big_text":false,"text_class":"return"},"slice_type":"rect_text_block","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
