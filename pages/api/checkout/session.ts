import type { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { quantity } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1MXqoKDliAhllD6WnhNNplvn",
        quantity: quantity,
      },
    ],
    mode: "payment",
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/checkout`,
  });

  res.status(200).json({ sessionId: session.id });
}
