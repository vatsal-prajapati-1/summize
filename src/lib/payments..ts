import Stripe from "stripe";
import { getDbConnection } from "./db";

const handleCheckoutSessionCompleted = async ({
  session,
  stripe,
}: {
  session: any;
  stripe: Stripe;
}) => {
  console.log("handleCheckoutSessionCompleted", session);
  const customerId = session.customer as string;
  const customer = await stripe.customers.retrieve(customerId);
  const priceId = session.line_items?.data[0]?.price?.id;

  if ("email" in customer && priceId) {
    const { email, name } = customer;

    const sql = await getDbConnection();

    await createOrUpdateUser({
      sql,
      email: email as string,
      fullName: name as string,
      customerId,
      priceId: priceId as string,
      status: "active",
    });

    await createPayment({
      sql,
      session,
      priceId: priceId as string,
      userEmail: email as string,
    });
  }
};

const createOrUpdateUser = async ({
  email,
  fullName,
  customerId,
  priceId,
  status,
  sql,
}: {
  email: string;
  fullName: string;
  customerId: string;
  priceId: string;
  status: string;
  sql: any;
}) => {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (user.length === 0) {
      await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${fullName}, ${customerId}, ${priceId}, ${status})`;
    }
  } catch (error) {
    console.error("Error creating or updating user", error);
  }
};

const createPayment = async ({
  session,
  priceId,
  userEmail,
  sql,
}: {
  session: Stripe.Checkout.Session;
  priceId: string;
  userEmail: string;
  sql: any;
}) => {
  try {
    const { amount_total, id, customer_email, status } = session;
    await sql`INSERT INTO payments (amount, status, stripe_payment_id, user_email, price_id) VALUES (${amount_total}, ${status}, ${id}, ${userEmail}, ${priceId})`;
  } catch (error) {
    console.error("Error creating payment", error);
  }
};

const handleSubscriptionDeleted = async ({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) => {
  console.log("handleSubscriptionDeleted", subscriptionId);

  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const sql = await getDbConnection();

    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer}`;

    console.log("Subscription deleted successfully");
  } catch (error) {
    console.error("Error handling subscription deleted", error);
    throw error;
  }
};

export { handleCheckoutSessionCompleted, handleSubscriptionDeleted };
