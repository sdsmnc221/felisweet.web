import MyComponent from '../../../../slices/AboutTitleBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/AboutTitleBlock'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"text":[{"type":"heading2","text":"Planning","spans":[]}],"addition_class_text":"dried","image":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1589321578146-4c1ba445cc88"},"additional_class_image":"surrounded"},"slice_type":"about_title_block","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
