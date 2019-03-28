# 发送验证码

`vine-sendcode` 网页常见发送验证码倒计时组件。

## 示例

:::demo
```html
<vine-sendcode class="demo-sendcode-btn" v-model="start" @click="start = true"></vine-sendcode>
<script>
export default {
  data () {
    return {
      start: false
    }
  }
}
</script>
```
:::

## 自定义倒计时按钮

:::demo
```html
<vine-sendcode
  class="demo-sendcode-btn"
  v-model="start2"
  :second="10"
  init-text="点我啊，你点我啊"
  run-text="在{%s}秒后你就可以重新获取啦"
  reset-text="你可以重新获取验证码啦"
  @click="start2 = true"
></vine-sendcode>
<script>
export default {
  data () {
    return {
      start2: false
    }
  }
}
</script>
```
:::

## 刷新页面倒计时继续

:::demo
```html
<vine-sendcode
  class="demo-sendcode-btn"
  v-model="start3"
  storage-key="vine_local_"
  init-text="刷新页面倒计时还会继续"
  @click="start3 = true"
></vine-sendcode>
<script>
export default {
  data () {
    return {
      start3: false
    }
  }
}
</script>
```
:::

## Sendcode Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 开始倒计时状态 | Boolean | - | false |
| second | 倒计时时长（秒） | Number/String | - | 60 |
| disabled | 是否禁用 | Booleang | - | false |
| init-text | 初始化按钮显示文本 | String | - | 发送验证码 |
| run-text | 运行时显示文本 | String | - | {%s}s |
| reset-text | 运行结束后显示文本 | String | - | 重新发送验证码 |
| storage-key | 储存倒计时剩余时间sessionStorage的键值，设置不为空后，刷新页面倒计时将继续 | String | - | - |

<script>
export default {
  data () {
    return {
      start: false,
      start2: false,
      start3: false
    }
  }
}
</script>

<style lang="scss">
  .demo-sendcode-btn {
    display: inline-block;
    overflow: hidden;
    position: relative;
    transition-duration: .3s;
    transition-timing-function: cubic-bezier(.23,1,.32,1);
    text-decoration: none;
    text-align: center;
    border: none;
    text-transform: uppercase;
    padding: 0 16px;
    cursor: pointer;
    font-size: 14px;
    min-width: 88px;
    height: 36px;
    line-height: 36px;
    border-radius: 2px;
    background-color: #2196f3;
    color: #fff;
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
    &.vine-sendcode--disabled {
      cursor: not-allowed;
      color: rgba(0, 0, 0, 0.26);
      box-shadow: none;
      background-color: rgba(0, 0, 0, 0.12)
    }
  }
</style>
