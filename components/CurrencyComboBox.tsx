"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { currencies, Currency } from "@/lib/currencies";
import { ChevronDown } from "lucide-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency | null>(null);

  const userSettings: UseQueryResult<Response, Error> = useQuery({
    queryKey: ["userSettings"],
    queryFn: async () => {
      const res = await fetch("/api/user-settings");

      if (!res.ok) {
        throw new Error("Failed to fetch user settings");
      }

      return res.json();
    },
  });

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isFetching}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="h-12 w-full justify-between px-4 text-base"
              />
            }
          >
            {selectedCurrency ? (
              <>{selectedCurrency.label}</>
            ) : (
              <>Select currency</>
            )}
            <ChevronDown className="size-4 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="w-(--anchor-width) p-0" align="start">
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={setSelectedCurrency}
            />
          </PopoverContent>
        </Popover>
      </SkeletonWrapper>
    );
  }

  return (
    <SkeletonWrapper isLoading={userSettings.isFetching}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          render={<Button variant="outline" className="w-full justify-start" />}
        >
          {selectedCurrency ? (
            <>{selectedCurrency.label}</>
          ) : (
            <>Select currency</>
          )}
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={setSelectedCurrency}
            />
          </div>
        </DrawerContent>
      </Drawer>
    </SkeletonWrapper>
  );
}

function CurrencyList({
  setOpen,
  setSelectedCurrency,
}: {
  setOpen: (open: boolean) => void;
  setSelectedCurrency: (status: Currency | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter currencies..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {currencies.map((c) => (
            <CommandItem
              key={c.value}
              value={c.value}
              onSelect={(value) => {
                setSelectedCurrency(
                  currencies.find((priority) => priority.value === value) ||
                    null,
                );
                setOpen(false);
              }}
            >
              {c.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
