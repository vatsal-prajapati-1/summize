import { isDev } from "./helper";

const pricingPlans = [
  {
    name: "Basic",
    price: 9,
    description: "Perfect for occasional use",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: isDev ? "https://buy.stripe.com/test_eVa4hAeKX6xc3ew289" : "",
    priceId: isDev ? "price_1RHlD9PSnCveH15MzbXfXqq9" : "",
  },
  {
    name: "Pro",
    price: 19,
    description: "For professional and teams",
    items: [
      "Unlimited PDF Summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown Export",
    ],
    id: "pro",
    paymentLink: isDev ? "https://buy.stripe.com/test_3cs8xQgT508O4iA4gg" : "",
    priceId: isDev ? "price_1RHlD9PSnCveH15MI7KGJz2L" : "",
  },
];

export { pricingPlans };
