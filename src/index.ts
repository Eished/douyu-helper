import app from '@/app';

if (PRODUCTION) {
  app();
} else {
  // 在生产环境打包时 webpack 会把 else 部分代码移除。使用动态导入就不会把这些代码打包进生产环境
  import('@/devTools').then(({ isTampermonkey, hotReload, autoInstall }) => {
    if (isTampermonkey()) {
      // 载入在线调试热刷新
      hotReload();
      // 运行用户代码
      app();
    } else {
      // 第一次启动时自动安装油猴脚本
      autoInstall();

      // 运行不需要油猴环境的js，用于模拟目标网页原本逻辑。不需要模拟可以删除
      import('@/mock/douyuPlayer').then(({ douyuPlayer }) => {
        douyuPlayer();
      });
    }
  });
}
