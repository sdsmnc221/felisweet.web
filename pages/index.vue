<template>
  <atom-wrapper tag="main">
    <atom-wrapper
      tag="section"
      full-height
      flex
      flex-center
      class="section-hero"
    >
      <hero-banner />
      <button-arrow
        direction="down"
        :size="46"
        :arrow-size="24"
        :on-click="scrollDown"
      />
    </atom-wrapper>
    <atom-wrapper
      ref="sectionProblematics"
      tag="section"
      full-height
      flex
      flex-center
      flex-col
      class="section-problematics"
    >
      <slider-questions />
      <problematics-illus />
    </atom-wrapper>
    <atom-wrapper
      tag="section"
      flex
      flex-center
      flex-col
      class="section-services"
    >
      <h2>
        On vous propose <br />
        <b>nos services</b> :
        <bubble-image src="/images/illus-services-house.svg" />
      </h2>
      <service-block
        v-for="(service, index) in services"
        :key="'servive' + index"
        :title="service.title"
        :description="service.description"
        :image-pos="service.imagePos"
        :image-src="service.imageSrc"
      />
      <bubble-image src="images/illus-services-bowl.svg" :size="148" />
    </atom-wrapper>
    <atom-wrapper tag="section" full-height flex flex-center>
      Contact
    </atom-wrapper>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
import BubbleImage from '../components/atoms/BubbleImage'
import ButtonArrow from '../components/atoms/ButtonArrow'
import ProblematicsIllus from '../components/molecules/ProblematicsIllus'
import ServiceBlock from '../components/molecules/ServiceBlock'
import SliderQuestions from '../components/molecules/SliderQuestions'
import HeroBanner from '../components/organisms/HeroBanner'

export default {
  name: 'IndexPage',
  components: {
    AtomWrapper,
    HeroBanner,
    ButtonArrow,
    SliderQuestions,
    ProblematicsIllus,
    BubbleImage,
    ServiceBlock,
  },
  data() {
    return {
      services: [
        {
          title: 'Comportements du chat',
          description: `Vous rencontrez un comportement gênant de la part de votre chat ? On vous expliquera pourquoi ce comportement et que faire pour que cela ne se reproduise plus. Toutes nos techniques sont <b>en méthode positive avec de la bienveillance pour le chat mais aussi l’humain. Aucune punition, aucune immersion.</b> Tout se déroulera dans le respect du bien-être de votre boule de poils à 4 pattes.`,
          imagePos: 'bottom',
          imageSrc: '/images/illus-services-yarn.svg',
        },
        {
          title: 'Cat-sitting',
          description: `Vous ne pouvez pas être là pour vous occuper de votre loulou ? <b>On viendra une fois par jour tenir compagnie à votre chat.</b> On restera au moins une heure avec lui. On s’occupera de lui nettoyer ses litières en passant un coup de balais derrière, de lui changer son eau, de lui donner à manger. On aura de longue partie de jeux avec lui et des moments câlins.`,
          imagePos: 'top',
          imageSrc: '/images/illus-services-cat.svg',
        },
      ],
    }
  },
  methods: {
    scrollDown() {
      this.$refs.sectionProblematics.scrollIntoView()
    },
  },
}
</script>

<style lang="scss">
main {
  .section-hero {
    .button-arrow {
      position: absolute;
      @include rem(bottom, $spacing-2xl);
      left: 50%;
      transform: translateX(-50%);
    }
  }

  .section-problematics {
  }

  .section-services {
    &.--flex {
      justify-content: flex-start;
    }

    h2 {
      @include rem(font-size, $font-size-body-xl);
      @include rem(padding, 0 $spacing-2xl);
      @include rem(margin, $spacing-2xl 0 $spacing-2xl/2 0);
      text-align: center;
      position: relative;
      font-weight: $weight-regular;

      b {
        @include rem(font-size, $font-size-body-xl);
        font-weight: $weight-bold;
      }

      .bubble-image {
        position: absolute;
        bottom: -50%;
        left: -4%;
      }
    }

    & > .bubble-image {
      margin: 0 auto;
      margin-top: -32px;
    }
  }
}
</style>
