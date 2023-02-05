import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cookie from "react-cookies";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const token = useSelector((state: any) => state.user.user.accessToken);
  const token = cookie.load("token");
  const [data, setdata] = useState("");
  const router = useRouter();
  useEffect(() => {
    if (!token) router.push("/");
    else setdata(token);
  }, [router, token]);

  return <>{data ? children : null}</>;
};

export default ProtectedRoute;
