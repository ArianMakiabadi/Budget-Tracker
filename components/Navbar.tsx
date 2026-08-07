"use client";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

function Navbar() {
  return (
    <>
      <DesktopNavbar />
    </>
  );
}

const items = [
  { title: "Dashboard", link: "/" },
  { title: "Transactions", link: "/transactions" },
  { title: "Manage", link: "/manage" },
];

function DesktopNavbar() {
  return (
    <div className="hidden border-separate border-b bg-background md:block">
      <nav className="container flex items-center justify-between px-8">
        <div className="flex h-20 min-h-15 items-center gap-x-4">
          <Logo />
          <div className="flex h-full">
            {items.map((item) => (
              <NavbarItem
                key={item.title}
                title={item.title}
                link={item.link}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({ title, link }: { title: string; link: string }) {
  const pathName = usePathname();
  const isActive = pathName === link;

  return (
    <div className="relative flex items-center">
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "w-full justify-start text-lg text-muted-foreground hover:text-foreground",
          isActive && "text-foreground",
        )}
      >
        {title}
      </Link>
      {isActive && (
        <div className="absolute bg-foreground w-[80%] h-0.5 rounded-xl -bottom-0.5 left-1/2 -translate-x-1/2 hidden md:block" />
      )}
    </div>
  );
}

export default Navbar;
