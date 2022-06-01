
import { ExcelRenderer } from 'react-excel-renderer'

export async function loadExcel(fileObj, setFieldValue){
  let orden_id, productos
  await ExcelRenderer(fileObj, (err, resp) => {
    if(err){
      console.log(err);            
    }
    else{
      let BALE,LOT,SPECIFICATION,WEIGHT,PCS,MTR,COLOR,CURRENT_COLOR
      productos={}
      resp.rows.map((row)=>{
        if(!orden_id&&row.find(e=>e==='ORDER NO'))orden_id=row[2]
        if(row.find(e=>e==='Gross Weight  TOTAL')){
          BALE=LOT=SPECIFICATION=WEIGHT=PCS=MTR=undefined
        }
        if(row.find(cell=>cell==='DESIGN')){
          row.map((cell,indexCell)=>{
            if(cell==='COLOR')COLOR=indexCell
            if(cell==='BALE')BALE=indexCell
            if(cell==='LOT')LOT=indexCell
            if(cell==='SPECIFICATION')SPECIFICATION=indexCell
            if(cell===' WEIGHT ')WEIGHT=indexCell
            if(cell==='T O T A L'){
              PCS=indexCell
              MTR=indexCell+1
            }
          })
          return
        }
        let spec=[]
        for(let c=SPECIFICATION;c<WEIGHT&&row[c];c++){
          if(row[c])spec.push(row[c])
        }
        if(row[BALE])productos[row[BALE]]={//row[order]+"_"row[BALE]
          color: row[COLOR]?CURRENT_COLOR=row[COLOR]:CURRENT_COLOR,
          lot: row[LOT],
          specification: spec,
          weight: row[WEIGHT],
          pcs: row[PCS],
          mtr: row[MTR],
          order: orden_id,
          //bale: row[BALE],
        }
      })
    }
  })
  setFieldValue("file_name", orden_id)
  setFieldValue("file",  {json: productos, xlsx: fileObj} )
}