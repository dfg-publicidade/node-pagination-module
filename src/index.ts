import App from '@dfgpublicidade/node-app-module';
import Result from '@dfgpublicidade/node-result-module';

let defaultLimit: number = 20;
const defaultSkip: number = 0;
const maxLimit: number = 999999;
const defaultPage: number = 1;

class Paginate {
    private limit: number;
    private skip: number;
    private page: number;

    public constructor(app: App, query: any) {
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

    public getLimit(): number {
        return this.limit;
    }

    public getSkip(): number {
        return this.skip + (this.limit * (this.page - 1));
    }

    public getPage(): number {
        return this.page;
    }

    public getPages(total: number): number {
        return Math.ceil(total / this.limit);
    }

    public setData(result: Result, total: number): void {
        result.content.pages = this.getPages(total);
        result.content.itemsPerPage = this.getLimit();
        result.content.currentPage = this.getPage();
    }
}

export default Paginate;
