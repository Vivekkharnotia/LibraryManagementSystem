import {db} from './general/firebase-config';
import { addDoc, setDoc, doc, collection, getDoc } from 'firebase/firestore'
const details = {
    f_name : 'abcd',
    l_name : 'xyz',
    email : 'absbdj@gmail.com',
    age : 23,
    occupation : 'software developer',
    refferedBy : 'website',
    medicalHistory : ["diabetes", 'high bp patient'],
    surgicalHistory : [{surgery : 'knee replacement-side', date : Date()}],
    personalHistory : ['Smoking', 'Alcohol'],
    familyHistory : ['Paralysis', 'Diabetes'],
    packSize : 5,
    patientNote : 'any special note provided by patient (in general, not for any specfic case)',
    doctorNote : 'any note provided by the doctor (in general, not for any specfic case)'
}
export default function PatientDetails() {
    const handleClick = async () => {
        // let dc = doc(db, "Userdata", '3748737834');
        // // dc.id = '3748737834';
        // await setDoc(dc, details);
        const addedUser = await addDoc(collection(db, 'Userdata'), details);
        console.log(addedUser.id);
    }
    const showDetails = async () => {
       const docRef = doc(db, 'Userdata', 'absbdj@gmail.com');
       const findDoc = await getDoc(docRef);
       if(findDoc.exists()){
        // console.log(findDoc._document.data.value.mapValue.fields.patientHistory.mapValue.fields.familyHistory);
        console.log(findDoc.id);
       }
       else{
        console.log('Not found');
       }
    }
  return (
    <div>
        <div style = {{color :'black'}}>hello world</div>
        <button onClick={handleClick}>Click me</button>
        <button onClick={showDetails}>Show details</button>
    </div>
  )
}

