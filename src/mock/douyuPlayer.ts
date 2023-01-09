import './douyu.less';

// 简单模拟斗鱼播放器原本逻辑
export const douyuPlayer = () => {
  const videoSub = document.querySelector('.layout-Player-videoSub');
  if (!window.location.search) {
    window.location.search = '?rid=1';
  }
  if (!videoSub) {
    return;
  }

  // 模拟异步延迟
  setTimeout(() => {
    videoSub.innerHTML = `
      <div value="画质 ">画质</div>
      <ul>
        <li>原画1080P60</li>
        <li>蓝光</li>
        <li>超清</li>
        <li class="selected-123">高清</li>
      </ul>`;

    const list = document.querySelectorAll('li');
    list.forEach((li) => {
      li.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (e.target === li) {
          // 模拟异步延迟
          setTimeout(() => {
            list.forEach((other) => {
              other.className = '';
            });
            li.className = 'selected-123';
          }, 100);
        }
      });
    });
  }, 1000);
};
