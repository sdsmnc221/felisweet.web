import MyComponent from '../../../../slices/RoundTextBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/RoundTextBlock'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"image":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1589321578146-4c1ba445cc88"},"image_class":"active"}],"primary":{"text":[{"type":"paragraph","text":"Mollit aute irure pariatur consectetur. Est do culpa consequat id consectetur velit dolor laboris duis velit Lorem.","spans":[]}],"text_class":"smaller"},"slice_type":"round_text_block","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
