import type { ReactNode } from "react";
import Link from "next/link";
import {
  BarChart3,
  Home,
  LineChart,
  Menu,
  Package,
  Search,
  ShoppingCart,
  Users,
  Zap,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Sheet,
  Badge,
  SheetContent,
  SheetTrigger,
} from "@acme/acme-ds";
import { DashboardItem } from "./DashboardItem";
import { type LoggedUser } from "~/features/http";

export type DashboardProps = {
  loggedUser: LoggedUser;
  children?: ReactNode;
};

export const Dashboard: React.FC<DashboardProps> = (props) => {
  const { loggedUser } = props;

  return (
    <div className="grid min-h-screen w-full bg-white lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Zap className="h-6 w-6" />
              <span className="">Acme Shim Corp.</span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-auto h-8 w-8"
                >
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Toggle notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex flex-col gap-8">
            <div className="p-4 flex flex-row items-center">
              <Avatar className="bg-emerald-200 h-12 w-12">
                <AvatarImage src={loggedUser.avatar} />
                <AvatarFallback className="bg-emerald-200">
                  {loggedUser.displayName.substring(0, 2).toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <span className="block px-3 text-gray-400 text-sm">
                  Welcome
                </span>
                <span className="block px-3 font-semibold text-large">
                  {loggedUser.displayName}
                </span>
              </div>
            </div>

            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <DashboardItem
                icon={<Home className="h-4 w-4" />}
                href="/dashboard"
                text="Dashboard"
              />
              <DashboardItem
                icon={<ShoppingCart className="h-4 w-4" />}
                href="/product-catalog/orders"
                text="Orders"
                badge="6"
              />
              <DashboardItem
                icon={<Package className="h-4 w-4" />}
                href="/product-catalog/products"
                text="Products"
              />
              <DashboardItem
                icon={<Users className="h-4 w-4" />}
                href="/clients"
                activeAt="/clients"
                text="Clients"
              />
              <DashboardItem
                icon={<BarChart3 className="h-4 w-4" />}
                href="/product-catalog/analytics"
                text="Analytics"
              />
            </nav>
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Zap className="h-6 w-6" />
                  <span>Acme Shim Corp.</span>
                </Link>

                <div className="py-4 mx-[-0.65rem] flex flex-row items-center">
                  <Avatar className="bg-emerald-200 h-12 w-12">
                    <AvatarImage src={loggedUser.avatar} />
                    <AvatarFallback>
                      {loggedUser.displayName
                        .substring(0, 2)
                        .toLocaleUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <span className="block px-3 text-gray-400 text-sm">
                      Welcome
                    </span>
                    <span className="block px-3 font-semibold text-large">
                      {loggedUser.displayName}
                    </span>
                  </div>
                </div>

                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Clients
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                />
              </div>
            </form>
          </div>
        </header>

        {props.children}
      </div>
    </div>
  );
};
