<template>
  <div id="app">
    <vine-drawer dismissible :open="open" title="Vine-ui" subtitle="v0.0.1">
      sa
    </vine-drawer>
    <main class="app-content" :style="contentStyles">
      <button @click="open = !open">open</button>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      open: false
    }
  },
  computed: {
    contentStyles () {
      return this.open ? {
        paddingLeft: '256px',
        transitionDuration: '200ms'
      } : {
        paddingLeft: '',
        transitionDuration: '250ms'
      }
    }
  }
}
</script>

<style lang="scss">
  #app {
    display: flex;
    height: 100vh;
  }
  .app {
    &-content {
      flex: 1;
      overflow: auto;
      height: 100%;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
  }
</style>
