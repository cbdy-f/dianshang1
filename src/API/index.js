//对API接口进行统一管理

import requests from "./request";
import mockRquests from './mockAjax'
//三级联动的接口
// /api/product/getBaseCategoryList  get 无参数

export const reqCategoryList = () =>
    //axios发请求返回的是promise对象
    requests({
        url: '/product/getBaseCategoryList',
        method: 'get'
    })

export const reqGetBannerList = () => mockRquests.get('/banner')

//获取floor数据
export const reqFloorList = () => mockRquests.get('/floor')

//获取搜索模块的数据 请求方式post 需要带参数
export const reqGetSearchInfo = (params) => requests({
    url: '/list',
    method: 'post',
    data: params,
})

//获取产品详情信息的结构
export const reqDetailList = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' });

//将产品添加到购物车中(获取更新一个参产品的个数)
export const reqAddOrUpdateCart = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' });

//获取购物车数据
export const reqCarList = () => requests({ url: '/cart/cartList', method: 'get' })

//删除购物车产品的接口
export const reqDeleteCartById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: "delete" })

//修改商品的选中状态
export const reqUpdateCheckedByid = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" })

//获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })

//注册
export const reqRegister = (data) => requests({ url: '/user/passport/register', method: 'post', data });

//登陆
export const reqUserlogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })

//获取用户信息
export const reqUserInfo = () => requests({ url: 'user/passport/auth/getUserInfo', method: 'get' })

//退出登录
export const reqLogout = () => requests({ url: '/user/passport/logout', method: 'get' })

//获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })

//获取商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })

//提交订单
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })

//获取支付信息
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })

//获取支付订单状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })

//获取个人中心的数据
export const reqMyOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' });
