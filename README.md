# Omit Deep
A utility to clone an object without certain keys
This is great to lazily send data back to a graphql server without having to worry about the __typename having to be in your input.

# Usage
```javascript
import { omitDeep } from '@patomation/omit-deep'

const before = {
  __typename: 'remove',
  keep: 'me',
  deep: {
    __typename: 'remove',
    keep: 'this one'
  }
}
// Remove __typename key
const after = omitDeep(before, '__typename')
// After = 
// {
//   keep: 'me',
//   deep: {
//     keep: 'this one'
//   }
// }
```
Only the key you specify is removed.


## Install
```
npm i @patomation/omit-deep
```

## Test
```
npm run test
```
supports naming convention: moduleName.test.ts
Check out [ava](https://github.com/avajs/ava)

