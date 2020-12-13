import React, { useState } from 'react';

import RegisterRestarant from '../components/RegisterRestarant';

export default function NewRestaurant() {
  const [page, setPage] = useState(0);

  return (
    <>
      <RegisterRestarant page={page} setPage={setPage} />
    </>
  );
}
