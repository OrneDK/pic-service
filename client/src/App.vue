<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import navBar from '@c/common/nav-bar'
export default {
  components: {
    navBar
  },
  data () {
    return {}
  }
}
</script>
<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  background: #f5f5f5;
}
.p30 {
  box-sizing: border-box;
  padding: 0 30px;
}
#app {
  width: 750px;
  height: 100%;
  margin: 0 auto;
  background: #ffffff;
}
</style>
