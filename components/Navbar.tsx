"use client";
import { usePathname } from "next/navigation";
import Logo, { LogoMobile } from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { UserButton } from "@clerk/nextjs";
import ThemeSwitcherBtn from "./ThemeSwitcherBtn";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu } from "lucide-react";

function Navbar() {
  return (
    <>
      <DesktopNavbar />
      <MobileNavbar />
    </>
  );
}

const items = [
  { title: "Dashboard", link: "/" },
  { title: "Transactions", link: "/transactions" },
  { title: "Manage", link: "/manage" },
];

function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="block md:hidden border-separate bg-background">
      <nav className="container flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <Menu />
          </SheetTrigger>
          <SheetContent className="w-100 sm:w-135" side="left">
            <Logo />
            <div className="flex flex-col pt-4 gap-1">
              {items.map((item) => (
                <NavbarItem
                  key={item.title}
                  title={item.title}
                  link={item.link}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex h-20 min-h-15 items-center gap-x-4">
          <LogoMobile />
        </div>
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton afterSwitchSessionUrl="/sign-in" />
        </div>
      </nav>
    </div>
  );
}

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
        <div className="flex items-center gap-2">
          <ThemeSwitcherBtn />
          <UserButton />
        </div>
      </nav>
    </div>
  );
}

function NavbarItem({
  title,
  link,
  onClick,
}: {
  title: string;
  link: string;
  onClick?: () => void;
}) {
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
        onClick={() => {
          if (onClick) onClick();
        }}
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
