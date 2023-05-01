import MyComponent from '../../../../slices/HeaderLinks';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/HeaderLinks'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"title":"social","link":{"link_type":"Web","url":"http://google.com"}}],"primary":{},"slice_type":"header_link","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
