import React from "react";
import { OrdersTable } from "./OrdersTable";
import { Button } from "@acme/acme-ds";
import { PackagePlus } from "lucide-react";
import { Link } from "react-router-dom";

interface Props {}

export const OrdersPage: React.FC<Props> = () => {
  return (
    <div className="pc-flex pc-flex-col pc-gap-10 pc-mt-4 pc-lg:mt-12">
      <h1 className="pc-text-4xl pc-font-semibold pc-border-b-[1px] pc-border-gray pc-pb-2">
        Orders
      </h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
      </p>

      <div className="pc-flex pc-flex-col pc-gap-2">
        <div className="pc-flex pc-justify-end">
          <Button asChild variant="outline">
            <Link to="/product-catalog/orders/purchase">
              <PackagePlus width="1rem" />
              &nbsp; Create purchase
            </Link>
          </Button>
        </div>

        <div className="pc-rounded-md pc-border pc-mb-6">
          <OrdersTable title="Recent orders" />
        </div>
      </div>

      <h3 className="pc-text-2xl pc-font-medium pc-border-b-[1px] pc-border-border pc-pb-2">
        Last month orders
      </h3>

      <div className="pc-rounded-md pc-border pc-mb-6">
        <OrdersTable title="Last month orders" />
      </div>
    </div>
  );
};

export const Component = OrdersPage;
