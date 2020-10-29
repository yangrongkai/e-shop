'use strict'


export const deepClone = (obj:any) => {
  let temp: any = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    temp[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
  }
  return temp
}
