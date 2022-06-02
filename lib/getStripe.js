import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = async () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_STRIPE_KEY);
    return stripePromise;
  }
};

export default getStripe;