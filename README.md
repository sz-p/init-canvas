# type-check-plus
A library for javascript to check value is equal or not with the definition

# Install
```shell
npm install type-check-plus
```
# How to use
```javascript
import check, { checkTree } from 'type-check-plus';
const objValue = [{
    name: 'sz-p',
    age: 1,
    infor: {
      hight: 1.0,
      weight: 2.0
    },
    friends: ['liu', 'zhang', 'li']
},{
    name: 'j-l',
    age: 1,
    infor: {
      hight: 1.0,
      weight: 2.0
    }
}]；
const objDefine = [{
    name: 'string',
    age: 'int',
    infor: {
        hight: 'number',
        weight: 'number'
    },
    // if 'friends' can be undefind use '?' in first char
    friends: '?string[]'
}]
const option = {
  // if objValue is very large use 'threshold' to limit check count
  threshold: 1,
  onError: (value,define)=>{console.log(value,define)},
  onCheck: (value,define)=>{console.log(value,define)}
}
check(objValue,objDefine,option)  // true                    
```

# ParameterList
|Parameter|Example|return|description|
|:---:|:---:|:---:|:---:|
|int|check(1, 'int')|true||
|int|check(1.0, 'int')|false||
|number|check(1.0, 'number')|true||
|number|check(NaN, 'number')|false||
|string|check('string', 'string')|true||
|boolean|check(true, 'boolean')|true||
|boolean|check(1, 'boolean')|false| 0 or 1 is not 'boolean' use true or false|
|any|check(undefined, 'boolean')|true|any input can be 'any'|
|object|check({}, 'object')|true|
|color|check('rgba(0,0,0,100)', 'color')|false|alpha:[0-1] .1 also could be used|
|color|check('#000000', 'color')|true|
|color|check('black', 'color')|true|[colorName](http://www.w3school.com.cn/cssref/css_colorsfull.asp)|
|date|check('2018-08-08', 'date')|true|
|date|check('2018-02-31', 'date')|false|
|array|check([], 'array')|true|
|function|check((function () { }), 'function')|true|
|emailaddress|check('sz_p@outlook.com', 'emailaddress)'|true|

# CheckArray
use '[]' to define array like `'[parameter][]'` Example:`'int[]'`,`'number[]'` all parameter is in [ParameterList](#ParameterList)
## example
|Parameter|Example|return|description|
|:---:|:---:|:---:|:---:|
|int[]|check([1,2,3,4], 'int[]')|true||
|date[]|check(['2018-08-08','2018-08-09','2018-08-10','2018-08-11'], 'date[]')|true||

# CheckObject
```javascript
import check, { checkTree } from 'type-check-plus';
const objValue = {
    name: 'sz-p',
    age: 24,
    infor: {
      hight: 183,
      weight: 90
    },
    friends: ['liu', 'zhang', 'li']
}；
const objDefine = {
    name: 'string',
    age: 'int',
    infor: {
        hight: 'number',
        weight: 'number'
    },
    friends: 'string[]'
}

check(objValue, objDefine) // true
```

# CheckArrayList
use `[[parameter],[parameter],[parameter]]` to define arrayList all parameter is in [ParameterList](#ParameterList).
## example
|Example|return|
|:---:|:---:|
|check([1, '2', 3.0, (() => { }), {}], '['int', 'string', 'number', 'function', 'object']')|true|
|check([1, '2', 3.0, (() => { })], '['int', 'string', 'number', 'function', 'object']')|true|
|check([1, '2', 3.0, (() => { })], '['int', 'string', 'number', 'function']')|false|

# CheckObjectArray
```javascript
import check, { checkTree } from 'type-check-plus';
const objValue = [{
    name: 'sz-p',
    age: 1,
    infor: {
      hight: 1.0,
      weight: 2.0
    },
    friends: ['liu', 'zhang', 'li']
},{
    name: 'j-l',
    age: 1,
    infor: {
      hight: 1.0,
      weight: 2.0
    },
    friends: ['p', 'll', 'li']
}]；
const objDefine = [{
    name: 'string',
    age: 'int',
    infor: {
        hight: 'number',
        weight: 'number'
    },
    friends: 'string[]'
}]

check(objValue,objDefine) // true
```
# CheckTree
```javascript
import check, { checkTree } from 'type-check-plus';
const treeValue = {
  name: 'aa',
  value: 1,
  id: 1,
  children: [
    {
      name: 'aa',
      value: 2,
      id: 1,
      children: [
        {
          name: 'aa',
          value: 3,
          id: 1,
          children: [
          ]
        },
        {
          name: 'aa',
          value: 3,
          id: 2
        }
      ]
    }
  ]
}
const treeDefine = {
    name: 'string',
    value: 'int',
    id: 'int',
    children: '?node[]'
}
checkTree(treeValue,treeDefine) // true
```
# Options
|option|type|description|
|:---:|:---:|:---:|
|threshold|int|if value is very large use 'threshold' to limit check count|
|onError|function(value:string,define:string):void|before return false call onError|
|onCheck|function(value:string,define:string):void|before check value or value's attribute call onCheck|

# Test
```shell
yarn test
```