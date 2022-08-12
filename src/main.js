// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue, { h } from 'vue'

import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' //语言切换
import '@/styles/index.scss' //引入全局样式

import App from './App'
import router from './router'
import store from './store'

import '@/icons'
import '@/permission'       //权限控制
import '../mock-simple'     //引入模拟数据源

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 * 生产环境目前使用MockJs进行模拟
 */
// if (process.env.NODE_ENV === 'production') {
//     const { mockXHR } = require('../mock')
//     mockXHR()
// }

Vue.use(ElementUI)
// 如果要设置英文版，按如下设置
// Vue.use(ElementUI,{locale})

Vue.config.productionTip = process.env.NODE_ENV === 'production'

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    // components: { App },
    // template: '<App/>'
    render: h => h(App)
})