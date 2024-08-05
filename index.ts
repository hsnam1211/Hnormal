function hi(text: string) {
  return `안녕하세요? ${text}`
}

function setId(id: number) {
  console.log(id)
}

// function interceptionFetch() {
const originalFetch = window.fetch;

window.fetch = async (...args) => {
  const [resource, config] = args as any;
  const response = await originalFetch(...args);

  sendLoToServer({
    resource,
    method: config?.method || 'GET',
    timestamp: new Date().toISOString(),
    status: response.status
  })
  return response;
}
// }

function sendLoToServer(log: { resource: RequestInfo; method: string; timestamp: string; status: any }) {
  console.log(log)
  // navigator.sendBeacon('url', JSON.stringify(log))
}

// export = { hi, setId, interceptionFetch };
export = { hi, setId };