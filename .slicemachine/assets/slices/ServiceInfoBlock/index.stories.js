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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":"mostly","subtitle_up":[{"type":"paragraph","text":"Sunt voluptate duis aliqua in aliqua officia nulla.","spans":[]}],"subtitle_down":[{"type":"paragraph","text":"Duis occaecat veniam sint aliqua Lorem anim laborum. Deserunt eu duis nostrud sint laboris. Aliqua mollit deserunt fugiat proident veniam consequat quis dolor occaecat eiusmod do amet ad.","spans":[]}],"description":[{"type":"paragraph","text":"Et commodo qui eu voluptate sit exercitation id nisi nisi amet commodo fugiat voluptate id. Minim laboris eiusmod occaecat incididunt duis duis in excepteur sunt dolore laborum mollit irure fugiat. Qui cillum est ullamco enim consectetur dolore occaecat dolor amet.","spans":[]}],"warning":[{"type":"paragraph","text":"Fugiat nulla aute velit tempor id eiusmod in sunt aliqua. Ex ipsum occaecat voluptate ullamco ipsum.","spans":[]}],"warning_icon":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1471897488648-5eae4ac6686b"},"illustration":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"}},"slice_type":"service_info_block","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
