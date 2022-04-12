<template>
  <atom-wrapper tag="footer" flex flex-center flex-col class="site-footer">
    <logo-felisweet />
    <p class="links">
      <a href="/">Crédits</a>
      <span>-</span>
      <a href="/">Mentions légales</a>
    </p>
    <p class="copyright">
      <span>© 2022 FeliSweet.</span> <span>All rights reserved.</span>
    </p>
  </atom-wrapper>
</template>

<script>
import AtomWrapper from '../../atoms/AtomWrapper'
import LogoFelisweet from '../../atoms/LogoFelisweet'

export default {
  name: 'SiteFooter',
  components: { AtomWrapper, LogoFelisweet },
}
</script>

<style lang="scss">
.site-footer {
  @include rem(padding, $spacing-2xl 0);
  border-top: 0.5px solid $color-service-blue;
  background-color: $color-white;

  .logo-felisweet {
    width: 208px;
  }

  p,
  a {
    color: $color-nepal-blue;
    @include rem(font-size, $font-size-body-xs);
    @include rem(line-height, $font-size-body-m);
  }

  @media #{$mq-medium}, #{$mq-tablet} {
    @include rem(padding, $spacing-l);

    .logo-felisweet {
      width: 185px;
    }

    p,
    a,
    span {
      @include rem(font-size, $font-size-body-s);
      @include rem(line-height, $font-size-body-m);
    }

    .links {
      position: absolute;
      top: 50%;
      right: 4vw;
      transform: translateY(-50%);
      width: 150px;
      text-align: right;

      span {
        display: none;
      }

      a {
        display: block;
      }
    }

    .copyright {
      position: absolute;
      top: 50%;
      left: 4vw;
      transform: translateY(-50%);
      width: 150px;
      text-align: center;

      span {
        display: block;
      }
    }
  }
}
</style>
