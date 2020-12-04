"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
class Query {
    constructor(className) {
        this.className = className;
    }
    get pathname() {
        return !this.objectId
            ? `/classes/${this.className}`
            : `/classes/${this.className}/${this.objectId}`;
    }
    get params() {
        const parameters = {};
        if (this._skip >= 0) {
            parameters.skip = this._skip;
        }
        if (this._limit >= 0) {
            parameters.limit = this._limit;
        }
        if (this._count) {
            parameters.count = this._count;
        }
        if (this._order) {
            parameters.order = this._order;
        }
        if (this._where) {
            parameters.where = JSON.stringify(this._where);
        }
        if (this._include) {
            parameters.include = this._include;
        }
        if (this._keys) {
            parameters.keys = this._keys;
        }
        return parameters;
    }
    setClient(axios) {
        this.axios = axios;
    }
    skip(value) {
        this._skip = Number(value);
        return this;
    }
    object(objectId) {
        this.objectId = objectId;
        return this;
    }
    limit(value) {
        this._limit = Number(value);
        return this;
    }
    count() {
        this._count = 1;
        return this.limit(0).get();
    }
    order(data) {
        this._order = data;
        return this;
    }
    where(data) {
        this._where = data;
        return this;
    }
    whereIn(...args) {
        const [values, key = 'objectId'] = args.reverse();
        return this.where({ [key]: { $in: values } });
    }
    include(data) {
        this._include = data;
        return this;
    }
    keys(data) {
        this._keys = data;
        return this;
    }
    get() {
        return this.axios.get(this.pathname, { params: this.params });
    }
    insert(data) {
        return this.axios.post(this.pathname, data);
    }
    update(data) {
        return this.axios.put(this.pathname, data, { params: this.params });
    }
    delete() {
        return this.axios.delete(this.pathname, { params: this.params });
    }
}
exports.Query = Query;
