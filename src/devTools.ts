// 开发环境相关工具函数，请勿删除本文件

/**
 * 判断运行环境，阻止 webpack 重复注入 js 代码
 */
export const isTampermonkey = () => {
  let tampermonkey = true;
  try {
    GM_info;
  } catch (err) {
    tampermonkey = false;
  }
  return tampermonkey;
};

/**
 * 提供在线调试热刷新
 */
export const hotReload = () => {
  if (window.location.host.includes('localhost')) {
    const oldRefresh = GM_getValue('refresh');
    GM_setValue('refresh', !oldRefresh);
  } else {
    const callback = (name: string, oldValue: boolean, newValue: boolean, remote: boolean) => {
      if (remote) {
        window.location.reload();
      }
    };
    GM_addValueChangeListener('refresh', callback);
  }
};

/**
 * 首次运行时自动安装
 */
export const autoInstall = () => {
  const isNewInstall = localStorage.getItem('isNewInstall');
  if (!isNewInstall) {
    window.open(FILENAME, 'self');
    localStorage.setItem('isNewInstall', 'false');
  }
};
