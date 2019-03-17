<template>
  <div class="demo-block">
    <div class="demo-block__toolbar">
      <button class="demo-block__view-btn" @click="visible = !visible">
        <demo-icon name="code" />
      </button>
    </div>
    <expand-transition>
      <div class="demo-block__meta" v-show="visible">
        <slot name="highlight" />
      </div>
    </expand-transition>
    <div class="demo-block__content">
      <slot name="source" />
    </div>
  </div>
</template>

<script>
import ExpandTransition from '@/transitions/expand-transition'
export default {
  name: 'demo-block',
  components: {
    ExpandTransition
  },
  data () {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss">
  .demo-block {
    &__toolbar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 48px;
    }
    &__view-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 12px;
      color: rgba(0, 0, 0, 0.54);
      border: 0;
      font-size: 1.5rem;
      cursor: pointer;
      outline: none;
      user-select: none;
      border-radius: 50%;
      vertical-align: middle;
      text-decoration: none;
      background-color: transparent;
      transition: background-color 150ms cubic-bezier(0.4, 0, 0.2, 1);
      -webkit-appearance: none;
      -moz-appearance: none;
      -webkit-tap-highlight-color: transparent;
      &:hover {
        background-color: rgba(0, 0, 0, 0.08);
      }
      .demo-icon {
        width: 1em;
        height: 1em;
        display: inline-block;
        font-size: 24px;
        transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
        user-select: none;
      }
    }
    &__meta {
      transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    }
    &__content {
      display: flex;
      padding: 20px;
      border-radius: 4px;
      justify-content: center;
      background-color: #eeeeee;
    }
  }
</style>
