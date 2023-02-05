import type { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const session = await stripe.checkout.sessions.retrieve(id as string, {
    expand: ["payment_intent"],
  });

  res.status(200).json({ ...session });
};
