<template lang="pug">
    b-navbar.always_navbar.bg-transparent( toggleable="lg" type="dark" variant="info" )
        b-navbar-brand.text-center.mx-auto.w-100( v-if="mobile" )
            img.img-fluid( src="@/assets/images/logo.png" )
        b-button#toggler.bg-transparent.border-0( @click="onClick" v-if="mobile" target="nav-collapse" :style="mobile ? 'position: absolute; top: 20px; right: 20px; z-index: 5' : ''")
            font-awesome-icon.text-white( v-if="!isToggled" transform size="lg" :icon="['fas', 'bars']" )
            font-awesome-icon.text-white( v-else size="lg" :icon="['fas', 'times']" )
        b-collapse#nav-collapse( is-nav )
            b-navbar-nav.mx-auto.always_navbar_nav.d-flex.text-white( :style="style" )
                b-nav-item( v-if="!mobile" )
                    img.img-fluid( src="@/assets/images/logo.png" )
                b-nav-item.text-uppercase.text-white.mx-auto.my-4.font-weight-bold( v-for="(item, i) in $store.getters.menu"
                    :key="i" @click="scrollTo(item.anchor)"  style="z-index: 1") {{ item.title }}



</template>

<script>
    export default {
        props: {
            mobile: null
        },
        data() {
            return {
                style: null,
                isToggled: false,
                target: 'nav-collapse'
            }
        },
        mounted() {
            this.style = this.mobile ? 'height: 100vh; width: 100vw; position: fixed; top: 0; left: 0; z-index: 4; background: linear-gradient(101.49deg, #7F41C1 -12.77%, #9454D9 33.31%, #9C5BE2 46.6%, #9454D9 59.89%, #7F41C1 105.97%);' : '';
        },
        methods: {
            onClick(evt) {
                this.$emit('click', evt);
                if (!evt.defaultPrevented) {
                    this.isToggled = !this.isToggled;
                    this.$root.$emit('bv::toggle::collapse', this.target)
                }
            },
            scrollTo(element) {
                this.$scrollTo(element);
                if(this.mobile && this.isToggled)  {
                    this.isToggled = !this.isToggled;
                    this.$root.$emit('bv::toggle::collapse', this.target)
                }
            }
        }
    }
</script>
