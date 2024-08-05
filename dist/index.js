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
    sendLoToServer({
        resource,
        method: (config === null || config === void 0 ? void 0 : config.method) || 'GET',
        timestamp: new Date().toISOString(),
        status: response.status
    });
    return response;
});
// }
function sendLoToServer(log) {
    console.log(log);
    // navigator.sendBeacon('url', JSON.stringify(log))
}
module.exports = { hi, setId };
