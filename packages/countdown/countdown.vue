<template>
  <span class="vine-countdown">
    <slot v-bind:t="timeObj">{{ tmpTxt }}</slot>
  </span>
</template>

<script>
import { oneOf } from 'vine-ui/src/utils/helpers'
export default {
  name: 'vine-countdown',
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    value: {
      type: [String, Number, Date],
      default: Date.now()
    },
    type: {
      type: String,
      validator (value) {
        return oneOf(value, ['endtime', 'rest', 'timestamp'])
      },
      default: 'endtime'
    },
    format: {
      type: String,
      default: '{%d}天{%h}时{%m}分{%s}秒'
    },
    doneText: {
      type: String,
      default: '已结束'
    }
  },
  data () {
    return {
      tmpTxt: '',
      timer: null,
      timeObj: {}
    }
  },
  watch: {
    value (val) {
      clearInterval(this.timer)
      val && this.run()
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  mounted () {
    this.$nextTick(() => {
      this.run()
    })
  },
  methods: {
    run () {
      if (!this.value) return

      if (this.type === 'rest') {
        this._lastTime = Math.floor(Date.now() / 1000) + ~~this.value
      } else if (this.type === 'timestamp') {
        this._lastTime = Math.floor(new Date(this.value).getTime() / 1000)
      } else {
        this._lastTime = Math.floor(new Date(this.value).getTime() / 1000)
      }

      if (this.value instanceof Date) {
        this._lastTime = Math.floor(this.value.getTime() / 1000)
      }

      this.doRun()
      this.timer = setInterval(this.doRun, 1000)
    },
    doRun () {
      let leftTime = this._lastTime - Math.floor(Date.now() / 1000)

      if (leftTime > 0) {
        this.tmpTxt = this.formatTimestamp(leftTime)
      } else {
        this.$emit('on-end')
        this.tmpTxt = this.doneText || ''
        clearInterval(this.timer)
      }
    },
    formatTimestamp (timestamp) {
      let format = this.format
      const o = {
        'd+': parseInt(timestamp / 60 / 60 / 24, 10),
        'h+': parseInt(timestamp / 60 / 60 % 24, 10),
        'm+': parseInt(timestamp / 60 % 60, 10),
        's+': parseInt(timestamp % 60, 10)
      }
      const t = {}
      const ment = function (num) {
        if (num <= 0)  return '00'
        return num < 10 ? '0' + num : num
      }
      for (const k in o) {
        const reg = new RegExp('({%' + k + '})')
        
        if (reg.test(format)) {
          t[RegExp.$1.slice(2, 3)] = ment(o[k])
          format = format.replace(reg, ment(o[k]))
        }
      }
      this.timeObj = t
      return format
    }
  }
}
</script>
