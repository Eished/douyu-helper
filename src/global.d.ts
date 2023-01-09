/* eslint-disable @typescript-eslint/no-explicit-any */

export const enum XhrMethod {
  POST = 'POST',
  GET = 'GET',
}

export const enum XhrResponseType {
  ARRAYBUFFER = 'arraybuffer',
  BLOB = 'blob',
  JSON = 'json',
  TEXT = 'text',
  DOCUMENT = 'document',
  FORM = 'application/x-www-form-urlencoded',
}

export type XhrOptions = {
  responseType: XhrResponseType;
  usermethod: XhrMethod;
  contentType: XhrResponseType;
};

declare global {
  const PRODUCTION: boolean;
  const FILENAME: string;

  interface MonkeyXhrResponse {
    finalUrl: string;
    readyState: number;
    status: number;
    statusText: string;
    responseHeaders: any;
    response: any;
    responseXML: Document;
    responseText: string;
  }
  interface MonkeyXhrBasicDetails {
    url: string;
    method?: 'GET' | 'POST' | 'HEAD';
    headers?: { [name: string]: string };
    data?: string;
    binary?: boolean;
    timeout?: number;
    context?: any;
    responseType?: XhrResponseType;
    overrideMimeType?: string;
    anonymous?: boolean;
    fetch?: boolean;
    username?: string;
    password?: string;
  }
  interface MonkeyXhrDetails extends MonkeyXhrBasicDetails {
    onabort?: (response: MonkeyXhrResponse) => void;
    onerror?: (response: MonkeyXhrResponse) => void;
    onloadstart?: (response: MonkeyXhrResponse) => void;
    onprogress?: (response: MonkeyXhrResponse) => void;
    onreadystatechange?: (response: MonkeyXhrResponse) => void;
    ontimeout?: (response: MonkeyXhrResponse) => void;
    onload?: (response: MonkeyXhrResponse) => void;
  }
  type RunAtOptions = 'document-start' | 'document-end' | 'document-idle' | 'document-body' | 'context-menu';
  interface MonkeyInfo {
    script: {
      author: string;
      copyright: string;
      description: string;
      excludes: string[];
      homepage: string;
      icon: string;
      icon64: string;
      includes: string[];
      lastUpdated: number;
      matches: string[];
      downloadMode: string;
      name: string;
      namespace: string;
      options: {
        awareOfChrome: boolean;
        compat_arrayleft: boolean;
        compat_foreach: boolean;
        compat_forvarin: boolean;
        compat_metadata: boolean;
        compat_prototypes: boolean;
        compat_uW_gmonkey: boolean;
        noframes: boolean;
        override: {
          excludes: false;
          includes: false;
          orig_excludes: string[];
          orig_includes: string[];
          use_excludes: string[];
          use_includes: string[];
        };
        run_at: RunAtOptions;
      };
      position: number;
      resources: string[];
      'run-at': RunAtOptions;
      system: boolean;
      unwrap: boolean;
      version: string;
    };
    scriptMetaStr: string;
    scriptSource: string;
    scriptUpdateURL: string;
    scriptWillUpdate: boolean;
    scriptHandler: string;
    isIncognito: boolean;
    version: string;
  }
  function GM_xmlhttpRequest(details: MonkeyXhrDetails): { abort: () => void };
}
export {};
