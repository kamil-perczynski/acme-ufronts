import React from "react";
import { OrdersTable } from "../orders/OrdersTable";
import { Card } from "@acme/acme-ds";

export const Dashboard: React.FC = () => {
  return (
    <div className="pc-flex pc-flex-col pc-gap-6 pc-mt-6">
      <h2 className="pc-text-2xl pc-font-semibold">Featured articles</h2>
      <p>
        Delve into the world of 3D web development at your own pace. Stay
        informed, stay inspired.
        <br />
        Explore the Three.js development through our recent articles.
      </p>

      <div className="pc-grid pc-grid-cols[1fr] md:pc-grid-cols-[1fr_1fr_1fr] pc-gap-6">
        <div className="pc-space-y-4">
          <Card
            className="pc-h-[300px] lg:pc-h-[23rem] pc-bg-cover pc-bg-center"
            style={{
              backgroundImage: `url(https://threejs.org/examples/screenshots/webgl_instancing_dynamic.jpg)`,
            }}
          />
          <div className="pc-space-y-1 pc-text-sm">
            <h3 className="pc-font-medium pc-leading-none">React Rendezvous</h3>
            <p className="pc-text-xs pc-text-muted-foreground">Ethan Byte</p>
          </div>
        </div>

        <a href="/clients" className="pc-space-y-4">
          <Card
            className="pc-h-[300px] lg:pc-h-[23rem] pc-bg-cover pc-bg-center"
            style={{
              backgroundImage: `url(https://henryegloff.com/media/jess-zhou-three.js-1600x1100.jpg)`,
            }}
          />
          <div className="pc-space-y-1 pc-text-sm">
            <h3 className="pc-font-medium pc-leading-none">React Rendezvous</h3>
            <p className="pc-text-xs pc-text-muted-foreground">Ethan Byte</p>
          </div>
        </a>

        <div className="pc-space-y-4">
          <Card
            className="pc-h-[300px] lg:pc-h-[23rem] pc-bg-cover pc-bg-center"
            style={{
              backgroundImage: `url(https://preview.redd.it/5qmeuaufad091.png?width=1024&format=png&auto=webp&s=0a19529bff9e096879bf5275e502d51ea829f6f6)`,
            }}
          />
          <div className="pc-space-y-1 pc-text-sm">
            <h3 className="pc-font-medium pc-leading-none">React Rendezvous</h3>
            <p className="pc-text-xs pc-text-muted-foreground">Ethan Byte</p>
          </div>
        </div>
      </div>

      <h2 className="pc-text-2xl pc-font-semibold">Recent orders</h2>

      <div className="pc-rounded-md pc-border pc-mb-6">
        <OrdersTable title="Last month orders" />
      </div>
    </div>
  );
};

export const Component = Dashboard;
