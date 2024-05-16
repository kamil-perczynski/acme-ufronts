import React from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
  Button,
  Separator,
  Checkbox,
} from "@acme/acme-ds";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { TableInput } from "./TableInput/TableInput";
import { FormItem, field } from "../../components/forms/FormItem";
import { CreatePurchaseForm } from "./types";

const createFields = (i: number) => ({
  name: field(`invoices.${i}.name`, {
    required: true,
    pattern: /^.*, [A-Z]{1,6}-\d{1,6}$/g,
  }),
  price: field(`invoices.${i}.price`, {
    min: 1,
    required: true,
  }),
  qty: field(`invoices.${i}.qty`, {
    value: 1,
    min: 1,
    required: true,
  }),
  discount: field(`invoices.${i}.discount`),
  vat: field(`invoices.${i}.vat`, {
    required: true,
  }),
});

export const InvoiceItemsTable: React.FC = () => {
  const form = useFormContext<CreatePurchaseForm>();

  const invoicesForm = useFieldArray<CreatePurchaseForm>({
    name: "invoices",
    rules: {
      minLength: 1,
      required: true,
    },
  });

  const handleAppendItem = () =>
    invoicesForm.append({
      name: "",
      discount: false,
      price: "",
      qty: "1",
      vat: "23",
    });

  const handleRemoveItme = () =>
    invoicesForm.remove(invoicesForm.fields.length - 1);

  const items = form.watch("invoices", []);

  const total = items
    .filter((item) => !isNaN(Number(item.price)))
    .filter((item) => !isNaN(Number(item.qty)))
    .map((item) => Number(item.price) * Number(item.qty))
    .reduce((a, b) => a + b, 0);

  const tableEl = (
    <Table className="pc-w-full pc-table-fixed">
      <TableHeader>
        <TableRow>
          <TableHead className="pc-w-[30px]">#</TableHead>
          <TableHead className="pc-w-[630px]">Product</TableHead>
          <TableHead className="pc-text-right pc-w-[100px]">Price</TableHead>
          <TableHead className="pc-text-right pc-w-[100px]">Quantity</TableHead>
          <TableHead className="pc-text-right pc-w-[120px]">Discount</TableHead>
          <TableHead className="pc-text-right pc-w-[65px]">VAT</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {invoicesForm.fields
          .map((item, i) => [item, createFields(i)] as const)
          .map(([item, fields], i) => (
            <TableRow key={item.id} className="pc-h-12">
              <TableCell>{i + 1}.</TableCell>

              <TableCell className="pc-font-medium">
                <FormItem
                  showErrors={false}
                  input={<TableInput list="products" placeholder="Product" />}
                  inputProps={fields.name}
                />
              </TableCell>

              <TableCell className="pc-font-medium">
                <FormItem
                  className="pc-text-right"
                  showErrors={false}
                  input={
                    <TableInput
                      placeholder="Price"
                      type="number"
                      dir="rtl"
                      min={1}
                    />
                  }
                  inputProps={fields.price}
                />
              </TableCell>

              <TableCell className="pc-font-medium">
                <FormItem
                  className="pc-text-right"
                  showErrors={false}
                  input={
                    <TableInput
                      placeholder="Quantity"
                      type="number"
                      min={1}
                      dir="rtl"
                    />
                  }
                  inputProps={fields.qty}
                />
              </TableCell>

              <TableCell className="pc-font-medium">
                <Controller
                  name={fields.discount.name}
                  rules={fields.discount.rules}
                  render={({ field }) => (
                    <div className="pc-flex pc-justify-end pc-pr-2">
                      <Checkbox
                        ref={field.ref}
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                        disabled={field.disabled}
                        id={fields.discount.name}
                      />
                    </div>
                  )}
                />
              </TableCell>

              <TableCell className="pc-font-medium">
                <FormItem
                  className="pc-text-right"
                  input={
                    <TableInput className="pc-text-right">
                      <select dir="rtl">
                        <option value="23">23%</option>
                        <option value="8">8%</option>
                        <option value="5">5%</option>
                        <option value="0">0%</option>
                        <option value="N/A">N/A</option>
                      </select>
                    </TableInput>
                  }
                  inputProps={fields.vat}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="pc-text-right">
            {new Intl.NumberFormat("pl", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </TableCell>
          <TableCell colSpan={4}>&nbsp;</TableCell>
        </TableRow>

        <Controller
          name="invoices"
          render={({ fieldState }) => (
            <>
              {fieldState.error && fieldState.error.root && (
                <TableRow>
                  <TableCell
                    className="pc-text-red-500 pc-font-medium pc-text-xs"
                    colSpan={7}
                  >
                    An invoice needs at least one item
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        />
      </TableFooter>
    </Table>
  );

  return (
    <div className="pc-border pc-rounded">
      {tableEl}

      <div className="pc-flex pc-h-8 pc-space-x-1 pc-flex-row pc-my-1 pc-px-1">
        <Button
          type="button"
          onClick={handleAppendItem}
          disabled={form.formState.disabled}
          size="sm"
          variant="ghost"
        >
          <PlusCircle size={16} />
          &nbsp; Add item
        </Button>

        <Separator className="pc-h-full" orientation="vertical" />

        <Button
          type="button"
          disabled={form.formState.disabled || invoicesForm.fields.length === 0}
          onClick={handleRemoveItme}
          size="sm"
          variant="ghost"
        >
          <MinusCircle size={16} />
          &nbsp; Remove item
        </Button>

        {/* <div className="pc-flex-1" />

        <Separator className="pc-h-full" orientation="vertical" />

        <Button type="button" size="sm" variant="ghost">
          <Fullscreen size={16} />
          &nbsp; Fullscreen
        </Button> */}
      </div>
    </div>
  );
};
