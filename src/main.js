import Vue from 'vue'
import App from './App.vue'
// 三级联动的组件--全局组件
import TypeNav from '@/components/TypeNav'
//引入路由
import router from '@/router'
//引入仓库
import store from '@/store'
//引入mock
import '@/mock/mockServe'
//引入swiper样式
import "swiper/css/swiper.css"
//引入轮播图全局组件
import Carsousel from '@/components/Carousel'
//引入分页器
import Pagination from '@/components/Pagination'
//引入饿了么ui
import { MessageBox } from 'element-ui'
//引入
import VueLazyload from 'vue-lazyload'
import gangzi from '@/assets/123.gif'
//引入校验插件
import '@/plugins/validate'
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

Vue.config.productionTip = false
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carsousel.name, Carsousel)
Vue.component(Pagination.name, Pagination)

Vue.use(VueLazyload, {
  loading: gangzi
})


//引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins, {
  name: 'upper'
});




import * as API from '@/API'
new Vue({
  render: h => h(App),
  //全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router,
  //注册仓库:组件实例的身上会多一个属性$store属性
  store
}).$mount('#app')
