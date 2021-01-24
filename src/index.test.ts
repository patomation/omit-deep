import test from 'ava'
import { omitDeep } from './index'

interface DirtyNestedObject {
  __typeName: string
  name: string
}

interface DirtyObject {
  __typeName: string
  name: string
  subObject: {
    __typeName: string
    anArray: (string|DirtyNestedObject)[]
  }
  myDate: Date
}

interface CleanNestedObject {
  __typeName: string
  name: string
}

interface CleanObject {
  name?: string
  subObject?: {
    anArray?: (string|CleanNestedObject)[]
  }
  myDate?: Date
}

const dirtyObject: DirtyObject = {
  __typeName: 'Test TypeName',
  name: 'Test',
  subObject: {
    __typeName: 'sub TypeName',
    anArray: [
      'a value',
      {
        __typeName: 'array object nested TypeName',
        name: 'nested object in array'
      }
    ]
  },
  myDate: new Date()
}
const cleanObject: CleanObject = omitDeep<DirtyObject, CleanObject>(dirtyObject, '__typeName')

test('cleans specified key from root object', (t) => {
  t.is(Object.prototype.hasOwnProperty.call(
    cleanObject, '__typeName'), false)
})

test('deep cleans specified key from sub object', (t) => {
  t.is(Object.prototype.hasOwnProperty.call(
    cleanObject.subObject, '__typeName'), false)
})

test('cleans key from objects in arrays', (t) => {
  const arrayItem = (cleanObject?.subObject?.anArray || [])[1]
  t.is(Object.prototype.hasOwnProperty.call(
    arrayItem, '__typeName'), false)
})

test('handles Date objects without stripping them', (t) => {
  t.is(cleanObject.myDate instanceof Date, true)
})
