<template>
  <SliceSimulator v-slot="{ slices }" :state="state">
    <SliceZone :slices="slices" :components="components" />
  </SliceSimulator>
</template>

<script>
import { SliceSimulator } from '@prismicio/slice-simulator-vue'
import { components } from '~/slices'

export default {
  components: {
    SliceSimulator,
  },
  data() {
    return { components }
  },
}
</script>
