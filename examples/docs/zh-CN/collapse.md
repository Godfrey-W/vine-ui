# 折叠面板

`vine-collapse` 将内容区域折叠/展开，组件的默认功能是一次仅显示一个展开面板主题，即手风琴模式。

## 示例

:::demo
```html
<vine-collapse class="demo-collapse">
  <vine-collapse-panel>
    <h3 slot="header">静夜思</h3>
    <p>床前明月光</p>
    <p>疑似地上霜</p>
    <p>举头望明月</p>
    <p>低头思故乡</p>
  </vine-collapse-panel>
</vine-collapse>
```
:::

## 展开多个面板

:::demo
```html
<vine-collapse class="demo-collapse" v-model="panel" accordion>
  <vine-collapse-panel v-for="i in 5" :key="i">
    <h3 slot="header">Item</h3>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>
  </vine-collapse-panel>
</vine-collapse>
<script>
export default {
  data () {
    return {
      panel: [false, true, true]
    }
  }
}
</script>
```
:::


## Collapse Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 当前展开面板的 id | Number/Array | - | - |
| disabled | 是否禁用 | Boolean | - | false |
| accordion | 是否开启手风琴模式 | Boolean | - | false |

## CollapsePanel Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| disabled | 是否禁用当前panel | Boolean | - | false |
| hide-actions | 隐藏内容标题中的展开图标 | Boolean | - | false |

<script>
export default {
  data () {
    return {
      panel: [false, true, true]
    }
  }
}
</script>

<style lang="scss">
  .demo-collapse {
    width: 600px;
  }
</style>
