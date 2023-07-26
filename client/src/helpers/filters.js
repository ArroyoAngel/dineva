export function filter(orders=null, condition){
  if(!orders)return
  let result = {}
  let resultArray = []
  orders.map(order=>{
    for(let element in order){
      if(typeof (order[element]) === 'object'){
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
      if(typeof (order[producto]) === 'object'&& (order[producto].specification.length>0 && order[producto].pcs > 0) && order[producto].specification.length>0 && (
        (!colorReference||currentProduct.color===colorReference || colorReference==='all')
      &&
        (!aliasReference||currentProduct.alias===aliasReference || aliasReference==='all')
      )){
        currentProduct.bale = producto
        currentProduct.almacen = order.id
        results.push(currentProduct)
      }
    }
  })
  return results
}
