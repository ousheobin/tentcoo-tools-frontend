# Tentcoo Tools V2.3后台

> 工作室内部OA系统 Tentcoo Tools V2.3 的后台代码


## 使用的库
- [vue.js](https://cn.vuejs.org/) (使用Vue-Cli搭建的脚手架,Vue-Route搭建页面路由)
- [element-ui](http://element-cn.eleme.io/) (使用Element-UI网站快速成型)
- [echarts](http://echarts.baidu.com/) (使用Echarts做了曲线图)
- [jQuery](http://jquery.com/) (使用jQuery做ajax请求)
- [BlueBird](http://bluebirdjs.com/docs/getting-started.html) (使用Bluebird做的Promise)
- [Mock,js](https://github.com/nuysoft/Mock/wiki) (使用Mock.js生成测试数据)

## NPM指令
项目使用Webpack打包，初次clone到本地，需要使用
``` 
npm install
```
初始化项目，安装依赖

项目开发过程中，使用
``` 
npm run dev
```
进行实时编译和预览

开发完毕，运行
``` 
npm run build
```
把/dist/下面的文件发给后台的小伙伴，大功告成

## 关于接口测试
项目有使用Mock.js生成模拟数据

所有的请求都是封装在/src/api/Api.js中的
每个请求都使用了Promise，具体可以查阅相关资料了解一下
Mock的数据在/mock/MockData.js里面

使用实例如下：
```JavaScript
/* Api.js */
import MockData from '../../mock/MockData'

export default {
  getWelcomePageData: function () {
    return new Promise(function (resolve, reject) {
      $.ajax({
        'url': 'api/get_welcome_page',
        method: 'POST',
        success: function (data) {
          resolve()
        },
        error: function () {
          resolve({
            status:'ok',
            data: mockData.welcome
          });
        }
      })
    })
  }
}

/* Welcome.vue */ 
import Api from '@/api/Api'

...
var promise = api.getWelcomePageData();
promise.then( data => {
    // resolve() 后执行这里
},reject =>{
    // reject() 后执行这里
})

```


Author: Shaobin.Ou <shaobin.ou@tentcoostudio.com>
