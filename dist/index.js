"use strict";
function hi(text) {
    return `안녕하세요? ${text}`;
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
let abortController = undefined;
function sendLogToServer(log) {
    console.log(log);
    // navigator.sendBeacon('url', JSON.stringify(log))
    if (abortController) {
        abortController.abort();
    }
    // 새로운 abortController 생성
    abortController = new AbortController();
    const { signal } = abortController;
    fetch(`https://hooks.slack.com/services/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`, {
        method: "POST",
        body: JSON.stringify({
            text: JSON.stringify(log),
        }),
        signal, // abortController의 signal 전달
    }).then((response) => response.json());
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
// 현재 스크립트 요소를 가져옵니다.
const currentScript = document.currentScript;
// 스크립트의 src 속성에서 URL을 추출합니다.
const scriptSrc = currentScript.src;
// URL 객체를 생성합니다.
const url = new URL(scriptSrc);
// 쿼리 파라미터에서 'token' 값을 추출합니다.
const token = url.searchParams.get('token');
// token 값을 콘솔에 출력합니다.
console.log('Token:', token);
function createFloatingBox() {
    // 새로운 div 요소 생성
    const box = document.createElement('div');
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
class Hnormal {
    constructor() {
        this.init = () => {
            console.log("HNormal connected!");
        };
    }
}
module.exports = { hi, setId, Hnormal };
