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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"image":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1600804931749-2da4ce26c869"}}],"primary":{"text":[{"type":"paragraph","text":"Lorem aute incididunt sint labore consectetur fugiat excepteur eu veniam anim.","spans":[]}]},"slice_type":"round_text_block","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''