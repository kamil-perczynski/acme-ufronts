import { Button } from "@acme/acme-ds";
import { CheckCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

interface Props {}

export const CreatePurchaseSummaryPage: React.FC<Props> = () => {
  return (
    <div className="pc-w-full pc-flex pc-flex-col pc-gap-4 pc-mt-16 lg:pc-max-w-[600px] pc-self-center">
      <div className="pc-self-center">
        <CheckCircle size={56} />
      </div>

      <p className="text-sm pc-font-semibold pc-text-slate-700">
        Purchase created successfully
      </p>

      <p className="text-sm pc-text-slate-500">
        Congratulations! Your purchase is now registered and will be processed
        soon. 📦
      </p>

      <div className="pc-flex pc-justify-between pc-mt-2">
        <Button size="sm" asChild>
          <Link to="/product-catalog/orders">Orders list</Link>
        </Button>
      </div>
    </div>
  );
};

export const Component = CreatePurchaseSummaryPage;
