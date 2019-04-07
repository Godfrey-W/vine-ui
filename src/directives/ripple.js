
const CLASS_NAME = {
  RIPPLE: 'v-ripple',
  ANIMATION: 'v-ripple__animation',
  ANIMATION_ENTER: 'v-ripple__animation--enter',
  ANIMATION_IN: 'v-ripple__animation--in',
  ANIMATION_OUT: 'v-ripple__animation--out',
  ANIMATION_VISIBLE: 'v-ripple__animation--visible'
}

function transform (el, value) {
  const venders = ['webkitTransform', 'mozTransform', 'oTransform', 'msTransform', 'transform']
  venders.forEach(prop => {
    el.style[prop] = value
  })
}

function opacity (el, value) {
  el.style['opacity'] = value.toString()
}

function isTouchEvent (event) {
  return event.constructor.name === 'TouchEvent'
}

const calculate = (event, el, value = {}) => {
  const offset = el.getBoundingClientRect()
  const target = isTouchEvent(event) ? event.touches[event.touches.length - 1] : event
  const localX = target.clientX - offset.left
  const localY = target.clientY - offset.top

  let radius = 0
  let scale = 0.3
  if (el._ripple && el._ripple.circle) {
    scale = 0.15
    radius = el.clientWidth / 2
    radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localX - radius) ** 2 ) / 4
  } else {
    radius = Math.sqrt(el.clientWidth ** 2 + el.clientWidth ** 2) / 2
  }

  const centerX = `${(el.clientWidth - (radius * 2)) / 2}px`
  const centerY = `${(el.clientHeight - (radius * 2)) / 2}px`

  const x = value.center ? centerX : `${localX - radius}px`
  const y = value.center ? centerY : `${localY - radius}px`

  return { radius, scale, x, y, centerX, centerY }
}

const ripple = {
  show (event, el, value = {}) {
    if (!el._ripple || !el._ripple.enabled) return

    const container = document.createElement('span')
    const animation = document.createElement('span')

    container.appendChild(animation)
    container.className = CLASS_NAME.RIPPLE

    if (value.class) container.classList.add(value.class)

    const { radius, scale, x, y, centerX, centerY } = calculate(event, el, value)

    const size = `${radius * 2}px`
    animation.className = CLASS_NAME.ANIMATION
    animation.style.width = size
    animation.style.height = size

    el.appendChild(container)

    const computed = window.getComputedStyle(el)
    if (computed && computed.position === 'static') {
      el.style.position = 'relative'
      el.dataset.previousPosition = 'static'
    }

    animation.classList.add(CLASS_NAME.ANIMATION_ENTER)
    animation.classList.add(CLASS_NAME.ANIMATION_VISIBLE)
    transform(animation, `translate(${x}, ${y}) scale3d(${scale}, ${scale}, ${scale})`)
    opacity(animation, 0)
    animation.dataset.activated = String(performance.now())

    setTimeout(() => {
      animation.classList.remove(CLASS_NAME.ANIMATION_ENTER)
      animation.classList.add(CLASS_NAME.ANIMATION_IN)
      transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`)
      opacity(animation, 0.25)
    }, 0)
  },
  hide (el) {
    if (!el || !el._ripple || !el._ripple.enabled) return

    const ripples = el.getElementsByClassName(CLASS_NAME.ANIMATION)

    if (ripples.length === 0) return
    const animation = ripples[ripples.length - 1]

    if (animation.dataset.isHiding) return
    animation.dataset.isHiding = 'true'

    const diff = performance.now() - Number(animation.dataset.activated)
    const delay = Math.max(250 - diff, 0)

    setTimeout(() => {
      animation.classList.remove(CLASS_NAME.ANIMATION_IN)
      animation.classList.add(CLASS_NAME.ANIMATION_OUT)
      opacity(animation, 0)

      setTimeout(() => {
        const ripples = el.getElementsByClassName(CLASS_NAME.ANIMATION)
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition
          delete el.dataset.previousPosition
        }

        animation.parentNode && el.removeChild(animation.parentNode)
      }, 300)
    }, delay)
  }
}

function isRippleEnabled (value) {
  return typeof value === 'undefined' || !!value
}

function rippleShow (event) {
  const value = {}
  const element = event.currentTarget
  if (!element || !element._ripple || element._ripple.touched) return
  if (isTouchEvent(event)) {
    element._ripple.touched = true
  }
  value.center = element._ripple.centered
  if (element._ripple.class) {
    value.class = element._ripple.class
  }
  ripple.show(event, element, value)
}

function rippleHide (event) {
  const element = event.currentTarget
  if (!element) return

  window.setTimeout(() => {
    if (element._ripple) {
      element._ripple.touched = false
    }
  })
  ripple.hide(element)
}

function updateRipple (el, binding, wasEnabled) {
  const enabled = isRippleEnabled(binding.value)
  if (!enabled) ripple.hide(el)
  el._ripple = el._ripple || {}
  el._ripple.enabled = enabled
  const value = binding.value || {}
  if (value.center) {
    el._ripple.centered = true
  }
  if (value.class) {
    el._ripple.class = binding.value.class
  }
  if (value.circle) {
    el._ripple.circle = value.circle
  }
  if (enabled && !wasEnabled) {
    el.addEventListener('touchstart', rippleShow, { passive: true })
    el.addEventListener('touchend', rippleHide, { passive: true })
    el.addEventListener('touchcancel', rippleHide)

    el.addEventListener('mousedown', rippleShow)
    el.addEventListener('mouseup', rippleHide)
    el.addEventListener('mouseleave', rippleHide)
    el.addEventListener('dragstart', rippleHide, { passive: true })
  } else if (!enabled && wasEnabled) {
    removeListeners(el)
  }
}

function removeListeners (el) {
  el.removeEventListener('mousedown', rippleShow)
  el.removeEventListener('touchstart', rippleHide)
  el.removeEventListener('touchend', rippleHide)
  el.removeEventListener('touchcancel', rippleHide)
  el.removeEventListener('mouseup', rippleHide)
  el.removeEventListener('mouseleave', rippleHide)
  el.removeEventListener('dragstart', rippleHide)
}

function directive (el, binding, vnode) {
  updateRipple(el, binding, false)

  // warn if an inline element is used, waiting for el to be in the DOM first
  vnode.context && vnode.context.$nextTick(() => {
    const computed = window.getComputedStyle(el)
    if (computed && computed.display === 'inline') {
      console.warn('v-ripple can only be used on block-level elements')
    }
  })
}

function unbind (el) {
  delete el._ripple
  removeListeners(el)
}

function update (el, binding) {
  if (binding.value === binding.oldValue) return

  const wasEnabled = isRippleEnabled(binding.oldValue)
  updateRipple(el, binding, wasEnabled)
}

export default {
  bind: directive,
  unbind,
  update
}
