<template>
  <svg
    class="demo-icon"
    aria-hidden="true"
  >
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
export default {
  name: 'demo-icon',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.name}`
    }
  }
}
</script>

<style lang="scss">
  .demo-icon {
    width: 100%;
    height: 100%;
    fill: currentColor;
  }
</style>
