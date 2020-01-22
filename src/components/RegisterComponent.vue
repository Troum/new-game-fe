<template lang="pug">
    b-row.m-0.p-0
        b-col.mx-auto( xl="9" )
            validation-observer( ref="observer" v-slot="{ passes }" )
                b-form#participant.mx-auto.w-100( @submit.prevent="passes(submit)" :class="[!needCheck ? 'check' : '']" )
                    b-row.m-0
                        b-col.mx-auto( cols="12" xl="10" )
                            validation-provider( rules="required" name="Фамилия" v-slot="{ errors }")
                                b-form-group.my-4.my-xl-2
                                    b-form-input#name( v-model="form.surname" type="text" autocomplete="off" placeholder="Фамилия *" )
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1
                                            small {{ errors[0] }}
                            validation-provider( rules="required" name="Имя" v-slot="{ errors }")
                                b-form-group.my-4.my-xl-2
                                    b-form-input#name( v-model="form.name" type="text" autocomplete="off" placeholder="Имя *" )
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1
                                            small {{ errors[0] }}
                            validation-provider( rules="required" name="Отчество" v-slot="{ errors }")
                                b-form-group.my-4.my-xl-2
                                    b-form-input#name( v-model="form.secondName" type="text" autocomplete="off" placeholder="Отчество *" )
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1
                                            small {{ errors[0] }}
                            validation-provider( rules="required" name="Почтовый адрес" v-slot="{ errors }" )
                                b-form-group.my-4.my-xl-2
                                    b-form-input#address( v-model="form.address" autocomplete="off" placeholder="Почтовый адрес *")
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1
                                            small {{ errors[0] }}

                            validation-provider( rules="required" name="Номер телефона" v-slot="{ errors }" )
                                b-form-group.my-4.my-xl-2
                                    b-form-input#phone( v-model="form.phone" type="text"
                                        @change="maskCheck" autocomplete="off" placeholder="Номер телефона *")
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1
                                            small {{ errors[0] }}
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1( v-if="phoneError" )
                                            small Проверьте правильность ввода номера телефона в соответствии с маской: +375 YY XXX-XX-XX
                            validation-provider( rules="required|image" name="Фото чека" v-slot="{ errors, validate }" )
                                b-form-group.my-4.my-xl-2
                                    b-input-group
                                        b-form-file#image.border-left-none( v-model="form.file"
                                            @input="addFile"
                                            @change="validate"
                                            type="file"
                                            placeholder="Добавить или перетянуть фото чека"
                                            drop-placeholder="Перетянуть сюда")
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1
                                            small {{ errors[0] }}
                            validation-provider( rules="required|email" name="Email" v-slot="{ errors }" )
                                b-form-group.my-4.my-xl-2
                                    b-form-input#email( v-model="form.email" type="email" autocomplete="off" placeholder="Email *")
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1
                                            small {{ errors[0] }}
                            validation-provider( rules="required" name="Номер чека" v-slot="{ errors }" )
                                b-form-group.my-4.my-xl-2
                                    b-input-group
                                        b-form-input#code.border-left-none( v-model="form.check_number" type="text" autocomplete="off" placeholder="Номер чека *")
                                        b-input-group-append#tooltip-scratch( v-if="needCheck" is-text )
                                            font-awesome-icon( @click="$bvModal.show('hint')" :icon="['fas', 'question-circle']" size="1x")
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1
                                            small {{ errors[0] }}
                            validation-provider( rules="required" name="Дата покупки" v-slot="{ errors }")
                                b-form-group.my-4.my-xl-2
                                    datepicker.w-100( format="DD.MM.YYYY"
                                        placeholder="Дата совершения покупки *"
                                        valueType="format"
                                        v-model="form.date" class="date" lang="ru" )
                                    transition( enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in" )
                                        div.invalid.text-danger.my-1( v-if="errors[0]" )
                                            small {{ errors[0] }}
                        b-col.mx-auto.my-xl-3( xl="10" )
                            p.text-center.mb-0( style="color: #000" )
                                small( :style="mobile ? 'font-size: 70%' : ''" ) *Регистрируясь, Вы подтверждаете свое согласия на участие в рекламной игре.
                            p.text-center.mt-0( style="color: #000" )
                                small( :style="mobile ? 'font-size: 70%' : ''" ) *Регистрируясь, Вы подтверждаете, что изучили и согласны с правилами настоящей рекламной игры
                            b-form-group.my-4.my-xl-2.my-xl-4.text-center
                                b-button.register.text-uppercase.pl-4.pr-4.pl-xl-5.pr-xl-5( type="submit" size="lg" variant="info" )
                                    small.font-weight-bold Зарегистрироваться




</template>

<script>
    import Datepicker from 'vue2-datepicker';
    import languages from 'vue2-datepicker/src/locale/languages';
    export default {
        components: {
            Datepicker
        },
        props: {
          mobile: null,
          needCheck: null
        },
        data() {
            return {
                rules: `${process.env.VUE_APP_RULES}`,
                accept: false,
                form: {
                    name: null,
                    surname: null,
                    secondName: null,
                    check_number: null,
                    phone: null,
                    email: null,
                    address: null,
                    file: null,
                    date: null
                },
                lang: languages,
                phoneError: false,
                regex: new RegExp(/^((\+375)+\s(29|33|44|25)\s[0-9]{3}-[0-9]{2}-[0-9]{2})$/g)
            }
        },
        methods: {
            addFile(file){
                this.form.file = file;
            },
            maskCheck(field){
                if (this.regex.test(field)) {
                    this.phoneError = false;
                } else {
                    this.phoneError = true;
                }
            },
            submit() {
                this.$store.commit('loading');
                this.$http.post('api/v1/participate', this.$formService.fill(this.form))
                    .then(response => {
                        this.$formService.reset(this.form);
                        this.accept = false;
                        this.$root.$emit('success-toast', response.data.success);
                        requestAnimationFrame(() => {
                            this.$refs.observer.reset();
                        });
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
