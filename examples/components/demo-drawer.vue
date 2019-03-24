<template>
  <aside class="demo-drawer">
    <div class="demo-drawer__header">
      <h3 class="demo-drawer__title">Vine-UI</h3>
      <h6 class="demo-drawer__subtitle">v0.0.1</h6>
    </div>
    <div class="demo-drawer__content">
      <slot />
    </div>
  </aside>
</template>

<script>
export default {
  name: 'demo-drawer'
}
</script>

<style lang="scss">
  .demo {
    &-drawer {
      position: fixed;
      border-color: rgba(0,0,0,.12);
      background-color: #fff;
      border-radius: 0 0 0 0;
      z-index: 6;
      width: 256px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      box-sizing: border-box;
      height: 100%;
      transition-property: transform;
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
        font-size: 1.25rem;
        color: rgba(0, 0, 0, .87);
        line-height: 2rem;
        font-weight: 500;
        -moz-font-smoothing: antialiased;
        -webkit-font-smoothing: antialiased;
        letter-spacing: .0125em;
        text-decoration: inherit;
        text-transform: inherit;
        line-height: normal;
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
        -moz-font-smoothing: antialiased;
        -webkit-font-smoothing: antialiased;
        font-size: .875rem;
        color: rgba(0, 0, 0, .6);
        line-height: 1.25rem;
        font-weight: 400;
        letter-spacing: .0178571429em;
        text-decoration: inherit;
        text-transform: inherit;
        line-height: normal;
        margin-bottom: 0;
        &:before {
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
    }
    &-content {
      position: relative;
      padding-left: 256px;
    }
  }
</style>
