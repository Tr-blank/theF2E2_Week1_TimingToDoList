<template lang="pug">
  draggable.to-do-list(v-model="list" group="todolist" @start="drag=true" @end="drag=false" :move="checkMove")
    div.to-do-list__item(v-for='item in list' :key='item.work_id')
      div
        font-awesome-icon.to-do-list__item-dragIcon(icon="ellipsis-v")
        span.to-do-list__title {{item.work_title}}
      font-awesome-icon.to-do-list__item-playIcon(icon="play")
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'HelloWorld',
  components: {
    draggable
  },
  props: {
    msg: String
  },
  data() {
    return {
      records: [],
      list: []
    }
  },
  mounted() {
    this.login()
  },
  methods: {
    login() {
      this.$getGapiClient()
        .then(gapi => {
          const params = {
            spreadsheetId: '1fLEQHVFlidjjbqeKwuhE5_H0L7JnAtKRtGUyKLE5kPI',
            range: 'A1:H100',
            valueRenderOption: 'FORMATTED_VALUE',
            dateTimeRenderOption: 'FORMATTED_STRING'
          }
          gapi.client.sheets.spreadsheets.values.get(params)
            .then(response => {
              this.records = response.result.values
              response.result.values.map((item, index) => {
                if (index > 0) {
                  const itemObject = {}
                  item.map((value, n) => {
                    const property = response.result.values[0][n]
                    itemObject[property] = value
                  })
                  itemObject.order = index
                  this.list.push(itemObject)
                }
              })
            })
            //最後要補寫當api讀取失敗時，直接塞入寫死的假資料到list裡
        })
    },
    checkMove() {
      console.log(this.list)
      this.list.map((item, index) => {
        item.order = index
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.to-do-list
  margin 40px 0
  &__item
    padding 10px
    background-color #fcfcfc
    margin 10px 0
    border-radius 10px
    cursor pointer
    display flex
    align-items center
    justify-content space-between
    &-dragIcon
      opacity 0
      font-size 14px
      transition opacity 0.2s ease
    &:hover &-dragIcon
      opacity 1
    &-playIcon
      font-size 14px
      color #ffd95c
  &__title
    font-size 18px
    padding-left 10px
</style>
