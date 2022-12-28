import MyComponent from '../../../../slices/ServiceInfoBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ServiceInfoBlock'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":"asleep","subtitle_up":[{"type":"paragraph","text":"Id aute irure exercitation nostrud do laborum amet laboris veniam nulla do.","spans":[]}],"subtitle_down":[{"type":"paragraph","text":"Enim ex adipisicing tempor eu laborum.","spans":[]}],"description":[{"type":"paragraph","text":"Labore irure labore qui esse ea eiusmod tempor.","spans":[]}],"illustration":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1494173853739-c21f58b16055"}},"slice_type":"service_info_block","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
