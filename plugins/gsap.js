import Vue from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GSAP = {
  install(Vue, options) {
    Vue.prototype.$gsap = gsap;
    Vue.prototype.$ScrollTrigger = ScrollTrigger;
  },
};

Vue.use(GSAP);