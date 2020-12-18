"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defaultLimit = 20;
const maxLimit = 999999;
const defaultPage = 1;
class Paginate {
    constructor(app, query) {
        this.limit = query && query._limit && query._limit > 0
            ? parseInt(query._limit, app.config.api.paginationLimit)
            : defaultLimit;
        this.page = query && query._page && query._page > 0
            ? parseInt(query._page, app.config.api.paginationLimit)
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
        return this.limit * (this.page - 1);
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
