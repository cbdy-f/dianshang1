import { reqCarList, reqDeleteCartById, reqUpdateCheckedByid } from "@/API";
const state = {
    cartList: []
};
const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList
    }
};
const actions = {
    //获取购物车数据
    async getCartList({ commit }) {
        let result = await reqCarList()
        if (result.code == 200) {
            commit("GETCARTLIST", result.data)
        }
    },
    //删除购物车某一产品
    async deleteCartListBySkuId({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //修改购物车某一产品选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedByid(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    //删除全部勾选的产品
    async deleteAllCheckedCart({ dispatch, getters }) {
        //context:小仓库 comit[提交mutations修改state]
        //获取购物车中全部的产品(是一个数组)
        let PromiseAll = []
        getters.cartList.cartInfoList.forEach(item => {
            let promise = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    //修改全部产品的状态
    updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = []
        state.cartList[0].cartInfoList.forEach(item => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise)
        })
        return Promise.all(promiseAll)
    }
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {}
    },

};
export default ({
    state,
    mutations,
    actions,
    getters
})