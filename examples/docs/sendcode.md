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
<vine-sendcode class="demo-sendcode-btn" v-model="start2" :second="second2" :options="options2" @click="start2 = true"></vine-sendcode>
<script>
export default {
  data () {
    return {
      start2: false,
      second2: 10,
      options2: {
        initTxt: '点我啊，你点我啊',
        runTxt: '在{%s}秒后你就可以重新获取啦',
        resetTxt: '你可以重新获取验证码啦'
      }
    }
  }
}
</script>
```
:::

## 刷新页面倒计时继续

:::demo
```html
<vine-sendcode class="demo-sendcode-btn" v-model="start3" storage-key="vine_local_" :options="options3" @click="start3 = true"></vine-sendcode>
<script>
export default {
  data () {
    return {
      start3: false,
      options3: {
        runTxt: '刷新页面倒计时还会继续'
      }
    }
  }
}
</script>
```
:::

## Sendcode Props

| 参数 | 介绍 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 开始倒计时状态 | Boolean | - | false |
| second | 倒计时时长（秒） | Number/String | - | 60 |
| options | 自定义配置 | Object | - | options.initTxt: '发送验证码'<br>options.runTxt: '{%s}s'<br>options.resetTxt: '重新发送验证码' |
| storage-key | 储存倒计时剩余时间sessionStorage的键值，设置不为空后，刷新页面倒计时将继续 | String | - | - |

<script>
export default {
  data () {
    return {
      start: false,
      start2: false,
      start3: false,
      second2: 10,
      options2: {
        initTxt: '点我啊，你点我啊',
        runTxt: '在{%s}秒后你就可以重新获取啦',
        resetTxt: '你可以重新获取验证码啦'
      },
      options3: {
        initTxt: '刷新页面倒计时还会继续'
      }
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
