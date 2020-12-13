import React, { useContext, useState } from 'react';

import RegisterRestarant from '../components/RegisterRestarant';
import AuthContext from '../context/AuthContext';

export default function NewRestaurant({ navigation }) {
  const [page, setPage] = useState(0);
  return (
    <>
      <RegisterRestarant
        page={page}
        setPage={setPage}
        navigation={navigation}
      />
    </>
  );
}
