import { XhrMethod, XhrOptions, XhrResponseType } from '@/global';
import { MessageBox } from '@/lib/message';
import { IMPORTANCE } from './message';

export const getData = (
  url: string,
  type: XhrResponseType = XhrResponseType.DOCUMENT,
  usermethod: XhrMethod = XhrMethod.GET
): Promise<Document> => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: usermethod,
      url: url,
      responseType: type,
      timeout: 5 * 60 * 1000,
      onload: function (response) {
        if (response.status >= 200 && response.status < 400) {
          resolve(response.response);
        } else {
          reject(response);
        }
      },
      onerror: function (error) {
        new MessageBox('网络错误');
        reject(error);
      },
      ontimeout: () => {
        new MessageBox('网络超时', 'none', IMPORTANCE.LOG_POP_GM);
        reject('timeout');
      },
    });
  });
};

export const postData = (
  url: string,
  postData: string,
  {
    responseType = XhrResponseType.FORM,
    usermethod = XhrMethod.POST,
    contentType = XhrResponseType.FORM,
  }: XhrOptions = {
    responseType: XhrResponseType.FORM,
    usermethod: XhrMethod.POST,
    contentType: XhrResponseType.FORM,
  }
): Promise<MonkeyXhrResponse> => {
  return new Promise((resolve, reject) => {
    GM_xmlhttpRequest({
      method: usermethod,
      url: url,
      headers: {
        'Content-Type': contentType,
      },
      data: postData,
      responseType: responseType,
      timeout: 1 * 60 * 1000,
      onload: function (response) {
        if (response.status >= 200 && response.status < 400) {
          resolve(response);
        } else {
          new MessageBox('请求错误：' + response.status);
          reject(response.status);
        }
      },
      onerror: function (error) {
        new MessageBox('网络错误');
        reject(error);
      },
      ontimeout: () => {
        new MessageBox('网络超时', 'none', IMPORTANCE.LOG_POP_GM);
        reject('timeout');
      },
    });
  });
};
