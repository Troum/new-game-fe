import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faQuestionCircle, faCheck, faTimes, faChevronLeft, faChevronRight, faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faYoutubeSquare, faVk, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { ValidationProvider, ValidationObserver} from 'vee-validate';
import Viewer from "v-viewer";
import BootstrapVue from 'bootstrap-vue';
import HttpService from './services/http.service';
import HandlerService from "./services/handler.service";
import JWT from "./services/jwt-token.service";
import FormService from "./services/form.service";
import PrettyCheckbox from 'pretty-checkbox-vue';
import VueCarousel from 'vue-carousel';
const VueInputMask = require('vue-inputmask').default;

import RegisterComponent from "./components/RegisterComponent";
import NavbarComponent from "./components/NavbarComponent";
import ResultsComponent from "./components/ResultsComponent";
import FaqComponent from "./components/FaqComponent";
import FooterComponent from "./components/FooterComponent";
import MainNavbar from "./components/MainNavbar";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ErrorModal from "./components/ErrorModal";
import AddPrizeModal from "./components/AddPrizeModal";
import ConfirmModal from "./components/ConfirmModal";
import ResultsModal from "./components/ResultsModal";
import SuccessAlert from "./components/SuccessAlert";

import './scss/app.scss';
import './vee-validate';
import HintModal from "./components/HintModal";
import TableComponent from "./components/TableComponent";
import ApproveModal from "./components/ApproveModal";
import DeclineModal from "./components/DeclineModal";
let VueScrollTo = require('vue-scrollto');

library.add(faQuestionCircle, faCheck, faBars, faTimes, faChevronLeft, faChevronRight, faSearch, faInstagram, faYoutubeSquare, faVk, faFacebookF);

Vue.config.productionTip = false;

Vue.component('register-component', RegisterComponent);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('validation-provider', ValidationProvider);
Vue.component('validation-observer', ValidationObserver);
Vue.component('error-modal', ErrorModal);
Vue.component('prize-modal', AddPrizeModal);
Vue.component('results-modal', ResultsModal);
Vue.component('confirm-modal', ConfirmModal);
Vue.component('hint-modal', HintModal);
Vue.component('admin-navbar', NavbarComponent);
Vue.component('success-alert', SuccessAlert);
Vue.component('main-navbar', MainNavbar);
Vue.component('results-component', ResultsComponent);
Vue.component( 'faq-component', FaqComponent);
Vue.component('footer-component', FooterComponent);
Vue.component('table-component', TableComponent);
Vue.component('approve-modal', ApproveModal);
Vue.component('decline-modal', DeclineModal);

Vue.use(BootstrapVue);
Vue.use(HttpService);
Vue.use(PrettyCheckbox);
Vue.use(VueInputMask);
Vue.use(VueCarousel);
Vue.use(HandlerService);
Vue.use(JWT);
Vue.use(FormService);
Vue.use(Viewer, {
  inline: true,
  toolbar: true,
  movable: true,
  zoomable: true,
  transition: true,
  url: "data-source"
});
Vue.use(VueScrollTo,{
  container: "body",
  duration: 600,
  easing: "ease",
  offset: -5,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});
Vue.filter('dateFilter', (date) => {
  return new Date(date).toLocaleDateString('ru')
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
