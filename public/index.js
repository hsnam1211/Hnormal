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
// 현재 스크립트 요소를 가져옵니다.
var currentScript = document.currentScript;
// 스크립트의 src 속성에서 URL을 추출합니다.
var scriptSrc = currentScript.src;
// URL 객체를 생성합니다.
var url = new URL(scriptSrc);
// 쿼리 파라미터에서 'token' 값을 추출합니다.
var token = url.searchParams.get('token');
// token 값을 콘솔에 출력합니다.
console.log('Token:', token);
function createFloatingBox() {
    // 새로운 div 요소 생성
    var box = document.createElement('div');
    // 스타일 설정
    box.style.width = '100px';
    box.style.height = '100px';
    box.style.borderRadius = '6px';
    box.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    box.style.position = 'fixed'; // 화면에 고정
    box.style.bottom = '20px'; // 아래에서 20px 떨어진 위치
    box.style.right = '20px'; // 오른쪽에서 20px 떨어진 위치
    box.style.backgroundColor = '#ffffff'; // 배경색 설정
    box.style.display = 'flex';
    box.style.justifyContent = 'center';
    box.style.alignItems = 'center';
    box.style.zIndex = '1000'; // 다른 요소 위에 표시
    // 내용 추가 (선택 사항)
    box.innerText = 'Hello!';
    // body에 추가
    document.body.appendChild(box);
}
// 함수 호출
createFloatingBox();
var Hnormal = /** @class */ (function () {
    function Hnormal() {
        this.init = function () {
            console.log("HNormal connected!");
        };
    }
    return Hnormal;
}());
module.exports = { hi: hi, setId: setId, Hnormal: Hnormal };
