<template>
  <atom-wrapper class="about-contact">
    <div v-if="data.links.length > 0" class="links">
      <atom-image class="yarn" src="/images/illus-services-yarn.svg" alt="" />
      <atom-image class="bowl" src="/images/illus-services-bowl.png" alt="" />
      <a
        v-for="(link, index) in data.links"
        :key="`about-social-link${index}`"
        :href="link.link.href"
        target="_blank"
      >
        <atom-image :src="link.image.filename" :alt="link.image.alt" />
        <span>{{ link.text }}</span>
      </a>
    </div>
    <div v-if="data.cta" class="cta-content">
      <a :href="`/${data.cta.link.field.uid}`">
        <span v-html="data.cta.text" />
      </a>
      <atom-image :src="data.cta.image.filename" :alt="data.cta.image.alt" />
    </div>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import AtomImage from '../../atoms/AtomImage'

export default {
  name: 'AboutContact',
  components: { AtomWrapper, AtomImage },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.about-contact {
  .links {
    padding: 160px;

    .yarn {
      position: absolute;
      width: 160px;
      height: 160px;
      top: -6%;
      right: -12%;
    }

    .bowl {
      position: absolute;
      top: 16%;
      left: -12%;
      width: 160px;
      height: 160px;
    }

    a {
      position: absolute;
      display: block;
      text-decoration: none;
      padding: $spacing-xs $spacing-s;
      text-align: center;

      &:first-of-type {
        width: 92vw;
        top: 5%;
        left: 50%;
        transform: rotate(6.19deg) translateX(-50%);
      }

      &:nth-of-type(2) {
        width: 78vw;
        left: 50%;
        transform: rotate(-3.52deg) translateX(-50%);
      }

      &:last-of-type {
        width: 58vw;
        top: 32%;
        left: 50%;
        transform: rotate(-6.66deg) translateX(-50%);
      }

      &::before {
        content: '';
        position: absolute;
        z-index: 0;
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border-radius: 16px;
        background-color: $color-light-blue;
        opacity: 0.64;
      }

      * {
        position: relative;
        z-index: 1;
        font-family: $font-family-quicksand;
        font-style: normal;
        font-weight: $weight-bold;
        @include rem(font-size, $font-size-body-l);
        line-height: 25px;
        text-align: center;
        letter-spacing: -0.05em;
        color: $color-shakespear-blue;
        text-decoration: none;
      }

      .atom-image {
        display: inline-block;
        width: 24px;
        height: 24px;
      }
    }
  }

  .cta-content {
    position: relative;

    a {
      position: relative;
      transform: rotate(-9.71deg) translate(32%, 132px);
      display: block;
      padding: 12px;
      text-decoration: none;
      width: 50vw;

      &::before {
        content: '';
        position: absolute;
        z-index: 1;
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border-radius: 64px;
        background-color: $color-light-blue;
        opacity: 0.64;
      }

      &::after {
        content: '';
        position: absolute;
        z-index: 0;
        display: block;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: calc(100% + 24px);
        height: calc(100% + 24px);
        background: none;
        border: 3.2px solid #4289b3;
        border-radius: 64px;
        mix-blend-mode: multiply;
      }

      * {
        position: relative;
        z-index: 2;
        font-family: $font-family-inconsolata;
        font-style: normal;
        font-weight: 500;
        @include rem(font-size, $font-size-body-xl);
        line-height: 100%;
        text-align: center;
        letter-spacing: -0.05em;
        color: $color-shakespear-blue;
        text-decoration: none;
      }

      strong {
        font-weight: 800;
      }
    }

    .atom-image {
      width: 324px;
      height: 472px;
      transform: translate(32%, 24%);
    }
  }

  @media #{$mq-medium} {
    .links {
      display: flex;
      padding: 80px 160px;

      .yarn {
        width: 160px;
        height: 160px;
        top: -16%;
        right: 12%;
      }

      .bowl {
        top: 32%;
        left: 12%;
        width: 160px;
        height: 160px;
      }

      a {
        padding: $spacing-m $spacing-s;
        position: relative;
        &:first-of-type {
          width: 32vw;
          left: -8%;
          transform: rotate(6.19deg);
        }

        &:nth-of-type(2) {
          width: 32vw;
          left: 0;
          transform: rotate(-3.52deg);
        }

        &:last-of-type {
          width: 32vw;
          left: 8%;
          transform: rotate(-6.66deg);
        }

        &::before {
          border-radius: 32px;
        }
      }
    }

    .cta-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      a {
        width: 32vw;
        padding: 24px;
        transform: rotate(-9.71deg) translateY(120px);
      }

      .atom-image {
        transform: translate(120px, 24%);
      }
    }
  }
}
</style>
