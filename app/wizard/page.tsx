import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CurrencyComboBox } from "@/components/CurrencyComboBox";

async function page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-center text-3xl">Welcome, {user.firstName}! 👋</h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Let &apos;s start by setting up your currency
        </h2>
        <h3 className="mt-0.5 text-center text-sm text-muted-foreground">
          You can change these settings at any time
        </h3>
      </div>
      <Separator />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Currency</CardTitle>
          <CardDescription>
            Select the currency you primarily use for managing your finances.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Separator />
      <Button className="w-full" render={<Link href="/" />}>
        I&apos;m done! Take me to the dashboard
      </Button>
    </div>
  );
}
export default page;
