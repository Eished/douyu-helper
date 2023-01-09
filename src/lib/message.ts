export const enum IMPORTANCE {
  LOG_POP = 1,
  LOG_POP_GM = 2,
  POP = 3,
}

// 需要手动增加 GM_addStyle 和 GM_notification 权限
/**
 * 消息通知类：不依赖框架
 * @param text string | undefined
 * @param setTime number | string = 5000,
 * @param importance number = 1
 * @example
 * 0.先在入口文件中调用静态方法 MessageBox.generate() 方法初始化消息弹出窗口；
 * 1. new MessageBox('hello')
 * 2.空初始化时调用 show() 显示消息；
 * 3.setTime：ms，非数字时为永久消息，需手动调用 refresh() 刷新消息，remove() 移除消息；
 * 4.importance：1： log + 自定义弹窗；2： log + 自定义弹窗 + GM系统提示；其它值：自定义弹窗；
 */

class MessageBox {
  _msg: undefined | null | HTMLDivElement;
  _text: string | undefined;
  _setTime: number | string;
  _importance: IMPORTANCE;
  _timer: number;
  constructor(text?: string, setTime: number | string = 5000, importance: IMPORTANCE = IMPORTANCE.LOG_POP) {
    this._msg = null; // 永久显示标记，和元素地址
    this._text = text;
    this._setTime = setTime;
    this._importance = importance;
    this._timer = 0; // 计数器
    // 非空初始化，立即执行；
    if (text !== undefined) {
      this.show();
    }
  }

  // 静态属性，消息盒子
  static _msgBox: HTMLDivElement;
  // 静态方法，初始化消息盒子，先调用本方法初始化消息弹出窗口
  static generate() {
    // 添加样式
    GM_addStyle(`
      #messageBox {
        width: 222px; 
        position: fixed; 
        right: 5%; 
        bottom: 20px; 
        z-index: 999
      }
      #messageBox div {
        width: 100%; 
        background-color: #64ce83; 
        float: left; 
        padding: 5px 10px; 
        margin-top: 10px; 
        border-radius: 10px; 
        color: #fff; 
        box-shadow: 0px 0px 1px 3px #ffffff
      }
      `);

    this._msgBox = document.createElement('div'); // 创建类型为div的DOM对象
    this._msgBox.id = 'messageBox';
    document.body.append(this._msgBox); // 消息盒子添加到body
  }

  // 显示消息
  show(text = this._text, setTime = this._setTime, importance = this._importance) {
    if (this._msg !== null) {
      throw new Error('先移除上条消息，才可再次添加！');
    }
    if (text === undefined) {
      throw new Error('未输入消息');
    }
    this._text = text;
    this._setTime = setTime;
    this._importance = importance;

    this._msg = document.createElement('div');
    this._msg.textContent = text;
    MessageBox._msgBox.append(this._msg); // 显示消息

    switch (importance) {
      case 1: {
        console.log(text);
        break;
      }
      case 2: {
        console.log(text);
        GM_notification(text);
        break;
      }

      default: {
        break;
      }
    }

    if (setTime && !isNaN(Number(setTime))) {
      // 默认5秒删掉消息，可设置时间，none一直显示
      setTimeout(() => {
        this.remove();
      }, Number(setTime));
    }
  }

  refresh(text: string) {
    if (isNaN(Number(this._setTime)) && this._msg) {
      this._msg.textContent = text;
      switch (this._importance) {
        case 1: {
          console.log(text);
          break;
        }
        case 2: {
          console.log(text);
          GM_notification(text);
          break;
        }

        default: {
          break;
        }
      }
    } else {
      throw new Error('只有弹窗永久消息支持刷新内容：' + this._setTime);
    }
  }

  // 移除方法，没有元素则等待setTime 5秒再试5次
  remove() {
    if (this._msg) {
      this._msg.remove();
      this._msg = null; // 清除标志位
    } else {
      // 空初始化时，消息异步发送，导致先执行移除而获取不到元素，默认 setTime=5000
      // 消息发出后，box 非空，可以移除，不会执行 setTime="none"
      if (this._timer == 4) {
        throw new Error('移除的元素不存在：' + this._msg);
      }
      this._timer++;
      setTimeout(() => {
        this.remove();
      }, Number(this._setTime));
    }
  }
}

export { MessageBox };
