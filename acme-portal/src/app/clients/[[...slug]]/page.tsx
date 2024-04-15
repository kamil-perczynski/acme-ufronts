import React from "react";
import { Dashboard } from "~/app/components/Dashboard";
import { Microfront } from "~/app/components/Microfront";
import { fetchLoggedUser } from "~/features/http";

export default async function ProductCatalogPage() {
  const loggedUser = await fetchLoggedUser();

  return (
    <Dashboard loggedUser={loggedUser}>
      <main className="w-full h-full">
        <div id="@acme/acme-clients" className="container mx-auto p-4 h-full">
          <Microfront microfrontId="@acme/acme-clients" />
        </div>
      </main>
    </Dashboard>
  );
}
