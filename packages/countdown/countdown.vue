<template>
  <span class="vine-countdown">
    <slot v-bind:t="timeObj">{{ tmpTxt }}</slot>
  </span>
</template>

<script>
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
        return ['endtime', 'rest', 'timestamp'].indexOf(value) > -1
      },
      default: 'endtime'
    },
    format: {
      type: String,
      default: 'dd天hh小时mm分ss秒'
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
      for (const k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          const ment = RegExp.$1.length === 1
            ? o[k] : (('' + o[k]).length === 1 ? '0' + o[k] : o[k])
          t[RegExp.$1.charAt(0)] = ment
          format = format.replace(RegExp.$1, ment)
        }
      }
      this.timeObj = t
      return format
    }
  }
}
</script>
