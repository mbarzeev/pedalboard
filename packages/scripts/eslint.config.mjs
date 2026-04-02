import rootConfig from "../../eslint.config.mjs";
import globals from "globals";

export default [
    ...rootConfig,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];
