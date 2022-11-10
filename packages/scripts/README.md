# @pedalboard/scripts
A set of reusable scripts.

## Installation
### yarn
```bash
yarn add @pedalboard/scripts -D
```
### npm
```bash
npm i @pedalboard/scripts -D
```
## Scripts

*** 
### **collectFiles**
This script allows you to collect files which match a given pattern into a target directory

### Usage
In the following example you collect all the coverage-finals.json files  under the packages directory and place them in `.nyc_output`.
```json
"scripts": {
    "collect": "pedalboard-scripts collectFiles --pattern='packages/**/coverage-final.json' --target='.nyc_output'"
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