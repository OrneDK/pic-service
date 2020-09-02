<template>
  <div class="nav-bar p30">
    <router-link to="/"><h1 id="logo" ></h1></router-link>
    <ul class="nav-bar-list">
      <li
        v-once
        v-for="(item,index) in navBarList"
        :key="'c_'+index"
        :class="active ===index?'active':''"
      >
        <router-link :to="item.router">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data () {
    return {
      active: 0,
      navBarList: [{ name: '图床', router: { name: 'Home' } }]
    }
  },

  computed: {},

  watch: {},

  created () {},

  mounted () {},

  destroyed () {},

  methods: {}
}
</script>
<style lang="less">
.nav-bar {
  width: 100%;
  height: 88px;
  background: #1890ff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  #logo {
    width: 140px;
    height: 66px;
    background: #ffffff;
  }
  .nav-bar-list {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    li {
      width: 120px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      line-height: 48px;
      color: #ffffff;
      box-sizing: border-box;
      padding: 0 20px;
      font-size: 26px;
      a {
        color: #ffffff;
        text-decoration: none;
      }
    }
    .active {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
    .active::after {
      display: inline-block;
      content: "";
      width: 80px;
      height: 6px;
      border-radius: 8px;
      background: #ffffff;
    }
  }
}
</style>
