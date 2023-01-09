const app = () => {
  let rid = new URLSearchParams(window.location.search).get('rid');
  if (!rid) {
    const results = window.location.pathname.match(/[\d]{1,10}/);
    if (results) {
      rid = results[0];
    } else {
      return;
    }
  }
  const videoSub = document.querySelector('.layout-Player-videoSub');

  if (rid && videoSub) {
    autoSelectClarity(rid, videoSub);
  }
};

const autoSelectClarity = (rid: string, videoSub: Element) => {
  const Clarities = ['全局默认最高画质', '全局默认最低画质'];
  const selectedClarity: string | null = GM_getValue(rid);
  const defaultClarity: number | null = GM_getValue('defaultClarity');

  const clickClarity = (li: HTMLLIElement, save = false) => {
    if (!li.className.includes('selected')) {
      save ? GM_setValue(rid, li.innerText) : null;
      li.click();
    }
  };

  const selectClarity = (list: NodeListOf<HTMLLIElement>) => {
    // 注册菜单栏
    Clarities.forEach((clarity, index) => {
      GM_registerMenuCommand(clarity, () => {
        if (index === 0) {
          clickClarity(list[0]);
          GM_setValue('defaultClarity', 1);
        } else {
          clickClarity(list[list.length - 1]);
          GM_setValue('defaultClarity', 0);
        }
        if (selectedClarity) {
          GM_setValue(rid, null);
        }
      });
    });

    let notFoundCount = 0;
    list.forEach((li) => {
      const availableClarity = li.innerText;
      if (selectedClarity === availableClarity) {
        // 选择自定义画质
        clickClarity(li);
      } else {
        notFoundCount++;
      }
      // 防止误触发保存，仅保存真实点击
      li.addEventListener('click', (e) => clickClarity(li, e.isTrusted));
      // 注册菜单栏
      GM_registerMenuCommand(availableClarity, () => clickClarity(li, true));
    });

    // 选择默认画质
    if (notFoundCount === list.length) {
      if (defaultClarity === 0) {
        clickClarity(list[list.length - 1]);
      } else {
        clickClarity(list[0]);
      }
    }
  };

  const callback = (mutations: MutationRecord[], observer: MutationObserver) => {
    const controller = videoSub?.querySelector(`[value="画质 "]`);
    if (controller) {
      observer.disconnect();
      const ul = controller.nextElementSibling;
      const list = ul?.querySelectorAll('li');
      list ? selectClarity(list) : console.debug('斗鱼直播助手：未找到画质选项');
    }
  };

  const observer = new MutationObserver(callback);

  observer.observe(videoSub, {
    childList: true,
    subtree: true,
  });
};
export default app;
