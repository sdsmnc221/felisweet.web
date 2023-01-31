import MyComponent from '../../../../slices/Formation';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Formation'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"year":11,"name":[{"type":"paragraph","text":"Lorem nulla elit fugiat do incididunt exercitation.","spans":[]}],"certificate":"know","description":[{"type":"paragraph","text":"Quis laborum officia in.","spans":[]}]}],"primary":{"text":[{"type":"paragraph","text":"Non quis anim occaecat quis ex dolor eiusmod dolor sint.","spans":[]}]},"slice_type":"formation","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
