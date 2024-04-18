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
        <Container id="@acme/acme-product-catalog">
          <Microfront microfrontId="@acme/acme-product-catalog" />
        </Container>
      </Dashboard>
    </main>
  );
}
