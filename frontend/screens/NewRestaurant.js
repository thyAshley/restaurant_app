import React, { useState } from "react";

import RegisterRestarant from "../components/RegisterRestarant";

export default function NewRestaurant() {
  const [page, setPage] = useState(page);

  return (
    <>
      <RegisterRestarant page={page} setPage={setPage} />
    </>
  );
}
