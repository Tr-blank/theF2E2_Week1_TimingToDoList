<template lang="pug">
  .dialog-message
    .dialog-message__container
      .dialog-message__title {{message}}
      span.dialog-message__button.dialog-message__no(@click='clickButton(false)') 取消
      span.dialog-message__button.dialog-message__yes(@click='clickButton(true)') 確定
</template>

<script>
export default {
  name: 'DialogMessage',
  data() {
    return {
    }
  },
  props: {
    message: {
      type: String
    },
    buttons: {
      type: Number
    },
    resultFunction: {
      type: Function
    }
  },
  methods: {
    clickButton(result) {
      this.resultFunction(result)
    }
  }
}
</script>

<style lang="stylus" scoped>
.dialog-message
  position absolute
  z-index 100
  width 100%
  top -100%
  left 0
  height 100%
  justify-content center
  align-items center
  opacity 0
  display flex
  transition opacity .5s ease, top .5s ease
  &--show
    top 0
    opacity 1
  &__container
    padding 20px 40px
    background-color #fcfcfc
    border-radius 10px
    font-weight bold
    text-align center
    transform scale(0)
    transition transform .5s ease
  &--show &__container
    transform scale(1)
  &__title
    font-size 20px
    margin 10px 0
  &__button
    border 0
    background-color #bdbdbd
    margin 20px 10px
    font-size 20px
    padding 5px 20px
    border-radius 5px
    cursor pointer
    display inline-block
  &__yes
    background-color #e6c65c
</style>
