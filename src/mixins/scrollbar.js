
function getScrollbarWidth () {
  let scrollBarWidth
  if (typeof window === 'undefined') return 0

  const outer = document.createElement('div')
  outer.className = 'vine-scrollbar__wrap'
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.position = 'absolute'
  outer.style.top = '-9999px'
  document.body.appendChild(outer)

  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'

  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)

  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  scrollBarWidth = widthNoScroll - widthWithScroll
  return scrollBarWidth
}

export default {
  data () {
    return {
      isBodyOverflowing: false,
      scrollbarWidth: 0,
      bodyCacheStyles: {}
    }
  },
  methods: {
    setScrollbar () {
      const rect = document.body.getBoundingClientRect()
      const isBodyOverflowing = rect.left + rect.right < window.innerWidth
      this.scrollbarWidth = getScrollbarWidth()

      if (isBodyOverflowing) {
        // Adjust body padding
        const actualPadding = document.body.style.paddingRight
        const actualOverflow = document.body.style.overflow
        const actualOverflowX = document.body.style.overflowX
        const actualOverflowY = document.body.style.overflowY
        const calculatedPadding = window.getComputedStyle(document.body)['padding-right']

        this.bodyCacheStyles = {
          paddingRight: actualPadding,
          overflow: actualOverflow,
          overflowX: actualOverflowX,
          overflowY: actualOverflowY
        }
        document.body.style.paddingRight = `${parseFloat(calculatedPadding) + this.scrollbarWidth}px`
        document.body.style.overflow = 'hidden'
      }
    },
    resetScrollbar () {
      const isReset = document.querySelectorAll('.vine-overlay--active').length > 0
      if (isReset) return
      document.body.style.paddingRight = ''
      document.body.style.overflow = ''
      for (let k in this.bodyCacheStyles) {
        if (this.bodyCacheStyles[k]) {
          document.body.style[k] = this.bodyCacheStyles[k]
        }
      }
    }
  }
}
