import App, { AppInfo } from '@dfgpublicidade/node-app-module';
import Result, { ResultStatus } from '@dfgpublicidade/node-result-module';
import { expect } from 'chai';
import { before, describe, it } from 'mocha';
import Paginate from '../src/index';

/* Tests */
describe('index.ts', (): void => {
    let app: App;

    before(async (): Promise<void> => {
        const appInfo: AppInfo = {
            name: 'test',
            version: 'v1'
        };

        app = new App({
            appInfo,
            config: {
                pagination: {
                    limit: 20
                }
            },
            connectionName: undefined,
            db: undefined
        });
    });

    it('1. constructor', async (): Promise<void> => {
        const paginate: Paginate = new Paginate(app, {});

        const total: number = 40;

        expect(paginate).to.exist;

        // eslint-disable-next-line no-magic-numbers
        expect(paginate.getLimit()).to.be.eq(20);
        expect(paginate.getSkip()).to.be.eq(0);
        expect(paginate.getPage()).to.be.eq(1);
        // eslint-disable-next-line no-magic-numbers
        expect(paginate.getPages(total)).to.be.eq(2);

        const result: Result = new Result(ResultStatus.SUCCESS, {});
        // eslint-disable-next-line no-magic-numbers
        paginate.setData(result, total);

        expect(result).to.exist;
        expect(result.content).to.exist;
        // eslint-disable-next-line no-magic-numbers
        expect(result.content.pages).to.be.eq(2);
        // eslint-disable-next-line no-magic-numbers
        expect(result.content.itemsPerPage).to.be.eq(20);
        expect(result.content.currentPage).to.be.eq(1);
    });

    it('2. constructor', async (): Promise<void> => {
        const paginate: Paginate = new Paginate(app, {
            _limit: 30,
            _skip: 5,
            _page: 2
        });

        const total: number = 40;

        expect(paginate).to.exist;

        // eslint-disable-next-line no-magic-numbers
        expect(paginate.getLimit()).to.be.eq(30);
        // eslint-disable-next-line no-magic-numbers
        expect(paginate.getSkip()).to.be.eq(35);
        expect(paginate.getPage()).to.be.eq(2);
        // eslint-disable-next-line no-magic-numbers
        expect(paginate.getPages(total)).to.be.eq(2);

        const result: Result = new Result(ResultStatus.SUCCESS, {});
        paginate.setData(result, total);

        expect(result).to.exist;
        expect(result.content).to.exist;
        // eslint-disable-next-line no-magic-numbers
        expect(result.content.pages).to.be.eq(2);
        // eslint-disable-next-line no-magic-numbers
        expect(result.content.itemsPerPage).to.be.eq(30);
        expect(result.content.currentPage).to.be.eq(2);
    });

    it('3. constructor', async (): Promise<void> => {
        const paginate: Paginate = new Paginate(app, {
            _nopaginate: 'true'
        });

        const total: number = 40;

        expect(paginate).to.exist;

        // eslint-disable-next-line no-magic-numbers
        expect(paginate.getLimit()).to.be.eq(999999);
        expect(paginate.getSkip()).to.be.eq(0);
        expect(paginate.getPage()).to.be.eq(1);
        expect(paginate.getPages(total)).to.be.eq(1);

        const result: Result = new Result(ResultStatus.SUCCESS, {});
        paginate.setData(result, total);

        expect(result).to.exist;
        expect(result.content).to.exist;
        // eslint-disable-next-line no-magic-numbers
        expect(result.content.pages).to.be.eq(1);
        // eslint-disable-next-line no-magic-numbers
        expect(result.content.itemsPerPage).to.be.eq(999999);
        expect(result.content.currentPage).to.be.eq(1);
    });
});
