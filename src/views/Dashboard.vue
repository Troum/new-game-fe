<template lang="pug">
    b-card.w-100.mt-5( no-body)
        b-tabs( card )
            b-tab( title="Зарегистрировавшиеся участники" )
                table-component( :items="items.registered" :fields="fields" :pagination="pagination" )
            b-tab( title="Одобренные участники" )
                table-component( :items="items.approved" :fields="fields" :approved="true" :pagination="pagination" )
            b-tab( title="Отклоненные участники" )
                table-component( :items="items.declined" :fields="fields" :approved="false" :pagination="pagination" )

</template>

<script>
    import TableRegistered from "../components/TableComponent";
    export default {
        components: {TableRegistered},
        data() {
          return {
              pagination: {
                current: 1,
                perPage: 10
              },
              items: {
                  registered: [],
                  approved: [],
                  declined: []
              },
              fields: [
                  {
                      key: 'surname',
                      label: 'Фамилия',
                      sortable: true
                  },
                  {
                      key: 'name',
                      label: 'Имя',
                      sortable: true
                  },
                  {
                      key: 'secondName',
                      label: 'Отчество',
                      sortable: true
                  },
                  {
                      key: 'check_number',
                      label: 'Номер чека',
                      sortable: true
                  },
                  {
                      key: 'date',
                      label: 'Дата покупки',
                      sortable: true
                  },
                  {
                      key: 'phone',
                      label: 'Номер телефона',
                      sortable: true
                  },
                  {
                      key: 'email',
                      label: 'E-mail',
                      sortable: true
                  },
                  {
                      key: 'address',
                      label: 'Адрес',
                      sortable: true
                  },
                  {
                      key: 'registered',
                      label: 'Зарегистрирован через',
                      sortable: true
                  },
                  {
                      key: 'actions',
                      label: 'Действия',
                      sortable: false
                  }
              ]
          }
        },
        beforeMount() {
            this.$http.get('api/v1/auth/participate', {
                headers: {
                    Authorization: `Bearer ${this.$jwt.bearer()}`,
                }
            })
                .then(response => {
                    this.items.registered = [...response.data.registered];
                    this.items.approved = [...response.data.approved];
                    this.items.declined = [...response.data.declined];
                })
                .catch(error => {
                    this.$handler.handleError(error.response.status)
                })
        },
        mounted() {
            this.$root.$on('reload', (response) => {
                this.items.registered = [...response.data.registered];
                this.items.approved = [...response.data.approved];
                this.items.declined = [...response.data.declined];
            });
        }
    }
</script>
<style lang="scss">

</style>
