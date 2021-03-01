import App from '@dfgpublicidade/node-app-module';
import Result from '@dfgpublicidade/node-result-module';
declare class Paginate {
    private limit;
    private skip;
    private page;
    constructor(app: App, query: any);
    getLimit(): number;
    getSkip(): number;
    getPage(): number;
    getPages(total: number): number;
    setData(result: Result, total: number): void;
}
export default Paginate;
