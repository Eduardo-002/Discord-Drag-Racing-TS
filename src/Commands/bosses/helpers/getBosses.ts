interface Boss {
  id: string,
  name: string,
  color: string
}

const getBosses = (db:any) => {
  const resultPromise = new Promise<Array<Boss>>((resolve,reject)=>{
    db.collection("bosses").get()
      .then((snapshot:any) => {
        let bosses:Array<Boss> = []
        snapshot.forEach((doc:any) => {
          bosses.push({ id: doc.id, name: doc.data().name, color: doc.data().color })
        })
        resolve(bosses)
      })
  })
  return resultPromise
}

export default async ():Promise<Array<Boss>> => {
  let firebase = await import(process.env.basedir+'/Services/firebase')
  let db = firebase.db

  let bosses:Array<Boss> = await getBosses(db)
  return bosses
}