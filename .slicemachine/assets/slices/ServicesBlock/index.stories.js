import MyComponent from '../../../../slices/ServicesBlock';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ServicesBlock'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"module_service":{"id":"mock_document_id","link_type":"Document","type":"module_service","tags":[],"lang":"en-us","slug":null,"first_publication_date":"1970-01-01T00:00:01+0000","last_publication_date":"1970-01-01T01:00:00+0000"}}],"primary":{"title":[{"type":"paragraph","text":"Commodo exercitation aute do mollit nostrud fugiat. Sunt fugiat mollit magna enim fugiat ipsum anim ex nisi dolor esse reprehenderit nulla anim.","spans":[]}],"image":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1606248897732-2c5ffe759c04"}},"slice_type":"services_block","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''