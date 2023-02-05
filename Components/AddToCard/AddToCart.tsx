import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import CartCard from "../CartCard/CardCard";
import { useState, useEffect } from "react";

const AddToCart = () => {
  const selectedItems = useSelector((state: any) => state.user.user.cart);
  const [total, setTotal] = useState(0);
  const [price, setPrice] = useState(0);

  const discount = 56;

  useEffect(() => {
    let price = 0;
    for (let i = 0; i < selectedItems.length; i++)
      price = price + selectedItems[i].previousPrice;

    let total = 0;
    for (let i = 0; i < selectedItems.length; i++)
      total = total + selectedItems[i].price;

    setPrice(price);
    setTotal(total);
  }, [price]);

  const stripePromise = loadStripe(
    "pk_test_51MVuEHDliAhllD6W12E7zaScs4DMRVkpg5p12mfdYWey3a8KYaLTWSEnaephqTeuPYk5y8cfDCXlZDaYoGXTOYDD002YNx8RGj"
  );

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
    <div className="flex items-center justify-center">
      <div className="w-1/4 md:w-1/3 bg-white border-1  mt-6 pt-5">
        <h1 className="font-medium text-center text-xl">View Cart</h1>
        {selectedItems.map((item: any, index: number) => {
          return (
            <CartCard
              setTotal={setTotal}
              pkg={item}
              key={index}
              total={total}
            />
          );
        })}

        <div className="w-3/4  rounded-sm border-b-2 border-[#002F34] mx-auto relative px-3 py-1">
          <h1 className="font-medium text-lg mb-2">PRICE DETAILS</h1>
          <div className="flex items-center justify-between">
            <p>Price</p>
            <p>RS {price}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Discount</p> <p>-Rs {price - total}</p>
          </div>
        </div>
        <div className="w-3/4  rounded-sm mx-auto mb-4 relative px-3 py-1">
          <div className="flex items-center justify-between">
            <p>Total</p> <p>Rs {total}</p>
          </div>
        </div>
        <div className=" border-t-1  ">
          <div
            onClick={handleClick}
            className="bg-[#002f34] py-3 text-center text-white cursor-pointer"
          >
            Pay Rs &nbsp; <span className="font-medium">{total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
