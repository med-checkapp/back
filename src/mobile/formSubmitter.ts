import { IQueryData } from './queryDataInterface';
import inputFields, { Input } from './inputFields';
import * as puppeteer from 'puppeteer-core';

import { Browser, Page } from 'puppeteer';

export class FormSubmitter {
    private browser!: Browser;
    private page!: Page;

    constructor(private queryData: IQueryData,
                private buttonHandlerId: string,
                private targetFieldId: string) {}

    public async evaluateQuery() {
        await this.browserNewPage();

        await this.setQueryDataOnPage();

        await this.submitFormOnPage();

        const targetValue = await this.getTargetValue();

        await this.browser.close();

        return targetValue;
    }

    private async browserNewPage() {
        this.browser = await puppeteer.launch({
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
          ],
            headless: 'false' === process.env.DEBUG,
            executablePath: process.env.CHROMIUM_PATH,
        });

        this.page = await this.browser.newPage();

        await this.page.goto(process.env.PAGE_URL!, { waitUntil: 'networkidle2' });
    }

    private async setQueryDataOnPage() {
        await this.page.evaluate(
            (serializedQueryData: string, formInput: Record<string, Input>) => {
                const queryData = JSON.parse(serializedQueryData);

                (Object.keys(queryData) as Array<keyof IQueryData>).forEach((key) => {
                    const input = formInput[key];
                    const queryValue = queryData[key];
                    let inputElement;

                    switch (input.type) {
                        case 'text':
                            inputElement = document.querySelector(`#${input.id}`) as HTMLInputElement;

                            inputElement.value = String(queryValue);

                            break;
                        case 'radio':
                            let id = `#${input.id}`;

                            input.options.forEach((opt) => {
                                if (opt.value === queryValue) id += opt.extendId;
                            });

                            inputElement = document.querySelector(id) as HTMLInputElement;
                            inputElement.checked = true;

                            break;
                    }
                });
            },
            JSON.stringify(this.queryData),
            inputFields,
        );
    }

    private async submitFormOnPage() {
        await this.page.evaluate((buttonHandlerId: string) => {
            const buttonElement = document.querySelector(`#${buttonHandlerId}`) as HTMLInputElement;

            buttonElement.click();
        }, this.buttonHandlerId);
    }

    private async getTargetValue() {
        await this.page.waitForSelector(`#${this.targetFieldId}`);

        const targetValue = await this.page.evaluate((targetFieldId: string) => {
            return document.querySelector(`#${targetFieldId}`)?.innerHTML;
        }, this.targetFieldId);

        return targetValue;
    }
}
