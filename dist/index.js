"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function hi(text) {
    return `안녕하세요? ${text}`;
}
function setId(id) {
    console.log(id);
}
// function interceptionFetch() {
const originalFetch = window.fetch;
window.fetch = (...args) => __awaiter(void 0, void 0, void 0, function* () {
    const [resource, config] = args;
    const response = yield originalFetch(...args);
    sendLogToServer({
        resource,
        method: (config === null || config === void 0 ? void 0 : config.method) || "GET",
        timestamp: new Date().toISOString(),
        status: response.status,
    });
    return response;
});
// }
function sendLogToServer(log) {
    console.log(log);
    // navigator.sendBeacon('url', JSON.stringify(log))
}
document.addEventListener("click", (event) => {
    const target = event.target;
    // 클릭한 요소의 정보 수집
    const log = {
        element: target.tagName, // 클릭한 요소의 태그명
        id: target.id || null, // 요소의 ID
        classes: target.className || null, // 요소의 클래스
        text: target.textContent || null, // 요소의 텍스트 내용
        timestamp: new Date().toISOString(), // 클릭 시간
    };
    // 로그 전송
    sendLogToServer(log);
});
module.exports = { hi, setId };
