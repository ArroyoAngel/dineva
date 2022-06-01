//FORMULARIOS DE REGISTRO
export const user = [
  { name: "Luis Angel", lastname: "Arroyo Acuña", phone: "73666496", ci: "9607943", cargo: "Secretario"},
  { name: "Lucia", lastname: "Acuña Ninaja", phone: "71032503", ci: "1828403", cargo: "Encargado de almacén"},
  { name: "Cristian", lastname: "Tito Guzmán", phone: "77439313", ci: "9582732", cargo: "Secretario"},
  { name: "José Lino", lastname: "Arroyo Acuña", phone: "67371380", ci: "8256355", cargo: "Encargado de almacén"},
  { name: "Noelia", lastname: "Vargas Mamani", phone: "78311814", ci: "9752365", cargo: "Encargado de almacén"},
]

export const store = [
  { bale: 1, lot: 1, specification: [60,63,64], weight: 58, pcs: 3, mtr: 187, color: 1, order: "PO#2012-04" },
  { bale: 2, lot: 1, specification: [60,64,64], weight: 60, pcs: 3, mtr: 194, color: 1, order: "PO#2012-04" },
  { bale: 3, lot: 1, specification: [61,65,67], weight: 60, pcs: 3, mtr: 193, color: 1, order: "PO#2012-04" },
  { bale: 9, lot: 1, specification: [64,65,65], weight: 60, pcs: 3, mtr: 194, color: 5, order: "PO#2012-04" },
  { bale: 10, lot: 1, specification: [59,63,61], weight: 57, pcs: 3, mtr: 183, color: 5, order: "PO#2012-04" },
  { bale: 11, lot: 1, specification: [66,68,66], weight: 62, pcs: 3, mtr: 200, color: 5, order: "PO#2012-04" },
]
export const store1 = [
  { bale: 1, lot: 1, specification: [60,63,64], weight: 58, pcs: 3, mtr: 187, color: 1, order: "PO#2012-05" },
  { bale: 2, lot: 1, specification: [60,64,64], weight: 60, pcs: 3, mtr: 194, color: 1, order: "PO#2012-05" },
  { bale: 3, lot: 1, specification: [61,65,67], weight: 60, pcs: 3, mtr: 193, color: 1, order: "PO#2012-05" },
  { bale: 9, lot: 1, specification: [64,65,65], weight: 60, pcs: 3, mtr: 194, color: 5, order: "PO#2012-05" },
  { bale: 10, lot: 1, specification: [59,63,61], weight: 57, pcs: 3, mtr: 183, color: 5, order: "PO#2012-05" },
  { bale: 11, lot: 1, specification: [66,68,66], weight: 62, pcs: 3, mtr: 200, color: 5, order: "PO#2012-05" },
]
export const store2 = [
  { bale: 1, lot: 1, specification: [60,63,64], weight: 58, pcs: 3, mtr: 187, color: 1, order: "PO#2012-06" },
  { bale: 2, lot: 1, specification: [60,64,64], weight: 60, pcs: 3, mtr: 194, color: 1, order: "PO#2012-06" },
  { bale: 3, lot: 1, specification: [61,65,67], weight: 60, pcs: 3, mtr: 193, color: 1, order: "PO#2012-06" },
  { bale: 9, lot: 1, specification: [64,65,65], weight: 60, pcs: 3, mtr: 194, color: 5, order: "PO#2012-06" },
  { bale: 10, lot: 1, specification: [59,63,61], weight: 57, pcs: 3, mtr: 183, color: 5, order: "PO#2012-06" },
  { bale: 11, lot: 1, specification: [66,68,66], weight: 62, pcs: 3, mtr: 200, color: 5, order: "PO#2012-06" },
]

export const storehouse = [
  { credential: "1", name: "Almacen Uno", address: "Av/Avenida 1 c/Calle 1", phone: "4 4436644", description: "Ninguna descripción", available: store },//ESTE available es el STORE ES UN .json
  { credential: "2", name: "Almacen Dos", address: "Av/Avenida 2 c/Calle 2", phone: "4 4437755", description: "Ninguna descripción", available: store1 },//ESTE available es el STORE ES UN .json
  { credential: "3", name: "Almacen Tres", address: "Av/Avenida 3 c/Calle 3", phone: "4 4438866", description: "Ninguna descripción", available: store2 },//ESTE available es el STORE ES UN .json
]

export const order = [
  { name: "PO#2012-04", alias: "pollera", provider: "China", storehouse: "1", file: "direccion en el store" },//ESTE file: {} DEBE DE SER UN .XLXS O .XLS (EXCEL)
  { name: "PO#2012-05", alias: "pantalon", provider: "Tailandia", storehouse: "2", file: "direccion en el store" },//ESTE file: {} DEBE DE SER UN .XLXS O .XLS (EXCEL)
  { name: "PO#2012-06", alias: "blusa", provider: "Corea", storehouse: "3", file: "direccion en el store" },//ESTE file: {} DEBE DE SER UN .XLXS O .XLS (EXCEL)
]

export const request_ToProvider = [
  { provider: "China", code: "1", image: null, description: "Este será PO#2012-04/pollera" },
  { provider: "Tailandia", code: "2", image: null, description: "Este será PO#2012-05/pantalon" },
  { provider: "Corea", code: "3", image: null, description: "Este será PO#2012-06/blusa" },
]

export const request_ToClient = [
  {name: "Cliente Uno", address: "Dirección Cliente Uno", phone: "64589322", description: "Ninguna descripción", file: null}

]