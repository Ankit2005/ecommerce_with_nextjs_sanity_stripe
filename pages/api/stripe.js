// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const mySanityProjectId = "und3zkof";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [
          { shipping_rate: "shr_1L6E6TSEDNFoNKWrzlk1BVsd" },
          { shipping_rate: "shr_1L6E7nSEDNFoNKWrb0ZXX0up" },
        ],
        line_items: req.body.map((item) => {
          //  for just reference  _ref: "image-a64b345016e96adfb8849af5521c8e0ecfe8f027-555x555-webp"
          const img = item.image[0].asset._ref;
          const newImg = img
            .replace(
              "image-",
              `https://cdn.sanity.io/images/${mySanityProjectId}/production/`
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "inr",
              product_data: {
                name: item.name,
                images: [newImg],
              },
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),

        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      console.log("params", params);
      console.log("params", params.line_items[0].price_data);
      const session = await stripe.checkout.sessions.create(params);
      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
