# @pedalboard/stylelint-plugin-craftsmanlint
A set of StyleLInt rules for your code craftsmanship

# Rules
## **stylelint-plugin-craftsmanlint/props-in-files**
This rule checks that certain CSS properties reside only in files they are  allowed to be in.

### usage
For example, you would like that the `font-family` property will be only in the `my-css-file.css` file, you would then set the rule like this (in your `.stylelintrc.json` ) 

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
This means that any other file which holds this CSS property will cause the linter to fail.
You can also have it work the opposite way, but declaring which files should not contain a certain CSS property. In that case, you would change the "allowed" to "forbidden":

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

Both "allowed" and "forbidden" support multiple files.


