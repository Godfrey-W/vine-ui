<template>
  <transition
    :name="transition"
    @after-enter="$emit('on-opened')"
    @after-leave="$emit('on-closed')"
  >
    <div
      v-show="isActive"
      class="vine-dialog__wrapper"
      :style="wrapStyles"
      @click="handleWrapClick"
    >
      <div ref="dialog" class="vine-dialog" tabindex="-1" role="dialog" :class="classes" :style="styles">
        <div class="vine-dialog__header">
          <slot name="title">
            <h5 class="vine-dialog__title">{{ title }}</h5>
          </slot>
          <slot name="close" v-if="showClose">
            <button type="button" class="vine-dialog__close" @click="isActive = false">
              <span>&times;</span>
            </button>
          </slot>
        </div>
        <div ref="body" class="vine-dialog__body" v-if="rendered"><slot /></div>
        <div class="vine-dialog__footer" v-if="$slots.footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import overlayable from 'vine-ui/src/mixins/overlayable'
import scrollbar from 'vine-ui/src/mixins/scrollbar'
import { convertToUnit } from 'vine-ui/src/utils/helpers'
function getZIndex (el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return 0

  const index = +window.getComputedStyle(el).getPropertyValue('z-index')

  if (isNaN(index)) return getZIndex(el.parentNode)
  return index
}
let stackMinZIndex = 200
export default {
  name: 'vine-dialog',
  mixins: [overlayable, scrollbar],
  props: {
    value: Boolean,
    title: String,
    showClose: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: 'dialog-transition'
    },
    scrollable: Boolean,
    fullscreen: Boolean,
    appendToBody: Boolean,
    lockScroll: {
      type: Boolean,
      default: true
    },
    hideOverlay: Boolean,
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    },
    maxWidth: {
      type: [String, Number],
      default: 'none'
    },
    width: {
      type: [String, Number],
      default: 'auto'
    }
  },
  data () {
    return {
      isActive: this.value,
      rendered: false,
      activeZIndex: this.getActiceZIndex()
    }
  },
  computed: {
    wrapStyles () {
      return {
        zIndex: String(this.activeZIndex - 1)
      }
    },
    classes () {
      return {
        'vine-dialog--fullscreen': this.fullscreen,
        'vine-dialog--scrollable': this.scrollable
      }
    },
    styles () {
      return {
        maxWidth: this.maxWidth !== 'none' ? convertToUnit(this.maxWidth) : undefined,
        width: this.width !== 'auto' ? convertToUnit(this.width) : undefined
      }
    }
  },
  watch: {
    value (val) {
      this.isActive = val
    },
    isActive (val) {
      if (val) {
        this.$emit('on-open')
        this.$nextTick(() => {
          this.$refs.dialog.scrollTop = 0
          this.$refs.body.scrollTop = 0
        })
        this.show()
      } else {
        this.$emit('on-close')
        this.hide()
      }
      val !== this.value && this.$emit('input', val)
    }
  },
  mounted () {
    if (this.appendToBody) {
      document.body.appendChild(this.$el)
    }
    if (this.isActive) {
      this.show()
    }
  },
  destroyed() {
    // if appendToBody is true, remove DOM node after destroy
    if (this.appendToBody && this.$el && this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  },
  methods: {
    handleWrapClick (event) {
      if (!this.closeOnClickOverlay) return
      if (event.target.contains(this.$el)) {
        this.isActive = false
      }
    },
    show () {
      if (!this.rendered) {
        this.rendered = true
      }
      this.activeZIndex = this.getActiceZIndex()
      if (this.lockScroll) this.setScrollbar()
      if (!this.hideOverlay) this.genOverlay()
    },
    hide () {
      if (!this.hideOverlay) this.removeOverlay()
      if (this.lockScroll) {
        window.setTimeout(() => {
          this.resetScrollbar()
        }, 300)
      }
    },
    getActiceZIndex () {
      return stackMinZIndex++
    }
  }
}
</script>
