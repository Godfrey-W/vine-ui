<script>
export default {
  name: 'demo-button',
  props: {
    tag: {
      type: String,
      default: 'button'
    },
    disabled: Boolean,
    type: {
      type: String,
      validator (value) {
        return ['default', 'primary'].indexOf(value) > -1
      },
      default: 'default'
    }
  },
  computed: {
    classes () {
      return {
        'demo-button--disabled': this.disabled,
        [`demo-button--${this.type}`]: this.type !== 'default'
      }
    }
  },
  render () {
    const data = {
      staticClass: 'demo-button',
      class: this.classes,
      attrs: {},
      on: {
        click: () => !this.disabled && this.$emit('click')
      }
    }
    if (this.tag === 'button') {
      data.attrs.disabled = this.disabled
    } else {
      data.attrs.role = 'button'
    }
    return this.$createElement(this.tag, data, this.$slots.default)
  }
}
</script>

<style lang="scss">
  .demo-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 16px;
    margin: 0;
    min-width: 64px;
    box-sizing: border-box;
    transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1),
      border 250ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.2),
      0px 2px 2px 0px rgba(0,0,0,0.14),
      0px 3px 1px -2px rgba(0,0,0,0.12);
    font-size: 0.875rem;
    line-height: 1.75;
    font-weight: 500;
    border-radius: 4px;
    letter-spacing: 0.02857em;
    text-transform: uppercase;
    border: 0;
    color: rgba(0, 0, 0, 0.87);
    background-color: #e0e0e0;
    cursor: pointer;
    outline: none;
    user-select: none;
    vertical-align: middle;
    -moz-appearance: none;
    text-decoration: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    &:active {
      box-shadow: 0px 5px 5px -3px rgba(0,0,0,0.2),
        0px 8px 10px 1px rgba(0,0,0,0.14),
        0px 3px 14px 2px rgba(0,0,0,0.12);
    }
    &:hover {
      text-decoration: none;
      background-color: #d5d5d5;
    }
    &--primary {
      color: #fff;
      background-color: #2196f3;
      &:hover {
        background-color: #1976d2;
      }
    }
  }
</style>
