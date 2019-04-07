export default {
  name: 'overlayable',

  props: {
    hideOverlay: Boolean
  },

  data () {
    return {
      overlay: null,
      overlayTimer: undefined,
      overlayTransitionDuration: 500 + 150 // transition + delay
    }
  },

  watch: {
    hideOverlay (value) {
      value ? this.removeOverlay() : this.genOverlay()
    }
  },

  beforeDestroy () {
    this.removeOverlay()
  },

  methods: {
    genOverlay () {
      // If fn is called and timeout is active
      // or overlay already exists
      // cancel removal of overlay and re-add active
      if ((!this.isActive || this.hideOverlay) ||
        (this.isActive && this.overlayTimeout) ||
        this.overlay
      ) {
        clearTimeout(this.overlayTimeout)

        return this.overlay && this.overlay.classList.add('vine-overlay--active')
      }

      this.overlay = document.createElement('div')
      this.overlay.className = 'vine-overlay'

      document.body.insertBefore(this.overlay, document.body.firstChild)
      
      this.overlay.clientHeight // Force repaint
      requestAnimationFrame(() => {
        if (!this.overlay) return

        this.overlay.classList.add('vine-overlay--active')

        if (this.activeZIndex !== undefined) {
          this.overlay.style.zIndex = String(this.activeZIndex - 1)
        }
      })
    },
    removeOverlay () {
      if (!this.overlay) return

      this.overlay.classList.remove('vine-overlay--active')

      this.overlayTimer = window.setTimeout(() => {
        // IE11 Fix
        try {
          if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay)
          }
          this.overlay = null
        } catch (e) { console.log(e) }

        clearTimeout(this.overlayTimer)
        this.overlayTimer = undefined
      }, this.overlayTransitionDuration)
    }
  }
}