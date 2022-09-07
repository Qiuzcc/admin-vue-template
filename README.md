# vue-admin-template项目

## 目录

- 简介
- 项目结构解析
- package.json解读
- 第三方模块简介
- 项目技术点
- FAQ

## 简介

第一遍学习vue-admin-template项目，在尝试复现的过程中对源码进行研究

## 项目结构解析

```
vue-admin                         
├─ .babelrc                       //babel-loader 配置
├─ .editorconfig                  //定义项目的编码规范，编辑器的行为会与.editorconfig 文件中定义的一致，并且其优先级比编辑器自身的设置要高
├─ .postcssrc.js                  //postcss 配置
├─ build                          
│  ├─ build.js                    //构建文件
│  ├─ check-versions.js           //检查NodeJS和npm的版本
│  ├─ logo.png                    
│  ├─ utils.js                    //build文件夹下的一些公用工具函数		
│  ├─ vue-loader.conf.js          //
│  ├─ webpack.base.conf.js        //构建的基础配置
│  ├─ webpack.dev.conf.js         //开发环境下的构建配置
│  └─ webpack.prod.conf.js        //生产环境下的构建配置
├─ config                         
│  ├─ dev.env.js                  //设置开发环境的环境变量
│  ├─ index.js                    //main project config
│  └─ prod.env.js                 //设置生产环境的环境变量
├─ index.html                     //html模板
├─ mock                           //使用mockjs搭建的服务器（开发环境）、修改的XHR实例（生产环境）
├─ mock-simple                    //自定义简单的mockjs函数（一开始没读懂/mock的代码，先用简单的用法模拟了数据）
├─ package-lock.json              //对应node_modules下的目录
├─ package.json                   
├─ README.md                      
├─ src                            
│  ├─ api                         //直接与后端交互的api函数
│  ├─ App.vue                     //入口页面
│  ├─ assets                      //静态资源
│  ├─ components                  //全局组件
│  ├─ icons                       //项目所有 svg icons，注册全局svg组件
│  ├─ layout                      //布局组件
│  ├─ main.js                     //入口文件 加载组件 初始化等
│  ├─ permission.js               //权限管理，前置导航守卫
│  ├─ router                      //全局路由
│  ├─ settings.js                 //项目功能自定义设置
│  ├─ store                       //全局 store管理
│  ├─ styles                      //全局样式
│  ├─ utils                       //全局公用方法
│  └─ views                       //views 所有路由页面，router-view
└─ static                         //
```

因为是接触的第一个比较完整的Vue项目，所以对于项目结构完全不了解，也不了解不同CLI生成的项目结构之间的差异。这个项目案例是应该是使用CLI 4.x版本创建的，而我仿写的时候应该使用CLI 3.x版本创建的，所以在项目结构上存在较大的差异。比如前者创建的项目没有了/build和/config两个文件夹，而是改用一个.vue.config.js文件来配置webpack；环境变量是通过.env.xxx来配置。而在后者的项目结构中并没有这些文件，而是在/build和/config两个文件夹里面设置。所以一开始遇到的问题和困难也比较多。为此也特地去花时间分别探究了不同版本CLI的项目结构。

## package.json解读

```json
{
    "name": "vue-admin",
    "version": "1.0.0",
    "description": "A Vue.js project",
    "author": "timegogo <1670906129@qq.com>",
    "private": true,
    "scripts": {},			//指定了运行脚本命令的npm命令行缩写,即npm run + 快捷名
    "dependencies": {},		//项目运行所依赖的模块
    "devDependencies": {},	//开发所依赖的模块
    "engines": { },			//指明了该项目所需要的node.js版本
    "browserslist": []		//用以兼容各种浏览器
}
```

## 第三方模块简介

| 模块           | 作用                                                         |
| -------------- | ------------------------------------------------------------ |
| mockjs         | 生成随机数据，拦截 Ajax 请求吗，解决前端开发过程中缺少后端数据的问题<br />自定义规则提供数据，对接后端接口时，不需要修改既定代码 |
| normalize.css  | 很小的CSS文件，在默认的HTML元素样式上提供了跨浏览器的高度一致性<br />是css reset的替代方案 |
| nprogress      | 一个轻量级的进度条组件                                       |
| chokidar       | 最小且高效的跨平台文件监视库                                 |
| chalk          | 一个可以修改终端输出字符样式的 `npm` 包                      |
| path           | 提供了一些用于处理文件路径的小工具，链接：[Node.js Path 模块  菜鸟教程 (runoob.com)](https://www.runoob.com/nodejs/nodejs-path-module.html) |
| bodyParser     | 处理用户post请求提交的数据，把数据保存在req.body中。以一个对象的形式提供给服务器，方便进行后续的处理 |
| path-to-regexp | 一个对URL进行解析的模块，支持正则表达式验证、匹配、反向解析  |

## 项目技术点

#### 1、页面权限

判断页面权限的工作方式，前置导航守卫，permission.js

添加导航守卫beforeEach()，点击每个导航之后，跳转路由之前，判断cookie中是否已经有token（登陆成功之后，将后端返回的token保存到cookie和store对象）

#### 2、mock用法

mock模拟api获取数据的工作流程

项目master分支的mock-server（开发模式）、mock/index.js（生产模式）进行了抽象封装，所以有些部分看了还是看不懂。最后还是直接学习了mock的用法，要用起来还是挺容易的，自己做个demo各个函数、参数试一试就可以了

后来看懂了，mock-server在webpack中创建了一个http服务器，在开发模式构建时，自动启动http服务器。优势在于可以产生真实的网络请求，能够被浏览器监控，便于调试。而mock修改XHR实例，会让一些底层依赖XMLHTTPRequest的模块出错，而且因为截获了网络请求，所以浏览器无法监听到。

#### 3、布局组件

本后台项目采取了spa模式，除了登陆、404页面，其它页面一级导航都使用同一个Layout组件，其中侧边导航栏和顶部导航栏是通用的（但是侧导实现比较复杂，顶部面包屑导航是通过`watch $route`动态生成的），AppMain组件通过设置`<router-view>`为子级路由（`children`）预留了插入位置

教程文档 [ 掘金 (juejin.cn)](https://juejin.cn/post/6844903486241374221) 里提到了【导航】这部分

#### 4、侧边栏导航

侧边栏，根据路由动态生成侧边栏。在侧边栏组件中获取全局路由对象 `$router.options.routes`（即在router/index.js中声明的路由数组，如果动态添加了路由，那么也包括动态路由）。递归处理嵌套的路由数组



## FAQ

项目过程中遇到的一些通用性的常见问题

#### 1、vue-cli版本

- vue-cli，3.0以下版本（不包含3.0）
- @vue/cli，3.0以上版本

Vue CLI 4.5以下版本对应Vue2.x 。Vue CLI 4.5及以上版本对应Vue3.x（创建项目的时候可以选择Vue2）



#### 2、Vue初始化项目的方式

参考文章：[脚手架vue-cli和@vue/cli的搭建及区别_广漂的明哥的博客-CSDN博客_vue脚手架和vue的区别](https://blog.csdn.net/qq_37635012/article/details/105522444)

1. vue-cli的方式（3.0以下版本）

   通过命令创建，需要先安装vue-cli

   新建命令：`vue init webpack 项目名称`。

   安装依赖：`npm install`

   运行项目：`npm run dev`（2.0版本）或 `npm run serve`（4.0版本），实际上这个可以在package.json里面的scripts设置

   项目结构解读：

   ```
   |—— build：构建脚本目录
   	|—— build.js ==> 生产环境构建脚本
   	|—— check-versions.js ==> 检查npm，node.js版本
   	|—— utils.js ==> 构建相关工具方法
   	|—— vue-loader.conf.js ==> 配置了css加载器以及编译css之后自动添加前缀
   	|—— webpack.base.conf.js ==> webpack基本配置
   	|—— webpack.dev.conf.js ==> webpack开发环境配置
   	|—— webpack.prod.conf.js ==> webpack生产环境配置
   |—— config：项目配置
   	|—— dev.env.js ==> 开发环境变量
   	|—— index.js ==> 项目配置文件
   	|—— prod.env.js ==> 生产环境变量
   |—— node_modules：npm 加载的项目依赖模块
   |—— src：这里是我们要开发的目录，基本上要做的事情都在这个目录里
   |—— static：静态资源目录，如图片、字体等。不会被webpack构建
   |—— babelrc：babel编译参数
   |—— editorconfig：代码格式
   |—— postcssrc.js：转换css的工具
   |—— index.html：首页入口文件，可以添加一些 meta 信息等、
   |—— package.json：npm包配置文件，定义了项目的npm脚本，依赖包等信息
   ```

   针对build目录下几个文件再具体解读，参考文章：[vue-cli基本使用（详细代码）](https://blog.csdn.net/longlong6682/article/details/105605578)

   | 文件                 | 作用                                                         |
   | -------------------- | ------------------------------------------------------------ |
   | webpack.base.conf.js | 1 配置webpack编译入口<br />2 配置webpack输出路径和命名规则<br />3 配置模块resolve规则<br />4 配置不同类型模块的处理规则 |
   | webpack.dev.conf.js  | 1 将hot-reload相关的代码添加到entry chunks<br />2 合并基础的webpack配置<br />3 使用styleLoaders<br />4 配置Source Maps<br />5 配置webpack插件 |
   | utils.js             | 1 配置静态资源路径<br />2 生成cssLoaders用于加载.vue文件中的样式<br />3 生成styleLoaders用于加载不在.vue文件中的单独存在的样式文件 |
   | vue-loader.conf.js   | 配置了css加载器以及编译css之后自动添加前缀                   |
   | build.js             | 1 loading动画<br />2 删除创建目标文件夹<br />3 webpack编译<br />4 输出信息 |
   | webpack.prod.conf.js | 合并基础的webpack配置<br />2 使用styleLoaders<br />3 配置webpack的输出<br />4 配置webpack插件<br />5 gzip模式下的webpack插件配置<br />6 webpack-bundle分析 |
   | check-versions.js    | 检查npm，node.js版本                                         |

   config目录下文件解读，参考文章：[vue-cli基本使用（详细代码）](https://blog.csdn.net/longlong6682/article/details/105605578)

   | 文件        | 作用                                                         |
   | ----------- | ------------------------------------------------------------ |
   | index.js    | 最主要的文件，描述了开发和构建两种环境下的配置<br />build目录下有不少文件引用了它 |
   | dev.env.js  |                                                              |
   | prod.env.js |                                                              |

   

2. @vue/cli的方式（3.0以上版本）

   通过命令初始化，命令为：`vue create 项目名称`

   或者使用图形化界面创建项目，命令：`vue ui`（会打开一个浏览器窗口，引导项目创建流程）

   启动项目：`npm run serve`

   

3. @vue/cli 和 vue-cli 的区别

   创建项目命令不同，启动项目命令不同，前者移除了配置文件目录config和build文件夹（如果需要自定义配置，需要自己新建vue.config.js文件），移除了static静态资源文件，新增public文件夹（静态资源和index.html放到此目录下），在src文件夹下新增views文件夹（用于分类 视图组件 和 公共组件），安装项目时会自动下载node-model文件夹

#### 3、vue-cli 2.x 项目设置环境变量

官方文档：[Environment Variables · GitBook (vuejs-templates.github.io)](http://vuejs-templates.github.io/webpack/env.html)

参考文章：[vuecli2.x版本构建的项目如何配置环境变量](https://blog.csdn.net/web_zs/article/details/121376719)

**在/config/dev.env.js 或 prod.env.js文件中设置环境变量**。下面解析为什么在这里设置：

1. 我们运行项目时，输入`npm run dev`或者是`npm start`，对应的shell脚本命令定义在package.json文件的scripts里

   ![image-20220809233401382](https://qiuzcc-typora-images.oss-cn-shenzhen.aliyuncs.com/images/2022/202208122349909.png)

   可以看到该命令使用了build/webpack.dev.conf.js文件。

2. 再来看build/webpack.dev.conf.js文件，里面有这样一段：

   ![image-20220809235441897](https://qiuzcc-typora-images.oss-cn-shenzhen.aliyuncs.com/images/2022/202208122349333.png)

   科普：[DefinePlugin](https://webpack.docschina.org/plugins/define-plugin/)，允许在 **编译时** 将你代码中的变量替换为其他值或表达式

3. 至此，可以明白，因为在构建文件中设置了process.env这个环境变量（对象），所以可以在组件或者js文件中直接访问它。而我们也可以将需要设置的环境变量定义到config目录下的`[mode].env.js`文件中。

4. 生产环境的环境变量同理，环境变量具体的导入路径流可以参考[文章](https://blog.csdn.net/web_zs/article/details/121376719)

**以`key:value`键值对的方式定义环境变量**（这一点与@vue/cli并不相同，后者以`key=value`的形式定义）。完成定义之后即可在组件或js文件中通过`process.env.`的方式访问。还有一点需要注意：**如果值为String类型，需要使用**`'""'`**双重引号的方式包裹**（我也不知道为什么）



#### 4、sidebar组件如何工作

观察路由文件发现，出来login和404页，所有的一级页面使用了同一个组件——Layout。看到Layout目录下的index.vue文件，内部结构为：[ sidebar , [ navbar , app-main ] ]。其中navbar包括：侧边栏切换按钮、面包屑导航、右侧隐藏式下拉菜单。app-main里设置了一个router-view，预置了子路由插入组件的位置。侧边栏组件又是如何获取到各级导航信息的？数据源在哪？又是以怎样的链路传递过去的？

问题的解答就藏在layout/components/Sidebar/index.vue这个文件中，里面computed属性中定义了一个routes()，获取了当前路由的信息:`this.$router.options.routes`，至于是个什么数据，需要查看Vue Router文档。官方的解释是：**Router.options：创建 Router 时传递的原始配置对象。只读的。**

`this.$router.options`里面包含了哪些属性？？



#### 5、vuex的mapGetters是干什么的

<blockquote>`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性		——Vuex官方文档<br><br>通过引入mapGetters 我们就可以轻松的取到vuex中存储的数据，从代码中可以看出，getters就类似于vue组件中的computed（计算属性），在组件中引入mapGetters就是将vuex中的数据映射到组件的计算属性当中，在组件不多，组件的数据通信不是很多的时候这样写看似将简单的东西复杂化了，但是在稍复杂点的项目中这样会极大的减少工作量，及组件之间数据传递的复杂程度。</blockquote>

这样有一个好处，可以省去重新定义一个computed变量名的步骤，直接使用store对象getters中定义的变量名。如下：

我们在store/getters.js文件中定义：

```javascript
const getters = {
    sidebar: state => state.app.sidebar,
    ......
}
export default getters
```

现在需要在某个组件文件中使用sidebar这个变量数据，按照以往的方式我们需要在computed中定义一个新的变量函数，然后通过store.getters返回sidebar

```vue
<script>
export default{
    computed:{
        newSidebar(){
            return this.$store.getters.sidebar
        }
    }
    ......//然后在其它地方访问this.newSidebar（newSidebar）这个变量
}
</script>
```

但是现在通过引入mapGetters这个辅助函数，我们可以在当前文件中直接导入sidebar这个store/getters.js里面的变量

```vue
<script>
import {mapGetters} from 'vuex'
export default{
    computed:{
        ...mapGetters(['sidebar'])
    }
    ......//然后在其它地方访问this.sidebar（sidebar）这个变量
}
</script>
```



#### 6、$router 和 $route 的区别

在 Vue 实例中，你可以通过 `$router` 访问路由实例（全局对象），通过`$route`访问当前路由。可以参考文章：[Vue 中query和params的区别 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/349408545)



#### 7、$ 符号的含义

以`$`为前缀的表示实例变量/方法，目的是为了与用户自定义的变量/方法区分开来



#### 8、$route的params属性和query属性有何区别

- Q：什么是URL参数？

  A：就是url 中`?`后面、`#`前面的部分。例如url：`http://localhost/1.html?id=1&page=2#section=3`，它的参数部分是：`?id=1&page=2`

- Q：params和query的区别

  A：它们都是router全局对象的参数，push时，如果用params传参，只能和name搭配使用，类似于post请求，url栏看不到传递的参数。

  如果用query传参，不存在只能搭配name的限制，类似于get请求，url栏可以看到参数

| 属性   | 说明       | 示例                       |
| ------ | ---------- | -------------------------- |
| path   |            |                            |
| name   | 路由的命名 | name: 'user'               |
| params | 参数       | params:{ username: 'Liu' } |
| query  | 查询参数   | query:{ plan: 'private' }  |
| hash   | 锚点       | hash: '#team'              |

```
// 字符串路径
router.push('/users/eduardo')

// 带有路径的对象
router.push({ path: '/users/eduardo' })

// 命名的路由，并加上参数，让路由建立 url
router.push({ name: 'user', params: { username: 'eduardo' } })

// 带查询参数，结果是 /register?plan=private
router.push({ path: '/register', query: { plan: 'private' } })

// 带 hash，结果是 /about#team
router.push({ path: '/about', hash: '#team' })
```

**注意**：如果提供了 `path`，`params` 会被忽略，上述例子中的 `query` 并不属于这种情况



#### 9、Mock如何获取url的参数或post的数据

Mock.mock语法：`Mock.mock( rurl?, rtype?, template|function( options ) )`

- function( options )，表示用于生成响应数据的函数，当拦截到请求时，函数被执行，并把执行结果作为响应数据返回
- options，指向本次请求的 Ajax 选项集，含有 `url`、`type` 和 `body` 三个属性，参见 [XMLHttpRequest 规范](https://xhr.spec.whatwg.org/)。

**获取get请求的url参数**，需要自己从url中截取

```javascript
axios({
    url: '/vue-admin-template/user/info',
        method: 'get',
        params: { token:'admin' }
})
```

```javascript
Mock.mock(new RegExp('/vue-admin-template/user/info\.*'),'get',function(options){
    console.log(options)
    return {
        msg:'获取数据成功'
    }
})
//输出结果如下：
{url: '/vue-admin-template/user/info?token=admin', type: 'GET', body: null}
```

**获取post请求携带的数据**，从body参数对象直接获取

```javascript
axios({
     url: '/vue-admin-template/user/login',
     method: 'post',
     data:{
         username:'Q',
         password:'123456'
     }
})
```

```javascript
Mock.mock('/vue-admin-template/user/login','post',function(options){
    console.log(options)
    return{
         msg:'提交数据成功'
    }
})
// 输出结果如下：
{url: '/vue-admin-template/user/login', type: 'POST', body: '{"username":"Q","password":"123456"}'}
```



#### 10、项目文件夹（/src下） 划分的规范 ？

- 路由页面（router-view）—— views / pages
- 零散的全局组件 —— components
- 全局通用的布局组件 —— layout
- api交互函数 —— api
- 全局公用的工具函数 —— utils
- 全局样式 —— styles

#### 11、文件命名格式规范 ？

- 所有文件夹 —— 小写 或者 横线连接（kebab-case）

- 单文件组件名 —— 大写开头（PascalCase）或者 横线连接 ，二选一，但是始终只用一种格式，（index.vue除外，纯小写）

- 应用特定样式的基础组件（如按钮） —— 全部统一以一个特定的前缀开头，如Base、App、V

  ```
  components/
  |- BaseButton.vue
  |- BaseTable.vue
  |- BaseIcon.vue
  ```

- 紧密耦合度组件名（只在父组件的场景下使用）—— 以父组件名作为前缀

  ```
  components/
  |- TodoList.vue
  |- TodoListItem.vue
  |- TodoListItemButton.vue
  ```

  像本项目中，把所有紧密耦合的子组件放在同一个目录下，也是一种方式

- 组件名中的单词顺序 —— 一般化描述单词开头，描述性修饰词结尾

  ```
  components/
  |- SearchButtonClear.vue
  |- SearchButtonRun.vue
  |- SearchInputQuery.vue
  ```

- template模板中的组件名 —— 用PascalCase，尽管同时也支持kebab-case，以及最后在DOM中会被转换成kebab-case

  ```
  <MyComponent/>
  ```

- .js文件中的组件名（即全局注册组件）—— 用PascalCase

- prop参数名 —— 声明时，用驼峰式（camelCase）；在template中，用kebab-case

  ```javascript
  props: {
    greetingText: String
  }
  ```

  ```html
  <WelcomeMessage greeting-text="hi"/>
  ```

  **问题：在子组件（即跟props同个文件中）的template中应该怎么用它？**

#### 12、.vue文件中template标签的规范

没有内容的空元素，使用自闭合标签（但是不要在html中这么写）

```
<MyComponent/>
```

#### 13、参照项目修改完main.js之后，无法build项目，报错如下

```
This relative module was not found:

* ./styles/index.scss in ./src/main.js
```

原因：缺少解析scss的模块

解决：安装对应的包，sass-loader和node-sass，其中sass非必需

#### 14、启动项目时，怎么区分开发、生产、测试环境？

通过脚本命令区分，可以在脚本命令后面加`--mode dev`之类的后缀，也可以直接在package.json文件里的scripts里面定义启动不同模式的简写命令

#### 15、代码中`process.env.VUE_APP_BASE_API`这种`process.env.`加后缀的变量在哪里设置？是怎么读取到变量的？

<blockquote>process对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制<br>process.env 属性会返回包含用户环境的对象</blockquote>

参考文章：[process.env环境变量 - 掘金 (juejin.cn)](https://juejin.cn/post/6972466143445385223)

设置在/config/xx.env.js 中设置，CLI 4.x版本的项目在项目根目录下的.env.xx.js文件中设置（如果不存在，新建即可）

参考文章：[模式和环境变量 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/guide/mode-and-env.html#环境变量)

#### 16、Mock的用法

Mock文档：[Mock Data | vue-element-admin (panjiachen.github.io)](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/mock-api.html

