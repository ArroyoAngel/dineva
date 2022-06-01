export function convert(blob){
    return new Promise((resolve, reject)=>{
      const reader = new FileReader()
      reader.readAsDataURL(blob)
      reader.onloadend = () => {
        resolve(reader.result)
      }
    })
  }