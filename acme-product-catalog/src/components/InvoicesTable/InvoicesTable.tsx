import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Badge,
  TableFooter,
} from "@acme/acme-ds";
import styles from "./InvoicesTable.module.css";
import type { Invoice } from "../../products/invoices";

export interface Props {
  title: string;
  invoices: Invoice[];
}

export const InvoicesTable: React.FC<Props> = (props) => {
  const { title, invoices } = props;

  return (
    <Table className={styles.orders}>
      <TableCaption>{title}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="pc-w-[100px]">Invoice</TableHead>
          <TableHead className="pc-w-[120px]">Status</TableHead>
          <TableHead className="pc-w-[400px]">Product</TableHead>
          <TableHead className="pc-text-right pc-w-[200px]">Method</TableHead>
          <TableHead className="pc-text-right pc-w-[100px]">Quantity</TableHead>
          <TableHead className="pc-text-right pc-w-[125px]">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="pc-font-medium">{invoice.invoice}</TableCell>
            <TableCell className="pc-flex pc-content-end">
              <Badge
                variant={
                  invoice.paymentStatus == "Unpaid" ? "destructive" : "default"
                }
              >
                {invoice.paymentStatus}
              </Badge>
            </TableCell>
            <TableCell className="pc-font-medium">
              {invoice.equipment} ({invoice.brand})
            </TableCell>
            <TableCell className="pc-text-right">
              {invoice.paymentMethod}
            </TableCell>
            <TableCell className="pc-text-right">{invoice.id % 10}</TableCell>
            <TableCell className="pc-text-right">
              {invoice.totalAmount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="pc-text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
