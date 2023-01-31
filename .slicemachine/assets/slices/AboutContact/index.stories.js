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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"link":{"link_type":"Web","url":"http://twitter.com"},"text":"fix","icon":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1587613865763-4b8b0d19e8ab"}}],"primary":{"cta_text":[{"type":"paragraph","text":"Pariatur ad adipisicing voluptate eu esse laboris fugiat eiusmod elit dolore.","spans":[]}],"cta_image":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1494173853739-c21f58b16055"},"cta_link":{"link_type":"Web","url":"https://slicemachine.dev"}},"slice_type":"about_contact","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
