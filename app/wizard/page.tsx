import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";

async function page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        {" "}
        <h1 className="text-center text-3xl">Welcome, {user.firstName}! 👋</h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Let &apos;s start by setting up your currency
        </h2>
        <h3 className="mt-0.5 text-center text-sm text-muted-foreground">
          You can change these settings at any time
        </h3>
      </div>
      <Separator />
    </div>
  );
}
export default page;
