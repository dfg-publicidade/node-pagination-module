import Result from '@dfgpublicidade/node-result-module';
declare class Paginate {
    private limit;
    private page;
    constructor(query: any);
    getLimit(): number;
    getSkip(): number;
    getPage(): number;
    getPages(total: number): number;
    setData(result: Result, total: number): void;
}
export default Paginate;
