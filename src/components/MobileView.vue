<template lang="pug">
    div.m-0.p-0
        b-col.mt-4.p-0.text-center#registration( cols="12" )
            register-component( :mobile="mobile" :needCheck="false" )
</template>

<script>
    export default {
        props: {
            mobile: null
        }
    }
</script>

<style scoped>

</style>
