import MyComponent from '../../../../slices/ProblematicsBlock'
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ProblematicsBlock',
}

export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone,
  },
  methods: {
    resolve() {
      return MyComponent
    },
  },
  data() {
    return {
      mock: {
        variation: 'default',
        version: 'sktwi1xtmkfgx8626',
        items: [{ question: 'review' }],
        primary: {
          text_1: [
            {
              type: 'paragraph',
              text: 'Magna culpa ea adipisicing deserunt consequat et aliquip culpa nostrud.',
              spans: [],
            },
          ],
          text_2: [
            {
              type: 'paragraph',
              text: 'Elit adipisicing qui sunt magna duis ullamco anim ad nisi minim. Id aliquip ad occaecat veniam.',
              spans: [],
            },
          ],
          illustration: {
            dimensions: { width: 900, height: 500 },
            alt: null,
            copyright: null,
            url: 'https://images.unsplash.com/photo-1560457079-9a6532ccb118',
          },
        },
        slice_type: 'problematics_block',
        id: '_Default',
      },
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />',
})
_Default.storyName = ''