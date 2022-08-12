/**
 * mock目录下的逻辑没有研究明白，所以学习了mockjs，自己先重新定义一个simple mock模块
 */

const Mock = require('mockjs')
const { param2Obj } = require('./utils')

const baseURL = process.env.VUE_APP_BASE_API

// 模拟table组件的数据
const data = Mock.mock({
    'items|30': [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        author: 'name',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
    }]
})

Mock.mock(baseURL + '/vue-admin-template/table/list', 'get', () => {
    const items = data.items
    return {
        code: 20000,
        data: {
            total: items.length,
            items: items
        }
    }
})

// 模拟用户交互数据
const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

Mock.mock(baseURL + '/vue-admin-template/user/login', 'post', function ({ body }) {
    const bodyObj = JSON.parse(body)
    const { username } = bodyObj
    console.log(username)
    const token = tokens[username]
    // mock error
    if (!token) {
        return {
            code: 60204,
            message: 'Account and password are incorrect.'
        }
    }
    return {
        code: 20000,
        data: token
    }
})

Mock.mock(new RegExp(baseURL + '/vue-admin-template/user/info\.*'), 'get', function ({ url, type, body }) {
    const { token } = param2Obj(url)
    const info = users[token]
    // mock error
    if (!info) {
        return {
            code: 50008,
            message: 'Login failed, unable to get user details.'
        }
    }

    return {
        code: 20000,
        data: info
    }
})

Mock.mock(baseURL + '/vue-admin-template/user/logout', 'post', () => {
    return {
        code: 20000,
        data: 'success'
    }
})