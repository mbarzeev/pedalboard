import yargs from 'yargs/yargs';
import glob from 'glob';
import fs from 'fs';
import path from 'path';

const GREEN = '\x1b[32m%s\x1b[0m';
function normalizeCoveragePath(filePath: string) {
    const idx = filePath.lastIndexOf('/packages/');
    return idx !== -1 ? filePath.slice(idx + 1) : filePath;
}

function remapCoveragePaths(coverage: Record<string, unknown>) {
    const remapped: Record<string, unknown> = {};
    for (const [filePath, data] of Object.entries(coverage)) {
        const realPath = normalizeCoveragePath(filePath);
        remapped[realPath] = {...(data as Record<string, unknown>), path: realPath};
    }
    return remapped;
}

async function collectFiles({pattern, target}: {pattern: string; target: string}) {
    if (!pattern || !target) throw new Error('Missing either pattern or target params');
    console.log(GREEN, `Collecting files... into ${target}`);

    glob(pattern, {}, (err, files) => {
        if (err) throw err;
        files.forEach((file, index) => {
            const dest = path.resolve(target, `${index}-${path.basename(file)}`);
            if (path.extname(file) === '.json') {
                const coverage = JSON.parse(fs.readFileSync(file, 'utf8'));
                fs.writeFileSync(dest, JSON.stringify(remapCoveragePaths(coverage)));
            } else {
                fs.copyFileSync(file, dest);
            }
        });
    });

    console.log(GREEN, `Done.`);
}

const args = yargs(process.argv.slice(2)).parseSync() as unknown as {pattern: string; target: string};

collectFiles(args);
