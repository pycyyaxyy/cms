import { Module } from 'vuex'
import router from '@/router/index'
import { ILoginState } from './types'
import { IRootState } from '../types'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'

import LocalCache from '@/utils/cache'
import { IAccount } from '@/service/login/type'
import { mapMenusToRoutes, mapMenusToPermissions } from '@/utils/map-menus'

const LoginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permission: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus

      //userMenus=>routes
      const routes = mapMenusToRoutes(userMenus)
      // console.log(routes)

      //将routes=>router.main.children
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      //获取用户按钮的权限
      const permission = mapMenusToPermissions(userMenus)
      // console.log(permission)

      state.permission = permission
    }
  },
  getters: {},
  actions: {
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      //1.实现账户登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token) //将token保存在缓存中

      //发送初始化的网络请求（完整的role/department）
      dispatch('getIntialDataAction', null, { root: true })

      //2.请求用户信息

      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      //将userInfo也缓存起来 为了方便下次用户无需登陆直接进入首页
      LocalCache.setCache('userInfo', userInfo)

      //3.请求用户菜单
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      //4.跳到首页 (通过路由跳转即可)
      router.push('/main')
    },
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        //发送初始化的网络请求（完整的role/department）
        dispatch('getIntialDataAction', null, { root: true })
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default LoginModule
