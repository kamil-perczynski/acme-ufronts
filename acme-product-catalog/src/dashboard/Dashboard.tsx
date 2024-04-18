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
      <div className="pc-grid pc-grid-cols[1fr] lg:pc-grid-cols-[1fr_1fr_1fr] pc-gap-6 pc-h-[900px] lg:pc-h-[23rem]">
        <Card
          style={{
            background: `url(https://threejs.org/examples/screenshots/webgl_instancing_dynamic.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
          }}
        >
          Boo
        </Card>
        <Card
          style={{
            background: `url(https://henryegloff.com/media/jess-zhou-three.js-1600x1100.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
          }}
        >
          Foo
        </Card>
        <Card
          className="pc-shadow-md"
          style={{
            background: `url(https://preview.redd.it/5qmeuaufad091.png?width=1024&format=png&auto=webp&s=0a19529bff9e096879bf5275e502d51ea829f6f6)`,
            backgroundSize: "cover",
            backgroundPosition: "50% 50%",
          }}
        >
          Foo
        </Card>
      </div>

      <h2 className="pc-text-2xl pc-font-semibold">Recent orders</h2>

      <div className="pc-rounded-md pc-border pc-mb-6">
        <OrdersTable title="Last month orders" />
      </div>
    </div>
  );
};
