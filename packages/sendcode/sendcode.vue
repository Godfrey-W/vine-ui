<template>
  <button class="vine-sendcode"
    :class="{'vine-sendcode--disabled': disabled || start}"
    :disabled="disabled || start"
    @click="onClick"
  >
    {{ tmpStr }}
  </button>
</template>

<script>
import { isServer } from 'vine-ui/src/utils/helpers'
export default {
  name: 'vine-sendcode',
  props: {
    value: Boolean,
    disabled: Boolean,
    second: {
      type: [String, Number],
      validator (val) {
        return /^\d*$/.test(val)
      },
      default: 60
    },
    initText: {
      type: String,
      default: '发送验证码'
    },
    runText: {
      type: String,
      default: '{%s}s'
    },
    resetText: {
      type: String,
      default: '重新发送验证码'
    },
    storageKey: String
  },
  data () {
    return {
      tmpStr: '',
      timer: null,
      start: false,
      runSecond: this.second,
      lastSecond: 0,
      resend: false
    }
  },
  watch: {
    value (val) {
      this.start = val
      if (!val) {
        clearInterval(this.timer)
        this.tmpStr = this.resend ? this.resetText : this.initText
        if (this.storageKey) {
          window.sessionStorage.removeItem(this.storageKey)
          this.lastSecond = 0
        }
      } else {
        this.countdownStart()
      }
    }
  },
  created () {
    this.tmpStr = this.initText

    if (isServer) return

    const lastSecond = ~~((window.sessionStorage.getItem(this.storageKey) - Date.now()) / 1000)
    if (lastSecond > 0 && this.storageKey) {
      this.$emit('input', true)
      this.getTmpStr(lastSecond)
      this.lastSecond = lastSecond
    }
  },
  beforeDestroy () {
    !this.storageKey && this.timeout()
  },
  methods: {
    onClick () {
      if (!this.start && !this.disabled) this.$emit('click')
    },
    countdownStart () {
      if (this.disabled) return
      let lastSecond = this.lastSecond
      let second = lastSecond || this.runSecond
      if (this.storageKey) {
        const runSecond = Date.now() + second * 1000
        window.sessionStorage.setItem(this.storageKey, runSecond)
      }
      if (!lastSecond) {
        this.getTmpStr(second)
      }
      this.timer = setInterval(() => {
        second--
        this.getTmpStr(second)
        second <= 0 && this.timeout()
      }, 1000)
    },
    timeout () {
      this.resend = true
      this.tmpStr = this.resetText
      this.start = false
      this.$emit('input', false)
      clearInterval(this.timer)
    },
    getTmpStr (second) {
      this.tmpStr = this.runText.replace(/\{([^{]*?)%s(.*?)\}/g, second)
    }
  }
}
</script>
