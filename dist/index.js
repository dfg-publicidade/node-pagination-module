"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let defaultLimit = 20;
const defaultSkip = 0;
const maxLimit = 999999;
const defaultPage = 1;
class Paginate {
    constructor(app, query) {
        defaultLimit = app.config.pagination.limit;
        this.limit = query && query._limit && query._limit > 0
            ? parseInt(query._limit, 10)
            : defaultLimit;
        this.skip = query && query._skip && query._skip > 0
            ? parseInt(query._skip, 10)
            : defaultSkip;
        this.page = query && query._page && query._page > 0
            ? parseInt(query._page, 10)
            : defaultPage;
        if (query && query._nopaginate && query._nopaginate === 'true') {
            this.limit = maxLimit;
            this.page = 1;
        }
    }
    getLimit() {
        return this.limit;
    }
    getSkip() {
        return this.skip + (this.limit * (this.page - 1));
    }
    getPage() {
        return this.page;
    }
    getPages(total) {
        return Math.ceil(total / this.limit);
    }
    setData(result, total) {
        result.content.pages = this.getPages(total);
        result.content.itemsPerPage = this.getLimit();
        result.content.currentPage = this.getPage();
    }
}
exports.default = Paginate;
