<template>
  <div class="scroll" ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    data:{
      type: Array,
      default: []
    }
  },
  mounted() {
    setTimeout(() => {
      this.initScroll()
    }, 30)
  },
  watch: {

  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$ref.wrapper, {
        click: true,
        bounce: false,
        // pullUpload:this.pullUpload
      })
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    }
  }
}
</script>

<style lang="stylus" scoped>
.scroll
  height 100%
  overflow hidden
</style>