<template>
  <div id="app">
    <demo-drawer>
      <hr class="demo-divider">
      <div class="demo-list">
        <div class="demo-list__group">
          <div class="demo-list__group__header">组件</div>
          <ul class="demo-list__group__items">
            <li v-for="(nav, index) in  navsData" :key="index">
              <router-link :to="nav.path">{{ nav.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </demo-drawer>
    <main class="demo-content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      navsData: [
        { path: '/collapse', title: 'Collapse 折叠面板' },
        { path: '/countdown', title: 'Countdown 时间倒计时' },
        { path: '/rollnotice', title: 'Rollnotice 滚动公告' },
        { path: '/sendcode', title: 'Sendcode 发送验证码' }
      ]
    }
  }
}
</script>

