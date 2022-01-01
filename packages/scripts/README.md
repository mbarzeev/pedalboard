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
### aggregatePackagesCoverage
This scripts allow you to aggregate all the unit test coverage report from all packages directory of your monorepo

#### Usage
You'd typically want to call this script form the root project of your monorepo, e.g.
```json
"scripts": {
    "coverage:combined": "pedalboard-scripts aggregatePackagesCoverage
}
```
Following this script you can then call [nyc](https://github.com/istanbuljs/nyc) to create a combined report for all packages at once, which can look something like this -
```json
"scripts": {
    "coverage:combined": "pedalboard-scripts aggregatePackagesCoverage && nyc report --reporter lcov"
}
```