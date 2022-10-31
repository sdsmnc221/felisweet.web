import MyComponent from '../../../../slices/ReviewsBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ReviewsBlock'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"author":"correct","review":[{"type":"paragraph","text":"Dolor fugiat do culpa sit enim consequat in ad id culpa tempor. Non nulla in qui id eiusmod nulla dolor labore aliqua.","spans":[]}]}],"primary":{"title":[{"type":"paragraph","text":"Lorem enim nisi nostrud sunt occaecat culpa ex do amet ut. Ad laborum ea Lorem fugiat id excepteur. Fugiat incididunt ut fugiat irure labore duis ipsum ut anim voluptate anim do proident enim aliquip.","spans":[]}],"detail_label":"cookies","link":{"link_type":"Web","url":"http://google.com"}},"slice_type":"reviews_block","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
