import UpgradeRequired from "@/components/common/upgrade-required";
import { hasActivePlan } from "@/lib/user";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const hasActiveSubscription = await hasActivePlan(
    user.emailAddresses[0].emailAddress
  );

  if (hasActiveSubscription) {
    return (
      <div>
        <UpgradeRequired />
      </div>
    );
  }

  return <div>{children}</div>;
};

export default layout;
