<template>
  <atom-wrapper class="contact-banner">
    <atom-wrapper class="contact-head">
      <atom-image src="/images/illus-contact-head.svg" />
      <h2>
        N'hésitez pas <br />
        à nous contacter <br />
        pour un rendez-vous <br />
        ou plus de renseignements.
      </h2>
    </atom-wrapper>
    <atom-wrapper class="contact-foot" flex flex-center flex-col>
      <atom-image src="/images/illus-contact-foot.svg" />
      <p class="contact-text">
        Écrivez à :
        <a href="mailto:mb.siruguet@felisweet.com" class="link"
          >mb.siruguet@felisweet.com</a
        >
        <br />
        Ou téléphonez au :
        <a href="tel: +33675561587" class="link">06 76 56 15 87</a>
      </p>
      <button class="contact-planning link" @click="openPlanning">
        Vérifier le planning !
      </button>
      <p class="contact-note">
        On est disponible autour de la commune <br />
        de Sainte-Geneviève-des-Bois en <br />
        fonction de votre localisation <br />
        sur toute Île-de-France.
      </p>
    </atom-wrapper>
  </atom-wrapper>
</template>

<script>
import AtomImage from '../../atoms/AtomImage'
import AtomWrapper from '../../atoms/AtomWrapper'

export default {
  name: 'ContactBanner',
  components: { AtomWrapper, AtomImage },
  props: {
    openPlanning: {
      type: Function,
      default: () => {},
    },
  },
}
</script>

<style lang="scss">
.contact-banner {
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .contact-head {
    width: 100vw;
    position: relative;

    h2 {
      @include rem(font-size, $font-size-body-l);
      font-weight: $weight-bold;
      position: absolute;
      text-align: center;
      bottom: 10px;
      width: 100%;
    }
  }

  .contact-foot {
    position: relative;

    .atom-image {
      transform: scale(1.1);
    }

    .contact-text {
      @include rem(font-size, calc($font-size-body-m * 0.8));
      @include rem(top, $spacing-xl);
      color: $color-white;
      position: absolute;
      text-align: center;
      width: 100%;
      letter-spacing: 0.5px;

      a {
        @include rem(font-size, calc($font-size-body-m * 0.8));
        letter-spacing: 0.5px;
        color: $color-white;
        font-weight: $weight-bold;
      }
    }

    .contact-planning {
      @include rem(font-size, calc($font-size-body-xxs * 1.2));
      @include rem(padding, $spacing-s calc($spacing-s * 2));
      background-color: $color-outremer-blue;
      color: $color-jellybean-blue;
      text-transform: uppercase;
      text-decoration: none;
      font-weight: $weight-bold;
      position: absolute;
      top: 32%;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 20px;
      border: 2px dashed transparent;
      letter-spacing: 0.6px;

      &:after {
        content: '';
        display: block;
        opacity: 0;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        border-radius: 20px;
        border: 2px dashed $color-link-water;
        transition: all ease 0.64s;
      }
      &:hover {
        color: $color-white;
        background-color: $color-jellybean-blue;

        &::after {
          opacity: 1;
          transform: translate(-50%, -50%) scale(1.04, 1.2);
        }
      }
    }

    .contact-note {
      @include rem(font-size, $font-size-body-xxs);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 36%;
      color: $color-white;
      text-align: center;
    }
  }

  @media #{$mq-medium} {
    .contact-head {
      margin: 0 auto;
      width: 64vw;

      h2 {
        @include rem(font-size, $font-size-heading-4);
        width: 100%;
        bottom: 8vh;
      }
    }

    .contact-foot {
      margin: 0 auto;
      width: 60vw;

      .contact-text {
        @include rem(font-size, $font-size-body-xl);
        top: 10vh;

        a {
          @include rem(font-size, $font-size-body-xl);
        }
      }

      .contact-planning {
        @include rem(font-size, $font-size-body-m);
        top: 36%;
      }

      .contact-note {
        @include rem(font-size, $font-size-body-xs);
      }
    }
  }

  @media #{$mq-tablet} {
    .contact-head {
      margin: 0 auto;
      width: 72vw;

      h2 {
        @include rem(font-size, $font-size-heading-4);
        width: 100%;
        bottom: 4vh;
      }
    }

    .contact-foot {
      margin: 0 auto;
      width: 68vw;

      .contact-text {
        @include rem(font-size, $font-size-body-m);
        top: 6vh;

        a {
          @include rem(font-size, $font-size-body-xl);
        }
      }

      .contact-planning {
        @include rem(font-size, $font-size-body-s);
        top: 34%;
      }

      .contact-note {
        @include rem(font-size, $font-size-body-xs);
      }
    }
  }
}
</style>
