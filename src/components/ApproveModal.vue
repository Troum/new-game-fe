<template lang="pug">
    b-modal#approve( title="Одобрить участника" size="lg" hide-footer centered @hidden="total = null; form.chance = null")
        b-form.w-75.mx-auto( @submit.prevent="submit" )
            b-form-group.text-center.images( v-viewer )
                img.approve-modal_img( v-if="whereFrom.telegram != 1 && whereFrom.vk != 1" :src="`${url}${image}`")
                img.approve-modal_img( v-if="whereFrom.telegram == 1" :src="`${botUrl}${image}`")
                img.approve-modal_img( v-if="whereFrom.vk == 1" :src="`${botUrl}${image}`")
            b-form-group.my-2( label="Введите сумму по чеку" )
                b-input-group
                    template( v-slot:append )
                        b-button( type="button" @click="countChance" variant="info" ) Рассчитать
                    b-form-input( type="text" v-model="total" autocomplete="off")
            transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" )
                b-form-group.my-2.text-center( label="Вычисленное количество шансов" v-if="form.chance" )
                    p.h4
                        b-badge.text-dark( variant="light" ) {{ form.chance }}
            b-form-group.my-3.text-center
                b-row.w-100.mx-auto
                    b-col.m-0.p-0.text-left(cols="6")
                        b-button( variant="info" type="submit" ) Одобрить
                    b-col.m-0.p-0.text-right(cols="6")
                        b-button( variant="danger" @click="$root.$emit('decline', form)" type="button" ) Отклонить
</template>

<script>
    export default {
        data() {
          return {
              url: `${process.env.VUE_APP_API_URL}/api/v1/auth/participant/`,
              botUrl: `${process.env.VUE_APP_API_URL}/participants/`,
              image: null,
              total: null,
              form: {
                  chance: null,
                  id: null
              },
              whereFrom: {
                  telegram: false,
                  vk: false
              }
          }
        },
        mounted() {
            this.$root.$on('approve', (item) => {
                this.image = item.image;
                this.form.id = item.id;
                this.whereFrom.telegram = item.fromTelegram;
                this.whereFrom.vk = item.fromVk;
                this.$bvModal.show('approve');
            })
        },
        methods: {
            submit() {
                this.$store.commit('loading');
                this.$http.post('api/v1/auth/approve', this.$formService.fill(this.form), {
                    headers: {
                        Authorization: `Bearer ${this.$jwt.bearer()}`,
                    }
                })
                    .then(response => {
                        this.$formService.reset(this.form);
                        this.$root.$emit('reload', response);
                        this.$root.$emit('success', 'Шансы успешно добавлены');
                        this.$bvModal.hide('approve');
                        this.$handler.success();
                    })
                    .catch(error => {
                        this.$handler.handleError(error.response.status);
                    })
                    .finally(() => {
                        this.$store.commit('loading');
                    })
            },
            countChance() {
                const price = parseFloat(this.total);
                this.form.chance = parseInt(price / 10);
            }

        }
    }
</script>

<style scoped>

</style>
