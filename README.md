- [目录结构](#folder-structure)

cherymobile/
  README.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    app.android.js           --- android程序入口
    app.ios.js               --- ios程序入口
    screen.js                --- 注册所有的screen页面
    StartScreen.js           --- 模式选择页面，可选择Demo示例系统或者真正开发系统
    lib/                     --- 公用js方法
    demo/                    --- Demo示例系统
    application/             --- 开发系统
    reducers/                --- 应用状态管理机，Store, Action, Dispatch

 
