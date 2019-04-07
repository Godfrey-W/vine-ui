# 对话框

`vine-dialog` 用于提示用户作一些决定，或者是完成某个任务时需要的一些其它额外的信息。

## 示例

:::demo
```html
<div class="demo-dialog">
  <demo-button type="primary" @click="visible = true">click me</demo-button>
  <vine-dialog v-model="visible" title="Privacy Policy">
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <template slot="footer">
      <demo-button @click="visible = false">cancel</demo-button>
      <demo-button type="primary" @click="visible = false">confirm</demo-button>
    </template>
  </vine-dialog>
</div>
<script>
export default {
  data () {
    return {
      visible: false
    }
  }
}
</script>
```
:::

## 全屏对话框

:::demo
```html
<div class="demo-dialog">
  <demo-button type="primary" @click="visible2 = true">click me</demo-button>
  <vine-dialog
    v-model="visible2"
    title="全屏对话框"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </vine-dialog>
</div>
<script>
export default {
  data () {
    return {
      visible2: false
    }
  }
}
</script>
<style>
  .dialog-bottom-transition-enter,
  .dialog-bottom-transition-leave-to {
    transform: translateY(100%);
  }
</style>
```
:::

## 可滚动

:::demo
```html
<div class="demo-dialog">
  <demo-button type="primary" @click="visible3 = true">click me</demo-button>
  <vine-dialog
    v-model="visible3"
    title="可滚动对话框"
    max-width="300"
    scrollable
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <template slot="footer">
      <demo-button @click="visible3 = false">cancel</demo-button>
      <demo-button type="primary" @click="visible3 = false">confirm</demo-button>
    </template>
  </vine-dialog>
</div>
<script>
export default {
  data () {
    return {
      visible3: false
    }
  }
}
</script>
```
:::

## 溢出

:::demo
```html
<div class="demo-dialog">
  <demo-button type="primary" @click="visible4 = true">click me</demo-button>
  <vine-dialog
    v-model="visible4"
    title="溢出动对话框"
    max-width="300"
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <template slot="footer">
      <demo-button @click="visible4 = false">cancel</demo-button>
      <demo-button type="primary" @click="visible4 = false">confirm</demo-button>
    </template>
  </vine-dialog>
</div>
<script>
export default {
  data () {
    return {
      visible4: false
    }
  }
}
</script>
```
:::


## Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | Dialog 可见性 | Boolean | - | - |
| title | Dialog 标题 | String | - | - |
| show-close | 是否显示关闭按钮 | Boolean | - | true |
| transition | 过渡动画方案 | String | - | dialog-transition |
| scrollable | 是否可以内部滚动(body) | Boolean | - | - |
| fullscreen | 改变布局全屏显示 | Boolean | - | - |
| append-to-body | Dialog 自身是否插入至 body 元素上 | Boolean | - | - |
| lock-scroll | 是否在 Dialog 出现时将 body 滚动锁定 | Boolean | - | true |
| hide-overlay | 隐藏遮罩 | Boolean | - | - |
| close-on-click-overlay | 是否可以通过点击 overlay 关闭 Dialog | Boolean | - | true |
| max-width | 内容的最大宽度 | String/Number | - | none |
| width | Dialog 宽度 | String/Number | - | auto |

## Slot

| name | 说明 |
|------|------|
| - | Dialog 的内容 |
| title | Dialog 标题区的内容 |
| footer | Dialog 按钮操作区的内容 |

## Events

| 事件名称 | 说明 | 回调参数 |
|------|------|------|
| on-open | Dialog 打开的回调 | - |
| on-opened | 	Dialog 打开动画结束时的回调 | - |
| on-close | Dialog 关闭的回调 | - |
| on-closed | Dialog 关闭动画结束时的回调 | - |

<script>
export default {
  data () {
    return {
      visible: false,
      visible2: false,
      visible3: false,
      visible4: false
    }
  }
}
</script>

<style lang="scss">
  .demo-dialog {
    .vine-dialog {
      &__title {
        margin-top: 0;
        margin-bottom: 0;
        height: 22px;
        font-size: 16px;
        line-height: 22px;
        font-weight: 500;
        color: inherit;
      }
    }
    .demo-button {
      margin: 0 8px;
    }
  }
  .dialog-bottom-transition-enter,
  .dialog-bottom-transition-leave-to {
    transform: translateY(100%);
  }
</style>
