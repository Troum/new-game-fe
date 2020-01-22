<template lang="pug">
    b-row.m-0.p-0
        b-col.p-0.text-center.position-relative( xl="12" )
            register-component( :mobile="mobile" :needCheck="false" )
</template>

<script>
    import { isMobile } from 'mobile-device-detect';
    export default {
        data() {
            return {
                mobile: isMobile,
            }
        }
    }
</script>
