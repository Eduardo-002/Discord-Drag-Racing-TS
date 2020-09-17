import { db } from '../../Services/firebase'
import { Boss,Claim } from './'

const getClaims = (boss:Boss,db:firebase.firestore.Firestore) => {
  const resultPromise = new Promise<Array<Claim>>((resolve) => {
    db.collection('bosses').doc(boss.id).collection('claims').orderBy('index', 'asc').get()
      .then(snapshots => {
        let claims:Array<Claim> = []
        snapshots.forEach(doc => {
          let {index,username} = doc.data()
          claims.push({id:doc.id,index,username})
        })
        resolve(claims)
      })
  })
  return resultPromise
}

export default async (boss:Boss):Promise<Array<Claim>> => {
  let bosses:Array<Claim> = await getClaims(boss,db)
  return bosses
}