"use client"

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/contexts/auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useTheme } from "next-themes";

export const Navbar = () => {
  const auth = useAuth()
  const { setTheme, theme } = useTheme();

  return (
    <div className="border-b flex flex-row py-2 items-center justify-between px-4">
      <div className="w-[300px]">
        <Link href="/" legacyBehavior passHref className="cursor-pointer">
          {/* image here */}
          <p className="font-bold">LOGO here</p>
        </Link>
      </div>
      <NavigationMenu className="justify-end">
        <NavigationMenuList>
          <div className="flex flex-row items-center ">
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/app" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  App (protected)
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </div>
          <div className="flex flex-row items-center">

          </div>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="w-[300px] flex flex-row justify-end">
        {!auth.user ? (
          <div className="flex flex-row items-center gap-3">
            <Button onClick={() => { auth.toggleAuthUi(true) }} variant="secondary">Sign In</Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {auth.user.email}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  Change the theme
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                      <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              {/* <ThemeToggle /> */}
              <DropdownMenuItem onClick={() => { auth.handleLogout() }}>
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

    </div>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
