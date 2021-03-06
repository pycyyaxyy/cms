import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { PERequestInterceptors, PERequestConfig } from './type'
import { ElLoading, ILoadingInstance } from 'element-plus'

const DEFAULT_LOADING = true

class PeRequest {
  instance: AxiosInstance
  interceptors?: PERequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: PERequestConfig) {
    this.instance = axios.create(config)
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    //从config中取出的拦截器是对应的实例中的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 添加所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的拦截器：请求拦截成功')

        //添加loading动画
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据...',
            background: 'rgba(0,0,0,0.5)'
          })
        }

        return config
      },
      (err) => {
        // console.log('所有实例都有的拦截器：请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //移除loading动画
        this.loading?.close()

        // console.log('所有实例都有的拦截器：响应拦截成功')
        return res.data
      },
      (err) => {
        // console.log('所有实例都有的拦截器：响应拦截失败')
        return err
      }
    )
  }

  request<T = any>(config: PERequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      //1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
        // console.log(config)
      }

      //2.判断是否需要显示loading
      if (config.showLoading === false) {
        //可能会影响下一个这个实例对应的请求 所以最后还要把showloading改为默认值true
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          //1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          //2. 改回来 以免影响下一个请求
          this.showLoading = DEFAULT_LOADING

          //3.将结果通过resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          console.log(err)
        })
    })
  }

  get<T = any>(config: PERequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'GET' })
  }

  post<T = any>(config: PERequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'POST' })
  }

  delete<T = any>(config: PERequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'DELETE' })
  }

  patch<T = any>(config: PERequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: 'PATCH' })
  }
}
export default PeRequest
