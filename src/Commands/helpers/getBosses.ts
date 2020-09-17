import { db } from '../../Services/firebase'
import { Boss } from './'

const getBosses = (db:firebase.firestore.Firestore) => {
  const resultPromise = new Promise<Array<Boss>>((resolve,reject)=>{
    db.collection("bosses").get()
      .then(snapshot => {
        let bosses:Array<Boss> = []
        snapshot.forEach(doc => {
          let {code,name,color} = doc.data()
          bosses.push({ id:doc.id,code,name,color })
        })
        resolve(bosses)
      })
  })
  return resultPromise
}

export default async ():Promise<Array<Boss>> => {
  let bosses:Array<Boss> = await getBosses(db)
  return bosses
}