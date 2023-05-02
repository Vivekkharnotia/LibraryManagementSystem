import { Table } from '@mui/material';
import Appointments from 'components/general/Appointments/Appointments';
import UsersTable from 'components/general/Table/Table';
import CollapsibleTable from 'components/general/Table/Table';
import { db } from 'components/general/firebase-config';
import { FieldPath, collection, documentId, getDocs, limit, orderBy, query } from 'firebase/firestore';
import React, { useEffect } from 'react'




const app = ({rows}: {rows: any}) => {

  return (
    <>
      <UsersTable rows={rows}/>
  </>
  );
};


export async function getStaticProps() {
  
  const ref = collection(db, "Userdata");
  const q = query(ref, orderBy('MostRecentPaymentHistory'), limit(10));
  const docSnap = await getDocs(q);
  const rows = docSnap.docs.map((doc: any) => ({
    id: doc.id,
    name: `${doc.data().fname} ${doc.data().lname}`,
    email: doc.data().email,
    payments: doc.data().payments,
  }));

  
  // Pass data to the page via props
  return { props: { rows } };
}

export default app;