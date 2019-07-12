<template lang="pug">
  main(id='app')
    div.list-container
      .user
        img
        span user ID
      .add-input
        input(type='text')
      ToDoList
    div.timer-container
      div 第一筆項目標題
      div 第一筆項目內容
      div 計時
      div 狀態控制按鈕
    //- HelloWorld(msg='Welcome to Your Vue.js App')
</template>

<script>
import ToDoList from './components/ToDoList.vue'

export default {
  name: 'app',
  components: {
    ToDoList
  }
}
</script>

<style lang="stylus">
*
  box-sizing border-box
body
  padding 0
  margin 0
#app
  font-family 'Avenir', Microsoft JhengHei UI, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  display flex
  color #333
  font-size 16px
  height 100vh
.list-container
  width 30%
  background-color #ffd95c
  padding 3%
.timer-container
  width 70%
  background-color #333
  color #fcfcfc
  padding 3%
</style>
