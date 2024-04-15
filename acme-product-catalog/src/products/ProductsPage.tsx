import React from "react";
import {
  Badge,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@acme/acme-ds";
import { invoices } from "./invoices";

import styles from "./ProductsPage.module.css";
import { Link } from "react-router-dom";

interface Props {}

export const ProductsPage: React.FC<Props> = () => {
  return (
    <div className="pc-flex pc-flex-col pc-gap-4 pc-mt-4 pc-lg:mt-12">
      <h1 className="pc-text-4xl pc-font-semibold pc-mb-6 pc-border-b-[1px] pc-border-gray pc-pb-2">
        Products
      </h1>

      <p>Table goes here</p>

      <div className="pc-rounded-md pc-mt-4 pc-border">
        <Table className={styles.invoices}>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="pc-text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="pc-font-medium">
                  <Link
                    to={`/product-catalog/invoices/${invoice.invoice}`}
                    className="hover:underline"
                  >
                    {invoice.invoice}
                  </Link>
                </TableCell>
                <TableCell className="pc-flex pc-content-end">
                  <Badge>{invoice.paymentStatus}</Badge>
                </TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="pc-text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="pc-text-right">$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};
