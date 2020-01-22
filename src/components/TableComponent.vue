<template lang="pug">
    div
        p.h5( v-if="items.length > 0" ) Поиск по участникам
        b-input-group( v-if="items.length > 0" )
            template( v-slot:append )
                div.p-1.border.border-left-0.border-info
                    font-awesome-icon.m-auto( :icon="['fas', 'search']" )
            b-form-input.border-right-0.border-info( type="text" v-model="needle")

        b-table.mt-5( striped hover
            v-if="items.length > 0"
            :items="filtered"
            :fields="fields"
            :per-page="pagination.perPage"
            :current-page="pagination.current")
            template( v-slot:cell(surname)="data" )
                | {{ data.item.surname }}
            template( v-slot:cell(name)="data" )
                | {{ data.item.name }}
            template( v-slot:cell(secondName)="data" )
                | {{ data.item.secondName }}
            template( v-slot:cell(date)="data" )
                | {{ data.item.date }}
            template( v-slot:cell(registered)="row" )
                span( v-if="row.item.fromTelegram == 1" )
                    | Telegram
                span( v-if="row.item.fromVk == 1" )
                    | VKontakte
                span( v-if="row.item.fromTelegram != 1 && row.item.fromVk != 1 " )
                    | через сайт
            template( v-slot:cell(actions)="row" )
                b-row.m-0.p-0
                    b-col.text-center( cols="6" v-if="!approved" )
                        b-button( variant="success" @click="approve(row.item)" ) Модерировать
                    b-col.text-center( cols="12" v-if="approved")
                        b-button( variant="info" @click="row.toggleDetails" ) Показать шансы
            template( v-slot:row-details="row" v-if="approved" )
                span.h4
                    b-badge.text-dark( variant="warning" ) Игровые шансы:&nbsp;
                span.h4( v-for="(chance, i) in row.item.chance.trim().split(' ')" :key="i" )
                    b-badge.ml-1.text-white( variant="info" ) {{ chance }}&nbsp;
        div.text-center( v-else )
            p.h3 Нет записей
        b-pagination.mt-2(
            v-if="items.length > 0"
            v-model="pagination.current"
            align="center"
            :total-rows="rows"
            :per-page="pagination.perPage"
            aria-controls="participants")
</template>

<script>
    export default {
        data() {
           return {
               needle: ''
           }
        },
        props: {
            items: Array,
            fields: null,
            pagination: null,
            approved: null
        },
        computed: {
            rows() {
                return this.items.length
            },
            filtered() {
                return this.items.filter( item => {
                    return item.name.match(this.needle) ||
                        item.surname.match(this.needle) ||
                        item.secondName.match(this.needle) ||
                        item.fromTelegram.match(this.needle) ||
                        item.fromVk.match(this.needle) ||
                        item.phone.match(this.needle) ||
                        item.check_number.match(this.needle) ||
                            item.chance.match(this.needle);
                })
            }
        },
        methods: {
            approve(item){
                this.$root.$emit('approve', item);
            }
        }
    }
</script>

<style scoped>

</style>
