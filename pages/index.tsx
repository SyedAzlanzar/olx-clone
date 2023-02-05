import AdBanner from "../Components/AdBanner/AdBanner";
import Cards from "../Components/Cards/Cards";
import CategoryHeader from "../Components/CategoryHeader/CategoryHeader";






export default function Home() {

  return (
    <>
      <CategoryHeader />
      <div className="w-3/4 mx-auto">
        <AdBanner />
        <div className="py-7  " />
        <Cards />
      </div>
      {/* <CheckoutForm /> */}
    </>
  );
}
