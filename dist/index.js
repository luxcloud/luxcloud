"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setup = exports.Pointer = void 0;
const axios_1 = __importDefault(require("axios"));
const cloud_1 = __importDefault(require("./cloud"));
var pointer_1 = require("./types/pointer");
Object.defineProperty(exports, "Pointer", { enumerable: true, get: function () { return pointer_1.Pointer; } });
const baseURL = process.env.LEANCLOUD_BASE_URL;
class Configuration {
    constructor({ appId, appKey }) {
        this.appId = appId;
        this.appKey = appKey;
        this.baseURL = baseURL || `https://${appId.slice(0, 8)}.api.lncldglobal.com/1.1`;
    }
}
function setup({ appId, appKey }) {
    const { baseURL } = new Configuration({ appId, appKey });
    cloud_1.default.setClient(axios_1.default.create({
        baseURL,
        headers: {
            'X-LC-Id': appId,
            'X-LC-Key': appKey
        }
    }));
    return cloud_1.default;
}
exports.setup = setup;
