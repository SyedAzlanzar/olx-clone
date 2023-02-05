import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51MVuEHDliAhllD6W12E7zaScs4DMRVkpg5p12mfdYWey3a8KYaLTWSEnaephqTeuPYk5y8cfDCXlZDaYoGXTOYDD002YNx8RGj"
);

const Checkout = () => {
  const handleClick = async (event: any) => {
    const { sessionId } = await fetch("/api/checkout/session", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        quantity: 1,
      }),
    }).then((res) => res.json());

    const stripe: any = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId,
    });
  };

  return (
    <div className="flex items-center justify-center h-screen cursor-pointer">
      <button
        onClick={handleClick}
        className="bg-emerald-400 py-1 p-2 text-white mt-5"
      >
        Submit
      </button>
    </div>
  );
};

export default Checkout;
