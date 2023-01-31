import MyComponent from '../../../../slices/PointDeDepart';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/PointDeDepart'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":[{"type":"heading2","text":"Glass","spans":[]}]},"slice_type":"point_de_depart","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
