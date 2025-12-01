# @pedalboard/stylelint-plugin-craftsmanlint
A set of StyleLInt rules for your code craftsmanship

# Installation
Yarn  
`yarn add -D stylelint @pedalboard/stylelint-plugin-craftsmanlint`

NPM  
`npm install -D stylelint @pedalboard/stylelint-plugin-craftsmanlint`

<br>

# Rules
## **stylelint-plugin-craftsmanlint/props-in-files**
This rule checks that certain CSS properties reside only in files they are  allowed to be in.

### usage  
**Allowing a certain CSS property to be in specific files**:  

For example, let's say you'd like the `font-family` property to only be allowed in the `my-css-file.css` file. This means that any other file which holds this CSS property will cause the linter to fail.  
You would then set the rule like this (in your `.stylelintrc.json` ) 

```json
{
   "plugins": ["@pedalboard/stylelint-plugin-craftsmanlint"],
   "rules": {
       "stylelint-plugin-craftsmanlint/props-in-files": [
           {
               "font-family": {
                   "allowed": ["my-css-file.css"]
               }
           },
           {
               "severity": "error"
           }
       ]
   }
}
```


**Forbid a certain CSS property from residing in specific files**:  
You can also have it work the opposite way buy declaring which files should not contain a certain CSS property. In this case, you would change the "allowed" to "forbidden":

```json
{
   "plugins": ["@pedalboard/stylelint-plugin-craftsmanlint"],
   "rules": {
       "stylelint-plugin-craftsmanlint/props-in-files": [
           {
               "font-family": {
                   "forbidden": ["my-css-file.css"]
               }
           },
           {
               "severity": "error"
           }
       ]
   }
}
```
This means that the `font-family` CSS property cannot be in the `my-css-file.css` file.  
> Both "forbidden" an "allowed" support an Array of files but also a reserved keyword `["all"]` to enforce the rule on all inspected files.

### Advanced usage 

**Allowing or forbidding a certain CSS property _with a certain value_ to reside in files**: 
You can add a `value` field to the rule, which then allows you to go deeper and inspect the property's value. In the next example you can make sure that you forbid only `font-family: Arial;` in all the files. Any other value to the `font-family` will be ok:  

```javascript
module.exports = {
   "plugins": ["@pedalboard/stylelint-plugin-craftsmanlint"],
   "rules": {
       "stylelint-plugin-craftsmanlint/props-in-files": [
           {
               "font-family": {
                    "valueRegex": /^Arial$/,
                    "forbidden": ["all"]
               }
           },
           {
               "severity": "error"
           }
       ]
   }
}
```
When the rule is defined in a `.stylelintrc.js` file.\
If your rule is defined in a JSON format, then you can pass a string as the regex, without the forward slashes, like so:

```json
"font-family": {
    "valueRegex": "^Arial$",
    "forbidden": ["all"]
}
```

## **stylelint-plugin-craftsmanlint/no-hardcoded-values**
This rule prevents hardcoded CSS values when design system tokens should be used instead. It helps maintain consistency by enforcing the use of predefined design tokens for spacing, colors, and other CSS properties.

### usage
**Basic configuration**:

```javascript
module.exports = {
    plugins: ['@pedalboard/stylelint-plugin-craftsmanlint'],
    rules: {
        'stylelint-plugin-craftsmanlint/no-hardcoded-values': [
            {
                valueToToken: {
                    '4px': '$spacing-half',
                    '8px': '$spacing-1',
                    '#F5F5F7': '$bg-off-white-color',
                    '#FFFFFF': '$white',
                }
            },
            {
                severity: 'error',
            },
        ],
    },
};
```

This configuration will flag any CSS declaration that uses `4px` and suggest using `$spacing-half` instead.

**Multiple token options**:

You can provide multiple token options for the same value:

```javascript
{
    valueToToken: {
        '0': ['$spacing-0', '0'],  // Suggests either option
    }
}
```

### Advanced features

- **Case insensitive matching**: Color values like `#FFFFFF` and `#ffffff` are treated the same
- **Normalization**: Values are normalized (trimmed, quotes removed) for accurate matching

### Example violations

```scss
// Will error
.my-class {
    margin: 4px;  // Hard-coded value '4px' detected. Replace it with the token $spacing-half.
    color: #F5F5F7;  // Hard-coded value '#F5F5F7' detected. Replace it with the token $bg-off-white-color.
}

// Will pass
.my-class {
    margin: $spacing-half;
    color: $bg-off-white-color;
}
```


# Resources
* [Enforcing Your CSS Standards with a Custom Stylelint Plugin](https://dev.to/mbarzeev/enforcing-your-css-standards-with-a-custom-stylelint-plugin-1o8c)
* [Testing Your Stylelint Plugin](https://dev.to/mbarzeev/testing-your-stylelint-plugin-5ceh)
* [Enhancing a Stylelint plugin (with some TDD love)](https://dev.to/mbarzeev/enhancing-a-stylelint-plugin-with-some-tdd-love-hpo)

