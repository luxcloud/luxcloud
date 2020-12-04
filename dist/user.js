"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor() {
        this._headers = {};
    }
    get pathname() {
        return this._id ? `/users/${this._id}` : '/users';
    }
    get headers() {
        if (this._token) {
            this._headers['X-LC-Session'] = this._token;
        }
        return this._headers;
    }
    setClient(axios) {
        this.axios = axios;
    }
    object(_id) {
        this._id = _id;
        return this;
    }
    token(value) {
        this._token = value;
        return this;
    }
    get() {
        return this.axios.get(this.pathname);
    }
    me() {
        return this.axios.get('/users/me', { headers: this.headers });
    }
    signIn(data) {
        return this.axios.post('/login', data);
    }
    signUp(data) {
        return this.axios.post(this.pathname, data);
    }
    oauth({ type, data }) {
        return this.axios.post(this.pathname, { authData: { [type]: data } });
    }
    update(data) {
        return this.axios.put(this.pathname, data, { headers: this.headers });
    }
    updatePassword({ newPassword, oldPassword }) {
        const data = { new_password: newPassword, old_password: oldPassword };
        return this.axios.put(`${this.pathname}/updatePassword`, data, { headers: this.headers });
    }
    resetPassword(data) {
        return this.axios.post('/requestPasswordReset', data);
    }
    refreshToken() {
        return this.axios.put(`${this.pathname}/refreshSessionToken`, {}, { headers: this.headers });
    }
    verifyEmail(data) {
        return this.axios.post('/requestEmailVerify', data);
    }
}
exports.User = User;
