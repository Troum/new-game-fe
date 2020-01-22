<template lang="pug">
    b-modal#decline( title="Одобрить участника" size="lg" hide-footer centered )
        b-form( @submit.prevent="submit" )
            b-form-group
                b-form-group( label="Причина отказа" )
                    b-textarea.form-control( rows="3" v-model="form.reason" )
            b-form-group.my-2.text-center
                b-button( variant="danger" type="submit" ) Отклонить
</template>

<script>
    export default {
        data() {
            return {
                text: null,
                form: {
                    reason: null,
                    id: null
                }
            }
        },
        mounted(){
          this.$root.$on('decline', (item) => {
              this.$bvModal.show('decline');
              this.$bvModal.hide('approve');
              this.form.id = item.id
          })
        },
        methods: {
            submit() {
                this.$store.commit('loading');
                this.$http.post('api/v1/auth/decline', this.$formService.fill(this.form), {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`,
                    }
                })
                    .then(response => {
                        this.$formService.reset(this.form);
                        this.$root.$emit('reload', response);
                        this.$root.$emit('success', 'Участие отклонено');
                        this.$bvModal.hide('decline');
                        this.$handler.success();
                    })
                    .catch(error => {
                        this.$handler.handleError(error.response.status);
                    })
                    .finally(() => {
                        this.$store.commit('loading');
                    })
            }
        }
    }
</script>

<style scoped>

</style>
