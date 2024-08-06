function hi(text: string) {
  return `안녕하세요? ${text}`;
}

function setId(id: number) {
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

let abortController = undefined as any;
function sendLogToServer(log: {
  resource: RequestInfo;
  method: string;
  timestamp: string;
  status: any;
}) {

  console.log(log);
  // navigator.sendBeacon('url', JSON.stringify(log))

  // 아래부터는 추가한 것
  if (abortController) {
    abortController.abort();
  }

  // 새로운 abortController 생성
  abortController = new AbortController();
  const { signal } = abortController;

  fetch(
    `https://hooks.slack.com/services/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`,
    {
      method: "POST",
      body: JSON.stringify({
        text: JSON.stringify(log),
      }),
      signal, // abortController의 signal 전달
    }
  ).then((response) => response.json());
}

document.addEventListener("click", (event) => {
  const target = event.target as any;

  // 클릭한 요소의 정보 수집
  const log = {
    element: target.tagName, // 클릭한 요소의 태그명
    id: target.id || null, // 요소의 ID
    classes: target.className || null, // 요소의 클래스
    text: target.textContent || null, // 요소의 텍스트 내용
    timestamp: new Date().toISOString(), // 클릭 시간
  } as any;

  // 로그 전송
  sendLogToServer(log);
});

class Hnormal {
  public init = () => {
    console.log("HNormal connected!")
  }
}

export = { hi, setId, Hnormal };
