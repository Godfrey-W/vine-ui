# 滚动公告

`vine-rollnotice` 上下滚动公告组件。

## 示例

:::demo
```html
<div class="demo-rollnotice">
  <a href="javascript:;" class="demo-rollnotice-label">
    <img src="//m.360buyimg.com/mobilecms/jfs/t14752/82/2574581467/6535/c8158ace/5aa8935bN94e31ff6.jpg.dpg">
  </a>
  <vine-rollnotice class="demo-rollnotice-content" align="center">
    <vine-rollnotice-item v-for="(item, index) in rollnoticeItems" :key="index">
      <a href="javascript:;">
        <span class="red">{{ item.tag }}</span>
        {{ item.text }}
      </a>
    </vine-rollnotice-item>
  </vine-rollnotice>
</div>
<script>
export default {
  data () {
    return {
      rollnoticeItems: [
        {
          tag: 'HOT',
          text: '孩子一发烧，妈妈就把纸尿裤盖他头上，这家长太聪明了'
        }, {
          tag: '推荐',
          text: '华为P30抢先：今年DxOMark冠军预定，颜值超预期'
        }, {
          tag: '最新',
          text: '面膜多久敷一次较好，记住这个规律别搞错啦！'
        }, {
          tag: '热门',
          text: '小米5G：6.3英寸+滑盖式+4500毫安+骁龙X55'
        }
      ]
    }
  }
}
</script>
```
:::

## 向下滚动

:::demo
```html
<div class="demo-rollnotice">
  <a href="javascript:;" class="demo-rollnotice-label">
    <img src="//m.360buyimg.com/mobilecms/jfs/t14752/82/2574581467/6535/c8158ace/5aa8935bN94e31ff6.jpg.dpg">
  </a>
  <vine-rollnotice class="demo-rollnotice-content" align="center" direction="down">
    <vine-rollnotice-item v-for="(item, index) in rollnoticeItems" :key="index">
      <a href="javascript:;">
        <span class="red">{{ item.tag }}</span>
        {{ item.text }}
      </a>
    </vine-rollnotice-item>
  </vine-rollnotice>
</div>
```
:::

## Rollnotice Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| height | 高度 | String/Number | - | 30 |
| direction | 滚动方向 | String | up/down | up |
| align | 对齐方式 | String | left/center/right | left |
| speed | 切换速度（毫秒） | String/Number | - | 300 |
| autoplay | 自动播放时间（毫秒）| String/Number | - | 4000 |

<script>
export default {
  data () {
    return {
      rollnoticeItems: [
        {
          tag: 'HOT',
          text: '孩子一发烧，妈妈就把纸尿裤盖他头上，这家长太聪明了'
        }, {
          tag: '推荐',
          text: '华为P30抢先：今年DxOMark冠军预定，颜值超预期'
        }, {
          tag: '最新',
          text: '面膜多久敷一次较好，记住这个规律别搞错啦！'
        }, {
          tag: '热门',
          text: '小米5G：6.3英寸+滑盖式+4500毫安+骁龙X55'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
  .demo-rollnotice {
    width: 400px;
    display: flex;
    align-items: center;
    &-label {
      width: 72px;
    }
    &-content {
      a {
        width: 100%;
        padding: 0 10px;
        color: #333;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .red {
      color: red;
    }
  }
</style>
