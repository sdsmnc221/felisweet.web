import MyComponent from '../../../../slices/HorizontalSliderBlocks';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/HorizontalSliderBlocks'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"block_text":[{"type":"paragraph","text":"Aute occaecat est duis aliquip Lorem dolor Lorem eiusmod sint. Anim esse dolore dolor eiusmod elit qui sunt aliqua est veniam velit.","spans":[]}]}],"primary":{"illustration_top":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1587840171670-8b850147754e"},"top_block_text":[{"type":"paragraph","text":"Ad excepteur aliqua enim officia eu sunt. Eu ex minim commodo ad id aliqua dolor fugiat. Proident nisi ea anim nulla culpa consequat.","spans":[]}],"illustration_bottom":{"dimensions":{"width":900,"height":500},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1579931794097-0ad001e51edb"},"bottom_block_text":[{"type":"paragraph","text":"Aute ad laboris consectetur adipisicing laboris fugiat labore ullamco duis. Incididunt sunt ut ad enim quis dolore consectetur culpa.","spans":[]}]},"slice_type":"horizontal_slider_blocks","id":"_Default"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
