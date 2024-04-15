import React from "react";
import { Dashboard } from "~/app/components/Dashboard";
import { Microfront } from "~/app/components/Microfront";
import { fetchLoggedUser } from "~/features/http";

export default async function ProductCatalogPage() {
  const loggedUser = await fetchLoggedUser();

  return (
    <main className="w-full lg:min-h-[600px] xl:min-h-[800px]">
      <Dashboard loggedUser={loggedUser}>
        <div id="@re/product-catalog" className="container mx-auto p-4">
          <Microfront microfrontId="@re/product-catalog" />
        </div>
      </Dashboard>
    </main>
  );
}
