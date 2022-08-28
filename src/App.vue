<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <!-- 在home search是显示的 在登陆注册隐藏 -->
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发一个action获取商品分类的三级列表的数据
    //通知vuex发请求 获取数据 存储于仓库中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
