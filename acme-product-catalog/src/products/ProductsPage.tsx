import React from "react";
import { invoices } from "./invoices";

import { InvoicesTable } from "../components/InvoicesTable/InvoicesTable";
import { Link } from "react-router-dom";

interface Props {}

export const ProductsPage: React.FC<Props> = () => {
  return (
    <div className="pc-flex pc-flex-col pc-gap-4 pc-mt-4 pc-lg:mt-12">
      <h1 className="pc-text-4xl pc-font-semibold pc-mb-6 pc-border-b-[1px] pc-border-gray pc-pb-2">
        Products
      </h1>

      <p>Table goes <Link to="/product-catalog/orders">here</Link></p>

      <div className="pc-rounded-md pc-mt-4 pc-border">
        <InvoicesTable title="Recent invoices" invoices={invoices} />
      </div>
    </div>
  );
};

export const Component = ProductsPage;
