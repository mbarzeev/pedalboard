# @pedalboard/scripts
A set of reusable scripts.

## Installation
```bash
pnpm add @pedalboard/scripts -D
```
## Scripts

*** 
### **collectFiles**
This script allows you to collect files which match a given pattern into a target directory.

### Usage
In the following example you collect all the `coverage-final.json` files under the packages directory and place them in `.nyc_output`. Each package's coverage script writes its own `coverage-final.json` to `packages/<pkg>/coverage/`, and this step gathers them all into one place for aggregation.
```json
"scripts": {
    "coverage:collect": "mkdir -p .nyc_output && pedalboard-scripts collectFiles --pattern='packages/**/coverage-final.json' --target='.nyc_output'",
    "coverage:all": "pnpm -r --workspace-concurrency=1 run test:coverage",
    "coverage:combined": "pnpm run coverage:all && pnpm run coverage:collect && nyc report --reporter lcov"
}
```

***

### **aggregatePackagesCoverage**
This scripts allow you to aggregate all the unit test coverage report from all packages directory of your monorepo

#### Usage
You'd typically want to call this script form the root project of your monorepo, e.g.
```json
"scripts": {
    "coverage:combined": "pedalboard-scripts aggregatePackagesCoverage"
}
```
Following this script you can then call [nyc](https://github.com/istanbuljs/nyc) to create a combined report for all packages at once, which can look something like this -
```json
"scripts": {
    "coverage:combined": "pedalboard-scripts aggregatePackagesCoverage && nyc report --reporter lcov"
}
```

***

## Resources

- [Yarn Workspace Scripts Refactor - A Case Study](https://dev.to/mbarzeev/yarn-workspace-scripts-refactor-a-case-study-4ol0)

## License

MIT