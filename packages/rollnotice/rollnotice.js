import { oneOf, addClass, removeClass, convertToUnit, once } from 'vine-ui/src/utils/helpers'
const ACTIVE_CLASS = 'vine-rollnotice-item--active'
const ENTER_CLASS = 'vine-rollnotice-item--enter'
export default {
  name: 'vine-rollnotice',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    height: {
      type: [String, Number],
      default: 30
    },
    direction: {
      type: String,
      validator (value) {
        return oneOf(value, ['up', 'down'])
      },
      default: 'up'
    },
    align: {
      type: String,
      validator (value) {
        return oneOf(value, ['left', 'center', 'right'])
      },
      default: 'left'
    },
    speed: {
      type: [String, Number],
      validator (value) {
        return /^\d*$/.test(value)
      },
      default: 300
    },
    autoplay: {
      type: [String, Number],
      validator (value) {
        return /^\d*$/.test(value)
      },
      default: 4000
    },
    noScrollWhenSingle: Boolean
  },
  data () {
    return {
      ready: false,
      index: 0,
      items: [],
      timer: null,
      reInitTimer: null,
      noScroll: false,
      animating: false
    }
  },
  computed: {
    classes () {
      return {
        [`vine-rollnotice--align-${this.align}`]: this.align !== 'left'
      }
    },
    styles () {
      return {
        height: convertToUnit(this.height)
      }
    }
  },
  methods: {
    rollnoticeItemCreated () {
      if (!this.ready) return
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitItems()
      }, 100)
    },
    rollnoticeItemDestroyed () {
      if (!this.ready) return
      clearTimeout(this.reInitTimer)
      this.reInitTimer = setTimeout(() => {
        this.reInitItems()
      }, 100)
    },
    translate(element, offset, speed, callback) {
      if (speed) {
        this.animating = true
        element.style.transitionDuration = `${speed}ms`
        setTimeout(() => {
          element.style.transform =  `translate3d(0, ${offset}px, 0)`
        }, 20)

        let called = false

        const transitionEndCallback = () => {
          if (called) return
          called = true
          this.animating = false
          element.style.transition = ''
          element.style.transform = ''
          if (callback) {
            callback.apply(this, arguments)
          }
        }

        once(element, 'transitionend', transitionEndCallback)
        setTimeout(transitionEndCallback, speed + 100)
      } else {
        element.style.transitionDuration = ''
        element.style.transform = `translate3d(0, ${offset}px, 0)`
      }
    },
    reInitItems () {
      const children = this.$children
      this.noScroll = children.length === 1 && this.noScrollWhenSingle

      const items = []
      const defaultIndex = (this.index >= 0 && this.index < children.length) ? this.index : 0
      this.index = defaultIndex

      children.forEach((child, index) => {
        items.push(child.$el)

        removeClass(child.$el, ACTIVE_CLASS)

        if (index === defaultIndex) {
          addClass(child.$el, ACTIVE_CLASS)
        }
      })

      this.items = items
    },
    doAnimate (direction) {
      if (this.$children.length === 0) return
      if (this.noScroll && this.$children.length < 2) return

      let prevItem, nextItem, currentItem
      let speed = this.speed || 300
      let index = this.index
      let items = this.items
      let itemCount = items.length
      let itemHeight = parseInt(this.height)

      currentItem = items[index]
      prevItem = items[index - 1]
      nextItem = items[index + 1]
      if (items.length > 1) {
        if (!prevItem) {
          prevItem = items[items.length - 1]
        }
        if (!nextItem) {
          nextItem = items[0]
        }
      }
      if (prevItem) {
        addClass(prevItem, ENTER_CLASS)
        this.translate(prevItem, -itemHeight)
      }
      if (nextItem) {
        addClass(nextItem, ENTER_CLASS)
        this.translate(nextItem, itemHeight)
      }

      let newIndex

      let oldItem = this.$children[index].$el

      if (direction === 'up') {
        if (index < itemCount - 1) {
          newIndex = index + 1
        }
        if (index === itemCount - 1) {
          newIndex = 0
        }
      } else if (direction === 'down') {
        if (index > 0) {
          newIndex = index - 1
        }
        if (index === 0) {
          newIndex = itemCount - 1
        }
      }

      const callback = () => {
        if (newIndex !== undefined) {
          let newItem = this.$children[newIndex].$el
          removeClass(oldItem, ACTIVE_CLASS)
          addClass(newItem, ACTIVE_CLASS)

          this.index = newIndex
        }
        if (prevItem) {
          removeClass(prevItem, ENTER_CLASS)
          prevItem.style.transform = ''
        }
        if (nextItem) {
          removeClass(nextItem, ENTER_CLASS)
          nextItem.style.transform = ''
        }
      }

      setTimeout(() => {
        if (direction === 'up') {
          this.translate(currentItem, -itemHeight, speed, callback)
          if (nextItem) {
            this.translate(nextItem, 0, speed)
          }
        } else if (direction === 'down') {
          this.translate(currentItem, itemHeight, speed, callback)
          if (prevItem) {
            this.translate(prevItem, 0, speed)
          }
        }
      }, 10)
    },
    initTimer () {
      const delay = parseInt(this.autoplay)
      if (delay > 0 && !this.timer) {
        this.timer = setInterval(() => {
          if (!this.animating) this.doAnimate(this.direction)
        }, delay)
      }
    },
    clearTimer() {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  destroyed() {
    if (this.timer) {
      this.clearTimer()
    }
    if (this.reInitTimer) {
      clearTimeout(this.reInitTimer)
      this.reInitTimer = null
    }
  },
  mounted () {
    this.ready = true

    this.initTimer()

    this.reInitItems()
  },
  render (h) {
    return h(this.tag, {
      staticClass: 'vine-rollnotice',
      class: this.classes,
      style: this.styles
    }, this.$slots.default)
  }
}
