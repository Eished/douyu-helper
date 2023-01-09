以斗鱼直播自动切换清晰度作为示例的油猴脚本开发模板

[使用此模板发开油猴脚本的视频教程](https://www.bilibili.com/video/BV1oB4y1478c)

[使用此模板创建油猴脚本项目](https://github.com/Eished/monkey-template/generate)

## 本项目作为油猴开发模板的优点

- [x] 配置简单
- [x] 和前端开发框架一致的开发体验
- [x] 支持本地网页自动热刷新和目标网站自动热刷新
- [x] 支持本地模拟目标网站，网页加载速度快，大幅提高开发效率
- [x] 支持 Tampermonkey API 提示和自动补全

## 开发环境

`Node.js 14+`

`yarn or npm`

## 开发语言

`TypeScript` or `JavaScript`

## 修改配置文件

修改开发环境油猴头文件信息：`config/dev.meta.json` 内下述代码改为自己存放项目的文件路径。

```json
"require": ["file://<你的文件路径>/douyu-helper/dist/douyu.dev.user.js"]
```

> 油猴头文件默认配置在 `config/common.meta.json`，按需修改。

## 启动项目

`ctrl + shift + B` 选择 `start & dev`

第一次启动时，将会自动安装油猴脚本，但安装完要去编辑器内把头文件以外的内容删除，不然会运行两次脚本。（操作：选中并剪切头文件->然后全选->粘贴，覆盖掉其它内容）

或者手动安装：

`dist/douyu.dev.user.js` 复制油猴**头文件**，在浏览器油猴插件新建脚本，粘贴进去，刷新浏览器打开的本地页面，看到可选择的清晰度选项时油猴脚本即正常运行。

> `ctrl shift B` 选择 `start & dev` 实际运行了两个命令，单独运行也可以：
>
> - `yarn start` devServer 提供 web 服务和网页热刷新功能
>
> - `yarn dev` 生成脚本，让 tampermonkey 使用

## 本地调试和开发脚本

把目标网站的静态资源 `html、css、JavaScript` 等下载到本地，复制到 `public` 文件夹下，插入到 `index.html` 即可本地调试脚本静态功能。

如果不能下载，需要先分析其运行逻辑，在 `src/mock` 文件夹内添加模拟运行逻辑，以方便本地调试。（本模板采用的方法）

> 不需要模拟可以删除 mock 文件夹并在 `src/index.ts` 中移除引入。

在 `src/app.ts` 内开发自己的油猴脚本。

> 确保 `app.ts` 的默认导出函数是入口函数，否则可能影响 webpack 打包。

## 在目标网站上调试和开发脚本

和本地调试脚本相同。

注意：在线调试时不能关闭本地调试的网页窗口，目标网站自动热刷新依赖于本地网页运行的油猴脚本。

## 手动发布项目

运行 `yarn build`

生成文件文件：`douyu-helper/dist/douyu.user.js`

## 适应其它网站

修改油猴头文件 `config/common.meta.json` 的 `"match": "*://*.xxx.com/*",`

## 修改输出文件名

修改 `package.json` 里面 `filename=<新文件名>`

```javascript
 "scripts": {
    "start": "xxxxx --env filename=douyu.dev.user.js", // 开发环境脚本的文件名
    "dev": "xxxxx --env filename=douyu.dev.user.js", // 开发环境脚本的文件名
    "build": "xxxx --env filename=douyu.user.js", // 生产环境脚本的文件名
  },
```

## 引入 css

默认支持 css 和 less，参考 `mock/douyu.less`

## 使用网站已有的全局变量

`src/global.d.ts`

```typescript
declare global {
  //  在这里声明要用到的全局函数或变量
}
```

参考：https://github.com/Eished/douyu-helper/blob/main/src/global.d.ts#L23

## 在线网页热刷新的实现

受到 `scriptcat` 后台脚本与油猴脚本通信方式的启发，使用 `GM_addValueChangeListener` 来实现在线调试自动热刷新。

本地修改文件后会更新 `localhost` 网页，`localhost` 网页的油猴脚本会修改 `refresh` 的值，在线网页运行的油猴脚本会监听这个值的变化来刷新自己。

## HMR 热模块替换

由于油猴插入的 JavaScript 运行在油猴环境，不支持 HMR，仅支持 live reload 热重载，默认开启热重载。

在本地模拟环境中的 JavaScript 是 webpack 打包的，支持 HMR，需要大量本地模拟时可自行开启 HMR。

开启 HMR：`config/webpack.dev.js`

```javascript
baseOptions.devServer = {
  static: [
    {
      directory: path.join(__dirname, '../public'),
    },
    {
      directory: path.join(__dirname, '../dist'),
    },
  ],
  compress: true,
  port: 8080,
  hot: true,
  open: true,
  liveReload: false,
};
```

## 使用 JavaScript 开发

将文件后缀改为 `.js` 即可

`.eslintrc.js` 加入规则，用于忽略未定义的值报错以兼容油猴 API

```javascript
  rules: {
    ...
    'no-undef': 'off',
  },
```

如果想让 JavaScript 支持类型检查，在 `tsconfig.json` 修改 `"checkJs": true`

## 一些实用的库

跨域网络请求参考：`src/lib/ajax.ts`

消息通知参考：`src/lib/message.ts`

> 不需要则可以删除 lib 文件夹。

## 参考项目及其文档

https://github.com/the1812/Bilibili-Evolved

https://github.com/Eished/jkforum_helper

https://github.com/lisonge/vite-plugin-monkey
