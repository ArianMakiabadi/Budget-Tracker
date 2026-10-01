import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { MinusIcon, PlusIcon } from "lucide-react";
import { redirect } from "next/navigation";
import CreateTransactionDialog from "./_components/CreateTransactionDialog";

async function page() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const userSettings = await prisma.userSettings.findUnique({
    where: { userId: user.id },
  });

  if (!userSettings) redirect("/wizard");

  return (
    <div className="h-full bg-background">
      <div className="border-b">
        <div className="container flex flex-wrap justify-between items-center gap-6 py-4">
          <p className="text-3xl font-bold">Hello, {user.firstName}!</p>

          <div className="flex items-center gap-3">
            <CreateTransactionDialog
              trigger={
                <Button
                  variant="outline"
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 dark:border-emerald-500 dark:bg-emerald-950 dark:hover:bg-emerald-700"
                >
                  Add Income
                  <PlusIcon />
                </Button>
              }
              type="income"
            />
            <CreateTransactionDialog
              trigger={
                <Button
                  variant="outline"
                  className="border-red-500 bg-red-950 text-white hover:bg-red-700 dark:border-red-500 dark:bg-red-950 dark:hover:bg-red-700"
                >
                  Add Expense <MinusIcon />
                </Button>
              }
              type="expense"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
