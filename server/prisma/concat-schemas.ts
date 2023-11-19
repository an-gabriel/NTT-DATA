import { appendFile, readFile, writeFile } from 'fs/promises';
import glob from 'glob';

const start = async () => {

    const schemaFile = 'prisma/schema.prisma';
    const connectFile = 'prisma/connect-db.prisma';

    const models = await new Promise<string[]>((resolve, reject) => {
        glob('src/**/*.prisma', (err, files) => {
            if (err) {
                reject(err);
            } else {
                resolve(files);
            }
        });
    });

    const files = [connectFile, ...models];

    await writeFile(schemaFile, '');

    await Promise.all(
        files.map(async (path) => {
            const content = await readFile(path);
            return appendFile(schemaFile, content.toString());
        })
    );
};

start();
