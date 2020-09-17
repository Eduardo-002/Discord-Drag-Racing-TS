import { Boss,Claim } from './'
import { db } from '../../Services/firebase'

const clearClaim = (db:firebase.firestore.Firestore,boss:Boss,claim:Claim) => {
  const promise = new Promise<boolean>(resolve => {
    db.collection('bosses').doc(boss.id).collection('claims').doc(claim.id)
      .delete()
      .then(()=>{
        resolve(true)
      })
  })
  return promise
}

export default async (boss:Boss,claim:Claim):Promise<boolean> => {
  const clear = await clearClaim(db,boss,claim)
  return clear
}