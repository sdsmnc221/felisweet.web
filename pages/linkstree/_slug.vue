<template>
  <atom-wrapper tag="main" class="linkstree">
    <scroll-reveal-wrapper>
      <ul class="linkstree__list">
        <li v-for="link in links" :key="link.linklabel">
          <a :href="link.linkurl.url" target="_blank">{{ link.linklabel }}</a>
        </li>
      </ul>
    </scroll-reveal-wrapper>

    <div
      v-if="illustration && pageTitle && pageDescription"
      class="linkstree__illustration"
    >
      <div class="linkstree__content">
        <h1 class="linkstree__title font-childlike">{{ pageTitle }}</h1>
        <div v-html="pageDescription" class="linkstree__description"></div>
      </div>
      <img :src="illustration.url" :alt="illustration.alt" />
    </div>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../components/atoms/AtomWrapper/atom-wrapper.vue'
import ScrollRevealWrapper from '../../components/atoms/ScrollRevealWrapper/scroll-reveal-wrapper.vue'

export default {
  name: 'LinksPage',
  components: {
    AtomWrapper,
    ScrollRevealWrapper,
  },
  layout: 'linkstree',
  props: {},
  async asyncData({ $prismic, error, params }) {
    const document = await $prismic.api.getByUID('linkstreepage', params.slug)

    const data = document?.data

    if (data) {
      return {
        pageTitle: data.pagetitle,
        pageDescription: $prismic.asHTML(data.pagedescription),
        illustration: data.linksillustration,
        links: data.links,
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },

  mounted() {},
}
</script>

<style lang="scss">
.linkstree {
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  background: linear-gradient(180deg, #eef9ff 0%, #9eb9b6 100%);

  .scroll-reveal:first-of-type {
    @include rem(margin-top, $spacing-5xl);
  }

  &__content {
    position: absolute;
    bottom: 32px;
    height: 50vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  &__title {
    @include rem(font-size, $font-size-heading-4);
    @include rem(padding, 0 $spacing-xl);
    text-align: center;
    color: $color-jellybean-blue;
  }

  &__description {
    width: 80vw;

    * {
      @include rem(font-size, $font-size-body-xs);
    }

    strong,
    em {
      font-weight: 700;
    }

    @include rem(padding, $spacing-s);
    text-align: center;
    color: $color-jellybean-blue;
    background-color: transparentize(
      $color: $color-outremer-blue,
      $amount: 0.16
    );
    border-radius: 24px;
  }

  &__list {
    position: absolute;
    top: 32px;
    left: 50%;
    transform: translateX(-50%);
    width: 72vw;

    @include rem(padding, $spacing-m $spacing-xl);
    list-style: none;

    li {
      @include rem(margin, $spacing-m 0);
      position: relative;

      a {
        text-decoration: none !important;
        color: $color-shakespear-blue !important;

        @include rem(font-size, $font-size-heading-5);

        transition: color 0.32s ease;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background: $color-service-blue;
        transition: height 0.32s ease, bottom 0.64s ease;
      }

      &:hover {
        a {
          color: $color-service-blue !important;
        }

        &::after {
          height: 2px;
          bottom: -8px;
        }
      }
    }
  }

  &__illustration {
    position: fixed;
    bottom: 0;

    img {
      display: block;
      width: 100vw;
      height: auto;
    }
  }

  @media (orientation: landscape) {
    background: $color-jellybean-blue;

    &__list {
      left: 40vw;
      width: 60vw;
      top: 50%;
      transform: translateY(-50%);

      li {
        position: relative;

        a {
          color: $color-link-water !important;
        }

        &::after {
          left: 0;
          width: 200%;
          height: 1px;
          background: $color-service-blue;
        }

        &:hover {
          a {
            color: $color-white !important;
          }

          &::after {
            height: 10px;
            bottom: -16px;
          }
        }
      }
    }

    &__content {
      top: 10vh;
      width: 100%;

      justify-content: center;
    }

    &__title {
      text-align: center;
      color: $color-link-water;
      @include rem(font-size, $font-size-body-l);
    }

    &__description {
      width: 80%;

      background-color: transparentize(
        $color: $color-outremer-blue,
        $amount: 0.48
      );

      @include rem(padding, 10px);

      * {
        @include rem(font-size, $font-size-body-xxs);
      }
    }

    &__illustration {
      height: 100vh;
      overflow: hidden;
      border-right: 10px solid $color-service-blue;
      background: linear-gradient(180deg, $color-nepal-blue 0%, #9eb9b6 100%);

      display: flex;
      align-items: flex-end;

      img {
        width: auto;
        max-width: 40vw;
        height: 50vh;
      }
    }
  }

  @media #{$mq-medium} {
    background: $color-jellybean-blue;

    &__list {
      left: 40vw;
      width: 60vw;
      top: 50%;
      transform: translateY(-50%);

      li {
        @include rem(margin, $spacing-3xl 0);
        position: relative;

        a {
          color: $color-link-water !important;

          @include rem(font-size, $font-size-heading-3);
        }

        &::after {
          left: 0;
          width: 200%;
          height: 1px;
          background: $color-service-blue;
        }

        &:hover {
          a {
            color: $color-white !important;
          }

          &::after {
            height: 10px;
            bottom: -16px;
          }
        }
      }
    }

    &__content {
      top: 10vh;
      width: 100%;

      justify-content: center;
    }

    &__title {
      @include rem(font-size, $font-size-heading-1);
      @include rem(padding, $spacing-xl);

      text-align: center;
      color: $color-link-water;
    }

    &__description {
      width: 80%;

      * {
        @include rem(font-size, $font-size-body-l);
      }

      @include rem(padding, $spacing-m);

      background-color: transparentize(
        $color: $color-outremer-blue,
        $amount: 0.48
      );
    }

    &__illustration {
      height: 100vh;
      overflow: hidden;
      border-right: 10px solid $color-service-blue;
      background: linear-gradient(180deg, $color-nepal-blue 0%, #9eb9b6 100%);

      display: flex;
      align-items: flex-end;

      img {
        width: auto;
        max-width: 40vw;
        height: 50vh;
      }
    }
  }

  @media #{$mq-tablet} {
    &__content {
      top: -4.8vh;
    }

    &__title {
      @include rem(font-size, $font-size-heading-2);
    }

    &__description {
      width: 72vw;

      * {
        @include rem(font-size, $font-size-body-l);
      }
    }

    &__list {
      li {
        a {
          @include rem(font-size, $font-size-heading-4);
        }
      }
    }
  }
}
</style>
