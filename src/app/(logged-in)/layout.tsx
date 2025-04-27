import UpgradeRequired from "@/components/common/upgrade-required";
import { getSubscriptionStatus, hasActivePlan } from "@/lib/user";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const hasActiveSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  if (hasActiveSubscription) {
    return <UpgradeRequired />;
  }

  return <>{children}</>;
};

export default layout;
