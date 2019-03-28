<template>
  <div class="vine-collapse-panel" :class="panelCls">
    <div class="vine-collapse-panel__header" @click="onHeaderClick">
      <slot name="title">
        <h3 class="vine-collapse-panel__title">{{ title }}</h3>
      </slot>
      <div class="vine-collapse-panel__actions" v-if="!hideActions">
        <slot name="actions">
          <action-svg />
        </slot>
      </div>
    </div>
    <expand-transition>
      <div class="vine-collapse-panel__body" v-show="isActive">
        <div class="vine-collapse-panel__content">
          <slot />
        </div>
      </div>
    </expand-transition>
  </div>
</template>

<script>
import expandTransition from 'vine-ui/src/transitions/collapse-transition'
import actionSvg from './action-svg'
export default {
  name: 'vine-collapse-panel',
  inject: ['collapse'],
  components: {
    expandTransition,
    actionSvg
  },
  props: {
    title: String,
    disabled: Boolean,
    hideActions: Boolean
  },
  data () {
    return {
      isActive: false
    }
  },
  computed: {
    panelCls () {
      return {
        'vine-collapse-panel--disabled': this.isDisabled,
        'vine-collapse-panel--active': this.isActive
      }
    },
    isDisabled () {
      return this.collapse.disabled || this.disabled
    }
  },
  beforeMount () {
    this.collapse.register(this)
  },
  beforeDestroy () {
    this.collapse.unregister(this)
  },
  methods: {
    onHeaderClick () {
      !this.isDisabled && this.collapse.panelClick(this._uid)
    },
    toggle (active) {
      this.isActive = active
    }
  }
}
</script>
