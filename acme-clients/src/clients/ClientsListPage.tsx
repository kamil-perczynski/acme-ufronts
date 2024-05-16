import React from "react";
import { ClientsListView } from "./ClientsListView";
import { BankListItem, fetchBanks } from "../features/companies";
import { Skeleton } from "@acme/acme-ds";
import { useLoaderData } from "react-router-dom";

interface Props {}

export const ClientsListPage: React.FC<Props> = () => {
  const banks = useLoaderData() as BankListItem[];

  return (
    <div className="c-flex c-flex-col c-gap-4 c-mt-4 c-lg:mt-12">
      <h1 className="c-text-4xl c-font-semibold c-mb-6 c-border-b-[1px] c-border-gray c-pb-2">
        Clients List
      </h1>

      {banks.length == 0 && <Skeleton />}
      {banks.length > 0 && <ClientsListView banks={banks} />}
    </div>
  );
};

export const Component = ClientsListPage;
export const loader = () => fetchBanks();
