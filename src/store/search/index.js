import { reqGetSearchInfo } from "@/API";
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
};
const actions = {
    //获取search模块数据
    async getSearchList({ commit }, params = {}) {
        // 当前这个reqGetSearchInfo在向服务器拿数据的时候, 至少传递一个参数(空对象)
        //params形参是当用户派发action的时候,第二个参数传递过来的,至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data)
        }
    }
};
//项目中getters主要的作用是:简化仓库中的数据(简化数据而生)
const getters = {
    //当前形参state,当前仓库中的state,并非大仓库中的state
    goodsList(state) {
        //假如没有网state.searchList.goodsList返回的是undefine
        //至少给人家一个数组
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []

    },
    attrsList(state) {
        return state.searchList.attrsList || []

    }
};

export default {
    state,
    mutations,
    actions,
    getters
}
