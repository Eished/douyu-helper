// ==UserScript==
// @name                斗鱼直播助手
// @namespace           https://github.com/Eished/douyu-helper
// @version             2022.08.22
// @description         斗鱼直播自动切换画质，全局设置最高画质或最低画质，可单独设置每个直播间画质：原画、4K、2K、1080p、蓝光、720p、超清、高清清晰度，自动记忆并切换到上次选择的画质。油猴开发模板，Tampermonkey template
// @author              Eished
// @copyright           Eished
// @license             MIT
// @match               *://*.douyu.com/*
// @run-at              document-idle
// @supportURL          https://github.com/Eished/douyu-helper/issues
// @homepage            https://github.com/Eished/douyu-helper
// @grant               GM_getValue
// @grant               GM_setValue
// @grant               GM_registerMenuCommand
// @icon                https://www.google.com/s2/favicons?domain=douyu.com
// ==/UserScript==
/* eslint-disable */ /* spell-checker: disable */
// @[ You can find all source codes in GitHub repo ]
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 752:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
var app = function () {
    var rid = new URLSearchParams(window.location.search).get('rid');
    if (!rid) {
        var results = window.location.pathname.match(/[\d]{1,10}/);
        if (results) {
            rid = results[0];
        }
        else {
            return;
        }
    }
    var videoSub = document.querySelector('.layout-Player-videoSub');
    if (rid && videoSub) {
        autoSelectClarity(rid, videoSub);
    }
};
var autoSelectClarity = function (rid, videoSub) {
    var Clarities = ['全局默认最高画质', '全局默认最低画质'];
    var selectedClarity = GM_getValue(rid);
    var defaultClarity = GM_getValue('defaultClarity');
    var clickClarity = function (li, save) {
        if (save === void 0) { save = false; }
        if (!li.className.includes('selected')) {
            save ? GM_setValue(rid, li.innerText) : null;
            li.click();
        }
    };
    var selectClarity = function (list) {
        // 注册菜单栏
        Clarities.forEach(function (clarity, index) {
            GM_registerMenuCommand(clarity, function () {
                if (index === 0) {
                    clickClarity(list[0]);
                    GM_setValue('defaultClarity', 1);
                }
                else {
                    clickClarity(list[list.length - 1]);
                    GM_setValue('defaultClarity', 0);
                }
                if (selectedClarity) {
                    GM_setValue(rid, null);
                }
            });
        });
        var notFoundCount = 0;
        list.forEach(function (li) {
            var availableClarity = li.innerText;
            if (selectedClarity === availableClarity) {
                // 选择自定义画质
                clickClarity(li);
            }
            else {
                notFoundCount++;
            }
            // 防止误触发保存，仅保存真实点击
            li.addEventListener('click', function (e) { return clickClarity(li, e.isTrusted); });
            // 注册菜单栏
            GM_registerMenuCommand(availableClarity, function () { return clickClarity(li, true); });
        });
        // 选择默认画质
        if (notFoundCount === list.length) {
            if (defaultClarity === 0) {
                clickClarity(list[list.length - 1]);
            }
            else {
                clickClarity(list[0]);
            }
        }
    };
    var callback = function (mutations, observer) {
        var controller = videoSub === null || videoSub === void 0 ? void 0 : videoSub.querySelector("[value=\"\u753B\u8D28 \"]");
        if (controller) {
            observer.disconnect();
            var ul = controller.nextElementSibling;
            var list = ul === null || ul === void 0 ? void 0 : ul.querySelectorAll('li');
            list ? selectClarity(list) : console.debug('斗鱼直播助手：未找到画质选项');
        }
    };
    var observer = new MutationObserver(callback);
    observer.observe(videoSub, {
        childList: true,
        subtree: true,
    });
};
exports["default"] = app;


/***/ }),

/***/ 607:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var app_1 = __importDefault(__webpack_require__(752));
if (true) {
    (0, app_1.default)();
}
else {}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(607);
/******/ 	
/******/ })()
;