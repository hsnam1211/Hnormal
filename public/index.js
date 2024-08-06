"use strict";
function hi(text) {
    return "\uC548\uB155\uD558\uC138\uC694? ".concat(text);
}
function setId(id) {
    console.log(id);
}
// const originalFetch = window.fetch;
// window.fetch = async (...args) => {
//   const [resource, config] = args as any;
//   const response = await originalFetch(...args);
//   sendLogToServer({
//     resource,
//     method: config?.method || "GET",
//     timestamp: new Date().toISOString(),
//     status: response.status,
//   });
//   return response;
// };
var abortController = undefined;
function sendLogToServer(log) {
    console.log(log);
    // navigator.sendBeacon('url', JSON.stringify(log))
    // 아래부터는 추가한 것
    if (abortController) {
        abortController.abort();
    }
    // 새로운 abortController 생성
    abortController = new AbortController();
    var signal = abortController.signal;
    fetch("https://hooks.slack.com/services/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", {
        method: "POST",
        body: JSON.stringify({
            text: JSON.stringify(log),
        }),
        signal: signal,
    }).then(function (response) { return response.json(); });
}
document.addEventListener("click", function (event) {
    var target = event.target;
    // 클릭한 요소의 정보 수집
    var log = {
        element: target.tagName, // 클릭한 요소의 태그명
        id: target.id || null, // 요소의 ID
        classes: target.className || null, // 요소의 클래스
        text: target.textContent || null, // 요소의 텍스트 내용
        timestamp: new Date().toISOString(), // 클릭 시간
    };
    // 로그 전송
    sendLogToServer(log);
});
var Hnormal = /** @class */ (function () {
    function Hnormal() {
        this.init = function () {
            console.log("HNormal connected!");
        };
    }
    return Hnormal;
}());
module.exports = { hi: hi, setId: setId, Hnormal: Hnormal };
