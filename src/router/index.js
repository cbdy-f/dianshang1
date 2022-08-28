//配置路由的地方
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter);
//先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.Replace

//重写push|replace
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.Replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}


//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    //滚动行为
    scrollBehavior(to, from, savedPosition) {
        //返回y代表的是滚动条在最上方
        return { x: 0, y: 0 }
    }
})
//全局首位,前置守卫
router.beforeEach(async (to, from, next) => {
    //to:获取到要跳转到的路由信息
    //from：获取到从哪个路由跳转过来来的信息
    //next: next() 放行  next(path) 放行  
    //方便测试 统一放行
    //  next();
    //获取仓库中的token-----可以确定用户是登录了
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    //用户登录了
    if (token) {
        //已经登录而且还想去登录------不行
        if (to.path == "/login" || to.path == '/register') {
            next('/');
        } else {
            //已经登陆了,访问的是非登录与注册
            //登录了且拥有用户信息放行
            if (name) {
                next();
            } else {
                //登陆了且没有用户信息
                //在路由跳转之前获取用户信息且放行
                try {
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    //token失效从新登录
                    await store.dispatch('userLogout');
                    next('/login')
                }
            }
        }
    } else {
        //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
        //未登录去上面这些路由-----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
            next('/login?redirect=' + toPath);
        } else {
            //去的不是上面这些路由（home|search|shopCart）---放行
            next();
        }

    }
});


export default router