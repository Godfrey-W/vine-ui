<template>
  <aside :class="b({
    dismissible,
    animate: animating,
    opening: opening,
    closing: closing,
    open: visible
  })">
    <div :class="b('header')" v-if="title">
      <h3 :class="b('title')">{{ title }}</h3>
      <h6 :class="b('subtitle')" v-if="subtitle">{{ subtitle }}</h6>
    </div>
    <div :class="b('content')">
      <slot />
    </div>
  </aside>
</template>

<script>
import create from 'vine/src/utils/create'
import { setTimeout } from 'timers';
export default create({
  name: 'drawer',
  props: {
    title: String,
    subtitle: String,
    dismissible: Boolean,
    open: Boolean
  },
  data () {
    return {
      visible: this.open,
      animating: false,
      opening: false,
      closing: false
    }
  },
  watch: {
    open (val, prev) {
      if (prev) {
        this.closing = true
        setTimeout(() => {
          this.closing = false
          this.visible = false
        }, 200)
      } else {
        this.visible = true
        this.animating = true
        this.$nextTick(() => {
          this.$el.offsetWidth
          this.opening = true
          setTimeout(() => {
            this.animating = false
            this.opening = false
          }, 250)
        })
      }
      this.visible = val
    },
    visible (val) {
      this.$emit('input', val)
    }
  }
})
</script>

<style lang="scss">
  .vine-drawer {
    width: 256px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    height: 100%;
    border-color: rgba(0,0,0,.12);
    background-color: #fff;
    border-radius: 0 0 0 0;
    z-index: 6;
    box-sizing: border-box;
    transition-property: -webkit-transform;
    transition-property: transform;
    transition-property: transform,-webkit-transform;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
    border-right-width: 1px;
    border-right-style: solid;
    overflow: hidden;
    &__header {
      flex-shrink: 0;
      box-sizing: border-box;
      min-height: 64px;
      padding: 0 16px 4px;
    }
    &__title {
      display: block;
      margin-top: 0;
      margin-bottom: -20px;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      color: rgba(0,0,0,.87);
      font-size: 1.25rem;
      line-height: normal;
      font-weight: 500;
      letter-spacing: .0125em;
      text-decoration: inherit;
      text-transform: inherit;
      &:before {
        display: inline-block;
        width: 0;
        height: 36px;
        content: "";
        vertical-align: 0;
      }
      &:after {
        display: inline-block;
        width: 0;
        height: 20px;
        content: "";
        vertical-align: -20px;
      }
    }
    &__subtitle {
      display: block;
      margin-top: 0;
      margin-bottom: 0;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      color: rgba(0,0,0,.6);
      font-size: .875rem;
      font-weight: 400;
      letter-spacing: .0178571429em;
      text-decoration: inherit;
      text-transform: inherit;
      line-height: normal;
      &:after {
        display: inline-block;
        width: 0;
        height: 20px;
        content: "";
        vertical-align: 0;
      }
    }
    &__content {
      height: 100%;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }
    &--dismissible {
      left: 0;
      right: auto;
      display: none;
      position: absolute;
      &.vine-drawer {
        &--open {
          display: flex;
        }
      }
    }
    &--animate {
      transform: translateX(-100%);
    }
    &--opening {
      transform: translateX(0);
      transition-duration: 250ms;
    }
    &--closing {
      transform: translateX(-100%);
      transition-duration: 200ms;
    }
  }
</style>
