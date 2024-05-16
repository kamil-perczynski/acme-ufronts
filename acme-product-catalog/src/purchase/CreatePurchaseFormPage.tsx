import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CreatePurchaseForm } from "./components/types";
import { CreatePurchaseFormView } from "./components/CreatePurchaseFormView";
import { CreatePurchaseContext } from "./useCreatePurchase";
import { Button } from "@acme/acme-ds";
import { usePreventAccidentalLeave } from "./CreatePurchasePage";

interface Props {}

const defaults: CreatePurchaseForm = {
  client: {
    fullName: "",
    email: "",
    phone: "",
  },
  deliveryAddress: {
    addressLine: "",
    country: "",
    province: "",
    city: "",
    postalCode: "",
  },
  invoices: [{ name: "", discount: false, price: "", qty: "1", vat: "23" }],
  payment: {
    bankAccount: "PL89370400440532013000",
    splitPayment: false,
    notes: "",
  },
};

export const CreatePurchaseFormPage: React.FC<Props> = () => {
  usePreventAccidentalLeave();
  const { handleValidSubmit } = useContext(CreatePurchaseContext);

  const form = useForm<CreatePurchaseForm>({
    mode: "onBlur",
    defaultValues: defaults,
  });

  return (
    <>
      <h1 className="pc-text-3xl pc-font-semibold pc-border-b-[1px] pc-border-gray pc-pb-2">
        Create purchase
        <span className="pc-text-2xl pc-font-light pc-pl-2 pc-pb-2 pc-text-slate-400">
          / form
        </span>
      </h1>

      <form
        className="pc-flex pc-flex-col pc-gap-6"
        onSubmit={form.handleSubmit(handleValidSubmit)}
      >
        <FormProvider {...form}>
          <CreatePurchaseFormView />
        </FormProvider>

        <div className="pc-pb-32">
          <Button type="submit">Create your purchase</Button>
        </div>
      </form>
    </>
  );
};

export const Component = CreatePurchaseFormPage;
