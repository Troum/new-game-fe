<template lang="pug">
    div.m-0.p-0
        desktop( v-if="!mobile" )
        mobile-view( v-else :mobile="mobile")
</template>

<script>
    import { isMobile } from 'mobile-device-detect';
    import Desktop from "../components/Desktop";
    import MobileView from "../components/MobileView";
    export default {
        components: {
            Desktop,
            MobileView
        },
        data() {
            return {
                mobile: isMobile,
            }
        }
    }
</script>
