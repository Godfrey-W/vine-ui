class Transition {
  beforeEnter (el) {
    el._initialStyle = {
      transition: el.style.transition,
      visibility: el.style.visibility,
      overflow: el.style.overflow,
      height: el.style.height
    }
  }

  enter (el) {
    const initialStyle = el._initialStyle
    el.style.setProperty('transition', 'none', 'important')
    el.style.visibility = 'hidden'
    const size = `${el.offsetHeight}px`
    el.style.visibility = initialStyle.visibility
    el.style.overflow = 'hidden'
    el.style.height = 0
    void el.offsetHeight // force reflow
    el.style.transition = initialStyle.transition

    requestAnimationFrame(() => {
      el.style.height = size
    })
  }

  afterEnter (el) {
    resetStyles(el)
  }
  enterCancelled (el) {
    resetStyles(el)
  }

  leave (el) {
    el._initialStyle = {
      overflow: el.style.overflow,
      height: el.style.height
    }

    el.style.overflow = 'hidden'
    el.style.height = `${el.offsetHeight}px`
    void el.offsetHeight // force reflow

    requestAnimationFrame(() => el.style.height = 0)
  }

  afterLeave (el) {
    resetStyles(el)
  }
  leaveCancelled (el) {
    resetStyles(el)
  }
}

function resetStyles (el) {
  el.style.overflow = el._initialStyle.overflow
  el.style.height = el._initialStyle.height
  delete el._initialStyle
}

export default {
  name: 'vine-expand-transition',
  functional: true,
  render(h, { children }) {
    const data = {
      on: new Transition()
    }
    return h('transition', data, children)
  }
}
