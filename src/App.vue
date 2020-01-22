<template lang="pug">
    div#app
        b-container.min-vh-100.mx-auto.p-0.main
            b-row.min-vh-100.d-flex.align-items-center.m-0.p-0
                b-col.mx-auto.p-0.p-xl-3( cols="12" xl="12" )
                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"  mode="out-in")
                        router-view
            error-modal
            transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut"  mode="out-in")
                success-alert
            hint-modal
            approve-modal
            decline-modal
            b-toast#success-toast( :auto-hide-delay="7000" variant="success" title="Успешно!" ) {{ message }}
        loading(
        overlay-class="loading-overlay"
        loader-class="loading-wrapper"
        label="Подождите..."
        :show="$store.getters.loading" )
            template( v-slot:loading-spinner )
                div.spinner
                    div.cube1
                    div.cube2



</template>
<script>
    import loading from 'vue-full-loading';
    import { isMobile } from 'mobile-device-detect';
    import NavbarComponent from "./components/NavbarComponent";
    export default {
        data() {
          return {
              mobile: isMobile,
              message: ''
          }
        },
        mounted() {
           this.$root.$on('success-toast', (message) => {
               this.message = message;
               this.$bvToast.show('success-toast')
            })
        },
        components: {
            NavbarComponent,
            loading
        }
    }
</script>
