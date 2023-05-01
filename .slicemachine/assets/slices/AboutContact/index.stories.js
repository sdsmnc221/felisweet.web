import MyComponent from '../../../../slices/AboutContact';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/AboutContact'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"link":{"link_type":"Web","url":"https://slicemachine.dev"},"text":"earth","icon":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1587653915936-5623ea0b949a"}}],"primary":{"cta_text":[{"type":"paragraph","text":"Amet exercitation ex duis excepteur pariatur.","spans":[]}],"cta_image":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"},"cta_link":{"link_type":"Web","url":"http://google.com"}},"slice_type":"about_contact","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
