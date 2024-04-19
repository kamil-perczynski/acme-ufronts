import React from "react";
import { Container } from "~/app/components/Container";
import { Dashboard } from "~/app/components/Dashboard";
import { Microfront } from "~/app/components/Microfront";
import { fetchLoggedUser } from "~/features/http";

export default async function ProductCatalogPage() {
  const loggedUser = await fetchLoggedUser();

  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Dashboard loggedUser={loggedUser}>
        <Container className="flex flex-col gap-4 mt-4 lg:pb-24">
          <h1 className="text-4xl font-semibold border-b-[1px] border-gray pb-2">
            Dashboard
          </h1>

          <div id="@acme/acme-product-catalog">
            <Microfront microfrontId="@acme/acme-product-catalog" />
          </div>

          <div id="@acme/acme-clients">
            <Microfront microfrontId="@acme/acme-clients" />
          </div>
        </Container>
      </Dashboard>
    </main>
  );
}
