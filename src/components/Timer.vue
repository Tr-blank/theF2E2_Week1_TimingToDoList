<template lang="pug">
  div(:class="{ 'timer--start' : isStart, 'timer--rest' : isStart && time > 1500 }")
    div.timer__container

      div.timer__progress(
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow="55"
      )
        svg.timer__progress-svg(xmlns="http://www.w3.org/2000/svg" viewBox="24 24 48 48")
          circle.timer__progress-circle(
            fill="transparent"
            cx="48"
            cy="48"
            r="22"
            stroke-width="3"
            stroke-dasharray="125.664"
            stroke-dashoffset="56.548667764616276px"
          )
      div.timer__content
        div.timer__control
          font-awesome-icon.timer__control-icon.timer__control-play(icon="play" @click="timerStart()" v-if="!isStart")
          font-awesome-icon.timer__control-icon.timer__control-pause(icon="pause" @click="timerPause()" v-if="isStart")
    div.timer__time
      |{{ showTime }}
      font-awesome-icon.timer__control-step-backward(icon="undo-alt" @click="timerStepBackward()" v-if="!isStart && time != 1800")
</template>

<script>
export default {
  name: 'Timer',
  data() {
    return {
    }
  },
  props: {
    time: {
      type: Number
    },
    isStart: {
      type: Boolean
    },
    start: {
      type: Function
    },
    pause: {
      type: Function
    },
    stepBackward: {
      type: Function
    }
  },
  computed: {
    showTime() {
      let timeValue = ''
      if (this.time > -1) {
        const min = Math.floor(this.time / 60)
        const sec = this.time % 60
        if (min < 10) { timeValue += '0' }
        timeValue += min + ':'
        if (sec < 10) { timeValue += '0' }
        timeValue += sec
      }
      return timeValue
    }
  },
  mounted() {
    // console.log('listData', this.listData)
  },
  methods: {
    timerStart() {
      this.start()
    },
    timerPause() {
      this.pause()
    },
    timerStepBackward() {
      this.stepBackward()
    }
  }
}
</script>

<style lang="stylus" scoped>
@keyframes rest_time
  0%
    transform scale(1.3)
    opacity 0
  90%
    transform scale(1)
    opacity 1
  100%
    transform scale(1.3)
    opacity 0
.timer
  &__progress
    height 320px
    width 320px
    color rgb(114, 160, 103)
    caret-color rgb(114, 160, 103)
    position absolute
    top -10px
    left -10px
    &-svg
      width 100%
      height 100%
      margin auto
      position absolute
      top 0
      bottom 0
      left 0
      right 0
      z-index 0
      overflow hidden
      transform rotate(-90deg)
    &-circle
      stroke currentColor
      z-index 2
      transition all .6s ease-in-out;
  &__container
    margin 60px auto
    border-radius 50%
    position relative
    width 300px
    height 300px
    transition background-color .35s ease
    background-color #676767
  &__content
    position absolute
    top 5px
    left 5px
    width 290px
    height 290px
    display flex
    justify-content space-evenly
    align-items center
    flex-flow column
    border-radius 50%
    background-color #e2d9b9
    transition background-color .35s ease
    border 6px solid #333333
  &--start &__container
    background-color #b96a47
    &::before
      content ''
      position absolute
      width 292px
      height 292px
      left 0
      top 0
      border 4px solid #b96a47
      border-radius 50%
      animation rest_time 1s ease-out infinite
  &--start &__content
    background-color #e6c65c
  &--rest &__container
    background-color #4a6741
    &::before
      border-color #4a6741
  &--rest &__content
    background-color #72a068
  &__time
    font-size 80px
    position relative
    margin 40px 0 20px
    padding 10px
    &::after
      content ''
      height 0px
      width 60%
      border 2px solid #616161
      position absolute
      border-radius 50%
      left 50%
      margin-left -30%
      bottom 0
  &__control
    font-size 80px
    &-icon
      display block
      margin 10px
      border-radius 50%
      width 80px
      height 80px
      cursor pointer
    &-play
      padding 10px 0px 10px 20px
    &-pause
      padding 10px
    &-step-backward
      font-size 21px
      margin-left 15px
      color #616161
      cursor pointer
      position absolute
      bottom 40px
</style>
