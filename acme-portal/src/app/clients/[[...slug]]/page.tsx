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
        <Container
          style={{ opacity: 0 }}
          className="@acme/acme-clients duration-200"
          id="@acme/acme-clients"
        >
          <Microfront microfrontId="@acme/acme-clients" />
        </Container>
      </Dashboard>
    </main>
  );
}
