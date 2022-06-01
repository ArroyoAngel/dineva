import { isObject } from 'formik'

export function filter(orders=null, condition){
  if(!orders)return
  let result = {}
  let resultArray = []
  orders.map(order=>{
    for(let element in order){
      if(isObject(order[element])){
        result[order[element][condition]] = order[element][condition]
      }
    }
  })

  for(let cell in result){
    resultArray.push(cell)
  }
  return resultArray
}

export function filterStoreByCondition(orders=null, colorReference=null, aliasReference=null){
  if(!orders)return
  let results = []
  orders.map(order=>{
    for(let producto in order){
      let currentProduct = order[producto]
      if(isObject(order[producto])&&(
        (!colorReference||currentProduct.color===colorReference)
      &&
        (!aliasReference||currentProduct.alias===aliasReference)
      )){
        currentProduct.bale = producto
        currentProduct.almacen = order.id
        results.push(currentProduct)
      }
    }
  })
  return results
}
