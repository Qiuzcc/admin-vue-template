## VueAdmin项目解读

```
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── plop-templates             # 基本模板
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── directive              # 全局指令
│   ├── filters                # 全局 filter
│   ├── icons                  # 项目所有 svg icons
│   ├── lang                   # 国际化 language
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
```

项目完成度

| 文件（目录）   | 主要用途                                                     | 完成度 |
| -------------- | ------------------------------------------------------------ | ------ |
| **api**        | user.js，调用src/utils/request文件中的request对象，发送登陆、登出、获取用户信息请求<br />table.js，调用request对象（同上），发送获取table列表数据的请求 |        |
| **components** | 3个全局公用组件：面包屑导航、汉堡包按钮、图标组件            | ✓      |
| **icons**      | /svg，11个svg图标文件<br />index.js，注册全局图标组件，引入以上11个svg文件<br />svg.yml，用途未知 | ✓      |
| **layout**     | /components，创建布局3组件：Sidebar、Navbar、AppMain<br />/mixin，ResizeHandler，窗口大小变化处理器？<br />index.vue，集成3个组件，形成页面完整布局？ | ✓      |
| **router**     | 全局路由                                                     | ✓      |
| **store**      | /modules，3个js文件：app、user、settings，分成3个独立模块，<br />对应3个独立的store对象，分别管理页面参数、用户状态、个性化参数<br />getters.js，sidebar、device、token、avatar、name的数据获取接口<br />index.js，集成以上2部分，导出一个store对象 | ✓      |
| **styles**     | 定义全局样式                                                 | ✓      |
| **utils**      | 定义全局工具函数<br />auth.js，通过cookie保存token<br />get-page-title.js，获取页面标题<br />request.js，定义axios实例拦截器<br />validate.js，验证用户名、地址是否为外链<br />index.js，2个时间格式化函数、1个url参数转对象函数 | ✓      |
| **views**      | 导航菜单对应的内容，即AppMain布局部分里面的内容              | ✓      |
| App.vue        | 入口页面                                                     | ✓      |
| main.js        | 入口文件，加载组件、初始化                                   | ✓      |
| permission.js  | 页面导航的权限管理，加载了1个进度条组件                      | ✓      |
| setting.js     | 参数设置，fixedHeader、sidebarLogo和title                    | ✓      |

初始化项目的命令：`vue init webpack 项目名`

### 一、package.json

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
    "config":{},			//用于向环境变量输出值。
    "engines": { },			//指明了该项目所需要的node.js版本
    "browserslist": []		//用以兼容各种浏览器
}
```



### 二、模块简介

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



### 三、webpack配置

|           | 作用            | 配置位置                      |
| --------- | --------------- | ----------------------------- |
| `@`定位符 | 替代`src`路径名 | `/build/webpack.base.conf.js` |
|           |                 |                               |
|           |                 |                               |



### 四、问题合集

1. 参照项目修改完main.js之后，无法build项目，报错如下

   ```
   This relative module was not found:
   
   * ./styles/index.scss in ./src/main.js
   ```

   原因：缺少解析scss的模块

   解决：安装对应的包，sass-loader和node-sass，其中sass非必需

2. 启动项目时，怎么区分开发、生产、测试环境？

   通过脚本命令区分，可以在脚本命令后面加`--mode dev`之类的后缀，也可以直接在package.json文件里的scripts里面定义启动不同模式的简写命令



### 五、项目构建流程（一）

#### 1、编辑packge.json

#### 2、编辑main.js

#### 3、编辑src/icon

1. /svg目录下包含了11个svg文件【✓】

2. svgo.yml【✓】

3. index.js【✓】

   从component引入了一个SvgIcon组件，先创建这个文件，稍后再进行实现

#### 4、实现components/SvgIcon

1. index.js【✓】

   引入了utils下个一个validate文件，先创建这个文件，稍后再实现

#### 5、实现utils/validate.js

导出了两个函数，分别是验证 邮箱/电话地址、用户名有效性的

#### 6、实现utils下的全局工具

1. validate.js【✓】，在上一步已实现
2. index.js【✓】，注册了3个函数，功能分别是：把时间对象/字符串/数字、转成字符串形式；传入时间戳然后返回格式化的字符串；提取URL参数部分，转换成对象然后返回
3. auth.js【✓】，引入了js-cookie模块（已经安装），导出三个函数，分别是getToken、setToken、removeToken
4. get-page-title.js【✓】，导入了src/settings文件，先创建该文件，稍后实现。导出一个函数getPageTitle（如果传入参数，返回参数+settings中的title；如果没有传入参数，返回settings中的title）
5. request.js【✓】，创建axios实例时用到了一个环境变量`process.env.VUE_APP_BASE_API`，需要看查看是在哪里设置的。**导出一个axios实例，但是目前这个实例不可用（因为缺少后端api服务）**

<blockquote>process对象是一个全局变量，提供了有关当前 Node.js 进程的信息并对其进行控制<br>process.env 属性会返回包含用户环境的对象</blockquote>

参考文章：[process.env环境变量 - 掘金 (juejin.cn)](https://juejin.cn/post/6972466143445385223)（并没有直接找到设置的地方）

查看项目代码，在根目录下发现了名为`.env.development`的文件，就在这里面设置（但实际上这个设置并没有发挥实际作用，因为本地并没有设置对应的api服务器）

#### 7、实现/stc/settings.js

除了设置默认title，还有两个开关：是否fix the header；是否展示侧边栏logo

#### 8、实现src/permission.js

导入了一个nprogress模块（进度条组件）。添加前置导航守卫，在任何导航前执行，第一，绑定进度条事件、设置页面标题。第二，判断用户对于当前的导航是否有足够权限；如果有，跳过登陆页面并判断用户信息是否加载，没有加载则加载；如果没有权限，重定向到登陆页面

#### 9、App.vue

删除多余的内容，并无新添内容

#### 10、实现mock部分

1. index.js【✓】，从`./`同级目录引入utils、user、table，先创建，稍后实现。里面的逻辑有点看不太懂，还好有完善的文档：[Mock Data | vue-element-admin (panjiachen.github.io)](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/mock-api.html)
2. utils.js【✓】，传入url字符串，返回url参数对象，和`src/utils/index.js`中的param2Obj一致
3. user.js【✓】，导出3个模拟api，分别对应登陆、获取用户信息、登出
4. table.js【✓】，使用mock生成了30份随机数据，导出模拟api`BASE_API/vue-admin-template/table/list`，get请求返回模拟数据
5. mock-server.js【】，导入了5个模块，分别是：chokidar、bodyParser、chalk、path、mockjs，因为目前只是在开发环境下使用到该文件，所以其中一些模块安装到开发依赖项中即可。额外安装了chokidar、bodyParser、path三个包。**具体函数逻辑并木有看懂**

在官方文档[Mock Data | vue-element-admin (panjiachen.github.io)](https://panjiachen.github.io/vue-element-admin-site/zh/guide/essentials/mock-api.html#移除)中提到：`mock-server`只会在开发环境中使用，线上生产环境目前使用`MockJs`进行模拟。如果不需要请移除。所以**实际上在开发环境下使用的只有mock-server.js这个文件**



### 六、项目构建流程（二）

在编辑mock部分的时候，一些配置如`vue.config.js`、`.env.development`等，感觉与使用`vue init webpack`创建的项目结构格格不入，担心会因此造成许多麻烦的bug，所以决定放弃使用mock部分，后续由自己来实现api，或者使用Express、或者学习使用mock

#### 1、实现router/index.js【✓】

引入了src/layout，先实现它。（然后就，做到了第4步）

引入了/views目录下的组件，先创建这些文件，稍后再实现

#### 2、实现src/loyout

1. /component目录【✓】，从`@/components`目录下导入了Breadcrumb、Hamburger，先创建它们，稍后实现。在该目录下实现侧边导航栏(Sidebar)、面包屑导航(Navbar)、页面主体(AppMain)三个组件
2. /mixin目录【✓】，创建了一个resizeHandler.js文件，看起来是处理设备切换时的菜单结构变化的
3. index.vue【✓】，导入component目录下的3个组件，导入mixin目录下的js文件，创建后台布局框架

#### 3、实现src/components

实现src/components目录下的Breadcrumb和Hamburger

1. /Breadcrumb【✓】，创建index.vue，面包屑导航
2. /Hamburger【✓】，切换侧边导航栏展开/隐藏的按钮，因其形状为三条横线，类似汉堡包而得名

#### 4、实现store

1. index.js【✓】，导入getters、和/module目录下的模块，这里没有使用严格模式，没有使用mutation，导出的store对象里面使用了modules属性
2. getters.js【✓】，定义了获取sidebar、device、token、avatar、name的函数（都是通过属性方式获取）
3. /modules【✓】，app.js，切换侧边导航栏状态，切换设备类型。setings.js，修改fixedHeader、是否展示logo。user.js，引入了/api/user（先创建后实现），处理用户登陆、登出的逻辑、登陆后自动获取用户信息的逻辑。**这里采用了“不同功能模块、不同store对象”的方式，目的应该是为了降低项目耦合度**

#### 5、实现src/views

#### 6、实现src/api

### 七、项目构建流程（三）

至此，项目主体构建完毕，现存的问题是mock模块无法使用（没有顺利实现、涉及到项目配置的问题），所以问题集中在请求api这里。

查看api目录下的2个文件，它们的请求都是通过utils/request.js发出去的，真正访问api的是request.js文件，它里面使用到了`process.env.VUE_APP_BASE_API`这个环境变量，为了搞清楚vue-cli 2.x的环境变量是在哪里定义的，花了半天的时间研究了vue-cli 2.x构建的项目结构，着重研究了build和config目录下的各个文件用途。

vue-cli 2.x的环境变量应该定义在config目录下的dev.env.js文件里，定义方式与@vue/cli 的语法规则还不一样，需要使用`key:value`的形式，同时字符串需要使用双重引号`'""'`。至于VUE_APP_这个前缀应该是@vue/cli 里面的规则，目的是让环境变量能够让webpack的definePlugin编译进浏览器中也能访问使用，详见：[模式和环境变量 | Vue CLI (vuejs.org)](https://cli.vuejs.org/zh/guide/mode-and-env.html#环境变量)

下面总结出目前用到的api

生产环境下：BASE_API 为：/prod-api      开发环境下：BASE_API 为：/dev-api

| api                                     | 发送方           | 用途          |
| --------------------------------------- | ---------------- | ------------- |
| BASE_API//vue-admin-template/table/list | getList(params)  | 获取table数据 |
| BASE_API/vue-admin-template/user/login  | login(*data*)    | 提交登陆信息  |
| BASE_API/vue-admin-template/user/info   | getInfo(*token*) | 获取用户信息  |
| BASE_API/vue-admin-template/user/logout | logout()         | 提交登出请求  |

目前遇到一个新的问题：项目里面是怎么用到mock这个模块的？在main.js里面有一段：

<img src="https://qiuzcc-typora-images.oss-cn-shenzhen.aliyuncs.com/images/2022/202208122349647.png" alt="image-20220810150314955" style="zoom:50%;" />

那么是否可以理解为只有在生产环境下才使用了mock模块，而在开发环境下啥也没有？

经过后来查看文档得知，在开发模式运行项目时，会同时启动mock-server.js服务，作为一个服务器来提供模拟数据（支持热重载）

### 八、FAQ

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



### 九、项目技术点

#### 1、页面权限

判断页面权限的工作方式，导航守卫。

添加导航守卫beforeEach()，点击每个导航之后，跳转路由之前，判断cookie中是否已经有token（登陆成功之后，将后端返回的token保存到cookie和store对象）



#### 2、mock用法

mock模拟api获取数据的工作流程

项目master分支的mock-server（开发模式）、mock/index.js（生产模式）进行了抽象封装，所以有些部分看了还是看不懂。最后还是直接学习了mock的用法，要用起来还是挺容易的，自己做个demo各个函数、参数试一试就可以了



#### 3、布局组件

本后台项目采取了spa模式，除了登陆、404页面，其它页面一级导航都使用同一个Layout组件，其中侧边导航栏和顶部导航栏是通用的（但是侧导实现比较复杂，顶部面包屑导航是通过`watch $route`动态生成的），AppMain组件通过设置`<router-view>`为子级路由（`children`）预留了插入位置（但是嵌套是怎么实现的呢？这个还没搞懂）

教程文档 [ 掘金 (juejin.cn)](https://juejin.cn/post/6844903486241374221) 里提到了【导航】这部分



#### 4、重构组件

侧边栏，根据路由动态生成侧边栏



#### 5、动态添加路由

（vue-admin-template项目中没有涉及）
