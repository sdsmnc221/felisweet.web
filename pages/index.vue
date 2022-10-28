<template>
  <atom-wrapper tag="main">
    <atom-wrapper
      ref="hero"
      tag="section"
      full-height
      flex
      flex-center
      class="section-hero"
    >
      <hero-banner />
      <button-arrow
        ref="scrollDown"
        direction="down"
        :size="46"
        :arrow-size="24"
        :on-click="scrollDown"
      />
    </atom-wrapper>

    <scroll-reveal-wrapper>
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
        <atom-image class="problematics-paw" src="/images/paw.svg" />
      </atom-wrapper>
    </scroll-reveal-wrapper>
    <scroll-reveal-wrapper>
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
    </scroll-reveal-wrapper>
    <scroll-reveal-wrapper>
      <atom-wrapper
        tag="section"
        flex
        flex-center
        flex-col
        class="section-reviews"
      >
        <h2><b>Les témoignages</b> :</h2>
        <slider-reviews :reviews="reviews" />
      </atom-wrapper>
    </scroll-reveal-wrapper>
    <scroll-reveal-wrapper>
      <atom-wrapper tag="section" flex flex-center class="section-contact">
        <contact-banner :open-planning="openPlanning" />
      </atom-wrapper>
    </scroll-reveal-wrapper>
    <paws-pattern :paws-per-section="6" />
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../components/atoms/AtomWrapper'
import AtomImage from '../components/atoms/AtomImage'
import BubbleImage from '../components/atoms/BubbleImage'
import ButtonArrow from '../components/atoms/ButtonArrow'
import ProblematicsIllus from '../components/molecules/ProblematicsIllus'
import ServiceBlock from '../components/molecules/ServiceBlock'
import SliderQuestions from '../components/molecules/SliderQuestions'
import ContactBanner from '../components/organisms/ContactBanner'
import HeroBanner from '../components/organisms/HeroBanner'
import PawsPattern from '../components/organisms/Paws-Pattern'
import SliderReviews from '../components/organisms/SliderReviews'
import ScrollRevealWrapper from '../components/atoms/ScrollRevealWrapper'

export default {
  name: 'IndexPage',
  components: {
    AtomWrapper,
    AtomImage,
    HeroBanner,
    ButtonArrow,
    SliderQuestions,
    ProblematicsIllus,
    BubbleImage,
    ServiceBlock,
    SliderReviews,
    ContactBanner,
    PawsPattern,
    ScrollRevealWrapper,
  },
  props: {
    openPopup: {
      type: Function,
      default: null,
    },
    popupContentPlanning: {
      type: String,
      default: null,
    },
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
      reviews: [
        {
          author: 'Adeline Trpette',
          text: `Marie est une super personne qui aime les animaux par dessus tout et qui à un don pour communiquer avec eux.
Heureusement qu’elle a été là pour habituer nos deux chats au harnais à leur début en extérieur ! Grâce à ses talents, ils l’ont très bien accepté 🙂
Elle nous a aussi beaucoup aidé pour les problèmes de comportement de notre petit Abou qui faisait pipi hors de sa litière.
Merci Marie !!`,
        },
        {
          author: 'Jac Noirot',
          text: `quel soulagement d avoir rencontré Nany Marie : disponible, douce, attentionnée,  ses conseils sont très utiles, je l appellerai de nouveau sans hésitation pour ses bons services !`,
        },
        {
          author: 'Trương Thị Vân An ',
          text: `Mon Robin m'a quitté pour aller vivre dans la forêt juste avant que je parte en vacances 😭. Mais il rentre quand même pour la nourriture. Un grand merci à Felisweet de s'occuper de lui la semaine où je n'étais pas chez moi. Elle a travaillé sur l'environnement (placement des gamelles, des friandises, des caméras) pour attirer Robin et lui faire revenir plus fréquemment dans la pièce. Très contente d'avoir faire confiance en elle 🥰.`,
        },
        {
          author: 'Mel Sdz',
          text: `Super expérience avec Marie Benedicte! Photos et vidéos tous les jours, mise en place d’une caméra afin de pouvoir voir nos chats pendant notre absence. Au top, je recommande !!`,
        },
      ],
    }
  },
  mounted() {
    this.$gsap.to([this.$refs.scrollDown.$el], {
      opacity: 1,
      startAt: { opacity: 0 },
      duration: 2.4,
      ease: 'circ.in',
    })
  },
  methods: {
    scrollDown() {
      this.$refs.sectionProblematics.scrollIntoView()
    },
    openPlanning() {
      this.openPopup(this.popupContentPlanning)
    },
  },
}
</script>

<style lang="scss">
main {
  overflow: hidden;

  .section-hero {
    .button-arrow {
      position: absolute;
      @include rem(bottom, $spacing-5xl);
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
  }

  .section-problematics {
    .problematics-paw {
      position: absolute;
      width: 245px;
      bottom: 5%;
      left: -10%;
    }
  }

  .section-services {
    &.--flex {
      justify-content: flex-start;
    }

    h2 {
      @include rem(font-size, $font-size-body-xl);
      @include rem(padding, 0 $spacing-2xl);
      @include rem(margin, $spacing-2xl 0 calc($spacing-2xl/2) 0);
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

  .section-reviews {
    &.--flex {
      justify-content: flex-start;
    }

    h2 {
      @include rem(font-size, $font-size-body-xl);
      @include rem(padding, 0 $spacing-2xl);
      @include rem(margin, $spacing-2xl 0 calc($spacing-2xl/2) 0);
      text-align: center;

      b {
        @include rem(font-size, $font-size-body-xl);
        font-weight: $weight-bold;
      }
    }
  }

  .section-contact {
    @include rem(margin-top, $spacing-4xl);
    &.--flex {
      justify-content: flex-start;
    }
  }

  @media #{$mq-medium} {
    .section-hero {
      height: 100vh;
      overflow: hidden;

      .button-arrow {
        @include rem(bottom, $spacing-3xl);
        width: 64px;
        height: 64px;

        .atom-image {
          transform: scale(1.2);
        }
      }
    }

    .section-services {
      h2 {
        top: -10vh;
        left: -16vw;

        @include rem(font-size, $font-size-heading-3);

        b {
          @include rem(font-size, $font-size-heading-3);
        }

        .bubble-image {
          width: 240px;
          left: 48vw;
          top: 32vh;
        }
      }

      & > .bubble-image {
        width: 320px;
        position: absolute;
        top: 50%;
        left: 8%;
      }
    }

    .section-reviews {
      h2,
      h2 b {
        @include rem(font-size, $font-size-heading-3);
      }
    }
  }
}
</style>
