"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("./query");
const user_1 = require("./user");
class Cloud {
    constructor() {
    }
    get user() {
        const user = new user_1.User();
        user.setClient(this.axios);
        return user;
    }
    setClient(axios) {
        this.axios = axios;
    }
    _(className) {
        const query = new query_1.Query(className);
        query.setClient(this.axios);
        return query;
    }
}
exports.default = new Cloud();
