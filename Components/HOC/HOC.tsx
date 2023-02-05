import { useRouter } from "next/router";
import React, { FC, useState, useEffect } from "react";
import MainHeader from "../MainHeader/MainHeader";
import AdFooter from "../AdFooter/AdFooter";
import Footer from "../Footer/Footer";

interface IProps {
  children: React.ReactElement<any, any> | null;
}

const HOC: FC<IProps> = ({ children }) => {
  const router = useRouter();

  const [Navbar, setNavbar] = useState<boolean | null>(null);
  const [olxFooter, setOlxFooter] = useState<boolean | null>(null);

  useEffect(() => {
    RenderMainHeader();
    RenderFooter();
  }, [router.pathname]);

  const RenderMainHeader = () => {
    if (router.pathname === "/" || router.pathname.includes("item/")) setNavbar(true);
    else setNavbar(null);
  };

  const RenderFooter = () => {
    if (router.pathname === "/" || router.pathname.includes("item/")) setOlxFooter(true);
    else setOlxFooter(null);
  };

  return (
    <div>
      {Navbar ? <MainHeader /> : null}
      <main>{children}</main>
      {olxFooter ? (
        <>
          <AdFooter />
          <Footer />
        </>
      ) : null}
    </div>
  );
};

export default HOC;
