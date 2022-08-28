import { reqDetailList, reqAddOrUpdateCart } from "@/API"
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodInfo: {},
    uuid_token: getUUID()
};
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo
    }
};
const actions = {
    //获取产品信息的action
    async getGoodInfo({ state, commit, dispatch }, skuId) {
        let result = await reqDetailList(skuId)
        if (result.code == 200) {
            commit('GETGOODINFO', result.data)
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateCart(skuId, skuNum)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
};
const getters = {
    //简化数据
    categoryView(state) {
        return state.goodInfo.categoryView || {}
    },
    //简化产品信息的数据
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    },
    //产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || []
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}