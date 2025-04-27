import { pricingPlans } from "@/utils/constants";
import { getDbConnection } from "./db";
import { getUserUploadCount } from "./summaries";
import { User } from "@clerk/nextjs/server";

const getPriceIdForActiveUser = async (email: string) => {
  const sql = await getDbConnection();

  const query =
    await sql`SELECT price_id FROM users WHERE email = ${email} AND status = 'active'`;

  return query?.[0]?.price_id || null;
};

const hasActivePlan = async (email: string) => {
  const sql = await getDbConnection();

  const query =
    await sql`SELECT price_id, status FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL`;

  return query && query.length > 0;
};

const hasReachedUploadLimit = async (userId: string) => {
  const uploadCount = await getUserUploadCount(userId);

  const priceId = await getPriceIdForActiveUser(userId);

  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";

  const uploadLimit: number = isPro ? 1000 : 5;

  return { hasReachedLimit: uploadCount >= uploadLimit, uploadLimit };
};

const getSubscriptionStatus = async (user: User) => {
  const hasSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  return hasSubscription;
};

export {
  getPriceIdForActiveUser,
  hasReachedUploadLimit,
  getSubscriptionStatus,
  hasActivePlan
};
