# 时间倒计时

`vine-countdown` 网页常见剩余时间倒计时组件。

## 示例

:::demo
```html
<vine-countdown
  value="2020-01-01"
></vine-countdown>
```
:::

## 传入剩余时间（秒）

:::demo
```html
<vine-countdown
  :value="8 * 3600"
  type="rest"
></vine-countdown>
```
:::

## 传入结束时间戳（毫秒）

:::demo
```html
<vine-countdown
  :value="Date.now() + 5 * 24 * 3600 * 1000"
  type="timestamp"
></vine-countdown>
```
:::

## 自定义参数模板

:::demo
```html
<vine-countdown
  :value="new Date(Date.now() + 6 * 24 * 3600 * 1000)"
  format="{%s}秒{%m}分钟{%h}时{%d}日"
></vine-countdown>
```
:::

## 通过Slot作用域插槽自定义HTML模板（Vue 2.6.0以上）

:::demo
```html
<vine-countdown
  :value="new Date(Date.now() + 6 * 24 * 3600 * 1000)"
  v-slot="{ t }"
>
  <h1>{{ t.d }}</h1>天
  <h2>{{ t.h }}</h2>小时
  <h3>{{ t.m }}</h3>分钟
  <h4>{{ t.s }}</h4>秒
</vine-countdown>
```
:::

## Countdown Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 开始结束时间点，时间格式倒计时状态 | String/Number/Date | - | Date.now() |
| type | 传入时间类型，endtime：结束时间（时间格式），rest：剩余时间（秒），timestamp：结束时间戳（毫秒） | String | endtime/rest/timestamp | endtime |
| format | 模板参数 | String | - | {%d}天{%h}时{%m}分{%s}秒 |
| done-text | 倒计时结束后显示文字 | String | - | 已结束 |

## Countdown Events

| 事件名称 | 说明 |	回调参数 |
|------|------|------|
| on-end | 倒计时结束后触发 | - |


<script>
export default {
  data () {
    return {
    }
  }
}
</script>
