<template>
  <div class="embedded-page">
    <IframeWrapper
      :iframe-url="nuxt3Url"
      :title="pageTitle"
      :height="800"
      @iframe-loaded="handleIframeLoaded"
    />
  </div>
</template>

<script>
import IframeWrapper from '@/components/organisms/IframeWrapper/IframeWrapper.vue'

export default {
  name: 'FaciliCatPage',
  components: {
    IframeWrapper,
  },
  data() {
    return {
      nuxt3Url: 'https://facilicat.felisweet.com/',
      pageTitle: "Facili'Cat - Un nouveau service de FeliSweet",
      // Add your SEO metadata here
      seoMetadata: {
        title: "Facili'Cat - Un nouveau service de FeliSweet",
        description:
          "Nous aidons les personnes en situation de handicap, ou ayant des difficultés à s'occuper pleinement de leurs chats.",
        keywords:
          'catsitting, comportementaliste, cats, 91, essonne 91, cat sitting, catsitting91',
      },
    }
  },
  head() {
    return {
      title: this.seoMetadata.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.seoMetadata.description,
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.seoMetadata.keywords,
        },
        // Add structured data for better SEO
        {
          hid: 'structured-data',
          type: 'application/ld+json',
          json: {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: this.seoMetadata.title,
            description: this.seoMetadata.description,
          },
        },
      ],
      // Add preconnect for performance
      link: [
        {
          rel: 'preconnect',
          href: new URL(this.nuxt3Url).origin,
        },
      ],
    }
  },
  methods: {
    handleIframeLoaded() {
      // Handle any post-load operations
      console.log('Iframe content loaded')
    },
  },
}
</script>
