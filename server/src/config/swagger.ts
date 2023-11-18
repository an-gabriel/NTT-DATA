import { Options } from 'swagger-jsdoc';

class SwaggerOptions {
    private options: Options;

    constructor() {
        this.options = {
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'RURALS API',
                    version: '1.0.0',
                },
            },
            apis: ['src/**/*.ts'],
        };
    }

    public getOptions(): Options {
        return this.options;
    }
}

export default SwaggerOptions;
