// server/src/runSeeds.ts

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const modulesPath = path.join(__dirname, '..', '..', 'src', 'modules');

fs.readdirSync(modulesPath).forEach(moduleName => {
    const seedPath = path.join(modulesPath, moduleName, 'seed');

    // Verificar se o diretório seed existe
    if (fs.existsSync(seedPath)) {
        const seedFile = fs.readdirSync(seedPath).find(file => file.endsWith('.seed.ts'));

        if (seedFile) {
            const seedFilePath = path.join(seedPath, seedFile);
            console.log(`Executing seed for module ${moduleName}`);
            execSync(`npx ts-node ${seedFilePath}`, { stdio: 'inherit' });
        } else {
            console.log(`No seed file found for module ${moduleName}`);
        }
    } else {
        console.log(`No seed directory found for module ${moduleName}`);
    }
});
