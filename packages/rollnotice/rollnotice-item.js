export default {
  name: 'vine-rollnotice-item',
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  mounted () {
    this.$parent && this.$parent.rollnoticeItemCreated && this.$parent.rollnoticeItemCreated()
  },
  destroyed () {
    this.$parent && this.$parent.rollnoticeItemDestroyed && this.$parent.rollnoticeItemDestroyed()
  },
  render (h) {
    return h(this.tag, {
      staticClass: 'vine-rollnotice-item'
    }, this.$slots.default)
  }
}
