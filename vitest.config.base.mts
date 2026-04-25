import {defineConfig} from 'vitest/config';
import path from 'path';
import fs from 'fs';

const coverageOutputFile = process.env.COVERAGE_OUTPUT_FILE;

if (coverageOutputFile) {
    process.on('exit', () => {
        const lcovFile = path.join('coverage', 'lcov.info');
        if (fs.existsSync(lcovFile)) {
            // Extract package path from Bazel's TEST_TARGET ("//packages/components:vitest" → "packages/components")
            const packagePath = process.env.TEST_TARGET?.match(/^\/\/(.+):/)?.[1];
            const fixed = fs.readFileSync(lcovFile, 'utf8')
                // Strip runfiles prefix if present: "vitest_/vitest.runfiles/_main/packages/…" → "packages/…"
                .replace(/^SF:.*\.runfiles\/[^/]+\//gm, 'SF:')
                // Prepend package path if not already workspace-relative: "src/…" → "packages/components/src/…"
                .replace(/^SF:(?!packages\/)/gm, `SF:${packagePath}/`);
            fs.writeFileSync(coverageOutputFile, fixed);
        }
    });
}

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        exclude: ['**/dist/**', '**/node_modules/**'],
        coverage: {
            include: ['src/**'],
            exclude: ['**/*.stories.{ts,tsx,js,jsx}'],
        },
    },
});
