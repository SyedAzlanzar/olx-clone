import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";

const success = () => {
  const router = useRouter();

  const { data, error } = useSWR(
    router.query.session_id ? `/api/checkout/${router.query.session_id}` : null,

    (url) => fetch(url).then((res) => res.json())
  );

  return (
    <div>
      <p>
        {data
          ? JSON.stringify(data.customer_details.name, null, 20)
          : "Loading..."}
      </p>
    </div>
  );
};

export default success;
