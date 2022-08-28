import { reqGetCode, reqLogout, reqRegister, reqUserInfo, reqUserlogin } from "@/API"
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
    code: '',
    token: getToken(),
    userInfo: {}
}
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USSERLOGIN(state, token) {
        state.token = token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo
    },
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
}
const actions = {
    //获取验证码
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETCODE", result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //用户注册
    async registerUser({ commit }, user) {
        let result = await reqRegister(user)
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //登陆业务
    async userLogin({ commit }, data) {
        let result = await reqUserlogin(data)
        if (result.code == 200) {
            commit("USSERLOGIN", result.data.token)
            //持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    //获取用户信息
    async getUserInfo({ commit }) {
        let result = await reqUserInfo()
        if (result.code == 200) {
            commit("GETUSERINFO", result.data)
            return 'ok'
        }
    },
    //退出登录
    async userLogout({ commit }) {
        //向服务器发请求 通知服务器清除token
        let result = await reqLogout()
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}


export default ({
    state,
    mutations,
    actions,
    getters
})