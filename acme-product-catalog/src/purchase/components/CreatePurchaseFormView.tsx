import React from "react";
import { Checkbox, Input, Label } from "@acme/acme-ds";
import { FormItem, field } from "../../components/forms/FormItem";
import { FormSection } from "../../components/forms/FormSection";
import { FormSectionRow } from "../../components/forms/FormSectionRow";
import { FormSectionTitleBlock } from "../../components/forms/FormSectionTitleBlock";
import { InvoiceItemsTable } from "./InvoiceItemsTable";
import productsList from "./products.json";
import { Controller } from "react-hook-form";
import InputMask from "react-input-mask";

interface Props {}

const fields = {
  fullname: field("client.fullName", {
    required: true,
  }),
  email: field("client.email", {
    required: true,
    pattern: {
      value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: "E-mail is invalid",
    },
  }),
  phone: field("client.phone", {
    required: true,
    pattern: {
      value: /^\+48 \d{3} \d{3} \d{3}$/g,
      message: "Phone number is invalid",
    },
  }),
  addressLine: field("deliveryAddress.addressLine", {
    required: true,
  }),
  country: field("deliveryAddress.country", {
    required: true,
  }),
  postalCode: field("deliveryAddress.postalCode", {
    required: true,
    pattern: {
      value: /^\d{2}-\d{3}$/g,
      message: "Postal code is invalid",
    },
  }),
  city: field("deliveryAddress.city", {
    required: true,
  }),
  province: field("deliveryAddress.province", {
    required: true,
  }),
  bankAccount: field("payment.bankAccount", {
    required: true,
  }),
  splitPayment: field("payment.splitPayment"),
  notes: field("deliveryAddress.notes"),
};

export const CreatePurchaseFormView: React.FC<Props> = () => {
  return (
    <>
      <FormSection>
        <FormSectionTitleBlock
          title="Client information"
          description="Enter purchasing client contact information."
        />

        <div className="lg:pc-col-span-9 pc-flex pc-flex-col pc-gap-4">
          <FormSectionRow>
            <FormItem
              label="Full name"
              className="pc-col-span-8"
              inputProps={fields.fullname}
              input={<Input autoFocus placeholder="Full name" />}
            />
          </FormSectionRow>

          <FormSectionRow>
            <FormItem
              label="E-mail"
              className="pc-col-span-8"
              inputProps={fields.email}
              input={<Input placeholder="E-mail" />}
            />
          </FormSectionRow>

          <FormSectionRow>
            <FormItem
              label="Phone"
              className="pc-col-span-8"
              inputProps={fields.phone}
              input={({ ref, ...props }) => (
                <Input {...props} placeholder="Phone" asChild>
                  <InputMask
                    mask="+48 999 999 999"
                    inputRef={ref}
                    alwaysShowMask
                  />
                </Input>
              )}
            />
          </FormSectionRow>
        </div>
      </FormSection>

      <FormSection>
        <FormSectionTitleBlock
          title="Delivery address"
          description="Enter your package delivery address."
        />

        <div className="lg:pc-col-span-9 pc-flex pc-flex-col pc-gap-4">
          <FormSectionRow>
            <FormItem
              inputProps={fields.addressLine}
              label="Address line"
              description="Your full address line e.g. 564 Sunnyvale View"
              className="pc-col-span-12"
              input={<Input placeholder="Address line" />}
            />
          </FormSectionRow>

          <FormSectionRow>
            <FormItem
              inputProps={fields.country}
              label="Country"
              className="pc-col-span-4"
              input={
                <Input asChild>
                  <select>
                    <option value="">Select country</option>
                    <option value="Austria">Austria</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="Germany">Germany</option>
                    <option value="Greece">Greece</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Italy">Italy</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Malta">Malta</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Romania">Romania</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Spain">Spain</option>
                    <option value="Sweden">Sweden</option>
                  </select>
                </Input>
              }
            />

            <FormItem
              label="Province"
              inputProps={fields.province}
              className="pc-col-span-4"
              input={<Input placeholder="Province" />}
            />
          </FormSectionRow>

          <FormSectionRow>
            <FormItem
              inputProps={fields.city}
              label="City"
              className="pc-col-span-4"
              input={<Input placeholder="City" />}
            />
            <FormItem
              label="Postal code"
              inputProps={fields.postalCode}
              className="pc-col-span-4"
              input={({ ref, ...props }) => (
                <Input {...props} placeholder="Postal code" asChild>
                  <InputMask mask="99-999" inputRef={ref} alwaysShowMask />
                </Input>
              )}
            />
          </FormSectionRow>
        </div>
      </FormSection>

      <div className="pc-flex pc-flex-col pc-border-b pc-pb-8">
        <FormSectionTitleBlock
          className="pc-mb-4"
          title="Invoice items"
          description="Enter your invoice items (min. 1)"
        />

        <InvoiceItemsTable />
      </div>

      <FormSection>
        <FormSectionTitleBlock title="Payment details" />

        <div className="lg:pc-col-span-9 pc-flex pc-flex-col pc-gap-4">
          <FormSectionRow>
            <FormItem
              label="Bank account"
              className="pc-col-span-8"
              inputProps={fields.bankAccount}
              input={
                <Input asChild>
                  <select>
                    <option value="PL89370400440532013000">
                      PL89370400440532013000
                    </option>
                    <option value="PL1420041010050500013M02606">
                      PL1420041010050500013M02606
                    </option>
                    <option value="PL29NWBK60161331926819">
                      PL29NWBK60161331926819
                    </option>
                    <option value="PL9121000418450200051332">
                      PL9121000418450200051332
                    </option>
                  </select>
                </Input>
              }
            />
          </FormSectionRow>

          <Controller
            name={fields.splitPayment.name}
            rules={fields.splitPayment.rules}
            render={({ field }) => (
              <div className="pc-flex pc-gap-x-2 pc-items-center pc-mb-2">
                <Checkbox
                  ref={field.ref}
                  name={field.name}
                  disabled={field.disabled}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  onBlur={field.onBlur}
                  id="terms"
                  aria-labelledby="terms-label"
                />
                <Label
                  htmlFor="terms"
                  id="terms-label"
                  className="pc-text-sm pc-font-medium pc-leading-none pc-peer-disabled:cursor-not-allowed pc-peer-disabled:opacity-70"
                >
                  Split payment
                </Label>
              </div>
            )}
          />

          <FormSectionRow>
            <FormItem
              label="Notes"
              className="pc-col-span-8"
              inputProps={fields.notes}
              input={
                <Input placeholder="Notes" asChild>
                  <textarea cols={60} rows={15} className="pc-h-40" />
                </Input>
              }
            />
          </FormSectionRow>
        </div>
      </FormSection>

      <datalist id="ice-cream-flavors">
        <option value="Chocolate"></option>
        <option value="Coconut"></option>
        <option value="Mint"></option>
        <option value="Strawberry">Mountain View Dice</option>
        <option value="Vanilla">Vanilla Ice Cream</option>
      </datalist>

      <datalist id="products">
        {productsList.products.map((product) => (
          <option
            key={product.manufacturer_code}
            value={`${product.name}, ${product.manufacturer_code}`}
          >
            {product.manufacturer}, {product.batchId}
          </option>
        ))}
      </datalist>
    </>
  );
};
