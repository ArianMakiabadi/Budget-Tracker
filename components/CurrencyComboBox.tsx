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
import { useMutation, useQuery } from "@tanstack/react-query";
import SkeletonWrapper from "./SkeletonWrapper";
import { UserSettings } from "@/lib/generated/prisma/client";
import { updateUserCurrency } from "@/app/wizard/_actions/userSettings";
import { toast } from "./ui/toast";

export function CurrencyComboBox() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedCurrency, setSelectedCurrency] =
    React.useState<Currency | null>(null);

  const userSettings = useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: async () => {
      const res = await fetch("/api/user-settings");

      if (!res.ok) {
        throw new Error("Failed to fetch user settings");
      }

      return res.json();
    },
  });

  const userCurrency = currencies.find(
    (c) => c.value === userSettings.data?.currency,
  );

  const currentCurrency = selectedCurrency ?? userCurrency;

  const mutation = useMutation({
    mutationFn: updateUserCurrency,
    onSuccess: (data: UserSettings) => {
      toast.add({
        type: "success",
        title: "Currency updated successfully",
        id: "update-currency",
      });

      setSelectedCurrency(
        currencies.find((c) => c.value === data.currency) || null,
      );
    },

    onError: () => {
      toast.add({
        type: "error",
        title: "something went wrong!",
        id: "update-currency",
      });
    },
  });

  const selectOption = React.useCallback(
    (currency: Currency | null) => {
      if (!currency) {
        toast.add({
          type: "error",
          title: "please select a currency",
        });
        return;
      }

      toast.add({
        type: "info",
        title: "Updating currency...",
        id: "update-currency",
      });

      mutation.mutate(currency?.value);
    },
    [mutation],
  );

  if (isDesktop) {
    return (
      <SkeletonWrapper isLoading={userSettings.isLoading}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="h-12 w-full justify-between px-4 text-base"
                disabled={mutation.isPending}
              />
            }
          >
            {currentCurrency ? (
              <>{currentCurrency.label}</>
            ) : (
              <>Select currency</>
            )}
            <ChevronDown className="size-4 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="w-(--anchor-width) p-0" align="start">
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={selectOption}
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
          render={
            <Button
              variant="outline"
              className="w-full justify-start"
              disabled={mutation.isPending}
            />
          }
        >
          {currentCurrency ? (
            <>{currentCurrency.label}</>
          ) : (
            <>Select currency</>
          )}
        </DrawerTrigger>
        <DrawerContent>
          <div className="mt-4 border-t">
            <CurrencyList
              setOpen={setOpen}
              setSelectedCurrency={selectOption}
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
