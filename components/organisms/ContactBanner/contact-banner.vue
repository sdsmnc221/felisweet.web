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
        <a href="mailto:mb.siruguet@felisweet.com">mb.siruguet@felisweet.com</a>
        <br />
        Ou téléphonez au : <a href="tel: +33675561587">06 76 56 15 87</a>
      </p>
      <a href="#" target="__blank" class="contact-planning">
        Vérifier le planning !
      </a>
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
      @include rem(padding, $spacing-s);
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
      letter-spacing: 0.6px;
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
}
</style>
