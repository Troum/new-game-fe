<template lang="pug">
    b-modal#add-prize( title="Добавить приз " hide-footer centered)
        b-form#prize( @submit.prevent="submit" )
            b-form-group( label="Какой розыгрыш" )
                b-form-radio-group(v-model="result" @change="chooseOption" :options="options" name="some-result" stacked)
            b-form-group.my-2( label="Наименование приза" )
                b-form-input( type="text" v-model="prize" )
            b-form-group.my-2( label="Номер шанса" )
                b-form-input( type="text" v-model="chance" )
            b-form-group.my-2.text-center
                    b-button( variant="info" type="submit" ) Добавить
</template>

<script>
    export default {
        data() {
            return {
                name: '',
                array: [],
                index: null,
                prize: '',
                chance: '',
                result: '',
                options: [
                    { text: 'Сертификат 5 элемент', value: 0 },
                    { text: 'Колонка JBL Flip 4(чёрный)', value: 1 },
                    { text: 'AirPods', value: 2 },
                    { text: 'Умные часы Samsung Galaxy Watch Active 2 44 мм [SM-ASER] (черный)', value: 3 },
                    { text: 'Главный приз-путешествие Доминикана', value: 4 },
                ]
            }
        },
        mounted() {
            this.$root.$on('prize', (index, array) => {
                this.$bvModal.show('add-prize');
                this.name = array[index].name;
                this.array = [...array];
                this.index = index;
            })
        },
        methods: {
            submit() {
                this.array[this.index].prize = this.prize;
                this.array[this.index].chance = this.chance;
                this.array[this.index].result = this.result;
                this.$root.$emit('update', this.array);
                this.$bvModal.hide('add-prize');
                this.prize = '';
            },
            chooseOption(checked) {
                this.prize = this.options[checked].text;
                this.result = checked;

            }
        }
    }
</script>

