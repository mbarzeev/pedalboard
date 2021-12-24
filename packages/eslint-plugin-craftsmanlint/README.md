# eslint-plugin-craftsmanlint
A set of ESlint rules for your code craftsmanship

## Rules
### no-namespace-imports
This rule will disallow importing namespaces from modules.  
If you don't give it any configuration it will prevent these imports from any module, but you can configure it to disallow these imports only for certain modules, e.g. in the following example it applies only for `./forbidden/module`:

```javascript
{
    "no-namespace-imports": ["error", {forbiddenModules: ['./forbidden/module']}]
}
```
