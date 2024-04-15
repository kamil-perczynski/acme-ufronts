import React from "react";
import styles from "./Footer.module.css";
import { cn } from "~/lib/utils";
import { Zap } from "lucide-react";
import Link from "next/link";

interface Props {}

export const Footer: React.FC<Props> = (props) => {
  const {} = props;
  return (
    <>
      <div className="lg:mb-[349px] mb-[456px] w-full h-[1px] "></div>
      <div
        className={cn(
          styles.footer,
          "w-full bg-black lg:h-[400px] text-secondary fixed"
        )}
      >
        <div
          className={cn(
            styles.footer,
            "w-full border-t-[1px] border-zinc-800 p-10 lg:p-24 bg-black bottom-[0] flex flex-col lg:flex-row lg:gap-x-10 gap-y-10"
          )}
        >
          <div className="lg:w-[15%]">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Zap className="h-10 w-10" />
              <span className="text-2xl pl-2">Acme Shim Corp.</span>
            </Link>
          </div>
          <div className="lg:w-[250px] mt-2 flex flex-col gap-y-2">
            <h3 className="mb-2 text-lg text-muted font-semibold tracking-tight">
              Our other products
            </h3>

            <Link className="text-sm hover:underline" href="/product-catalog">
              Orders
            </Link>
            <Link className="text-sm hover:underline" href="/product-catalog">
              Products
            </Link>
            <Link className="text-sm hover:underline" href="/clients">
              Clients
            </Link>
            <Link className="text-sm hover:underline" href="/product-catalog">
              Analytics
            </Link>
          </div>
          <div className="lg:w-[250px] mt-2 flex flex-col gap-y-2">
            <h3 className="mb-2 text-lg text-muted font-semibold tracking-tight">
              Services
            </h3>

            <Link className="text-sm hover:underline" href="/product-catalog">
              Products
            </Link>
            <Link className="text-sm hover:underline" href="/product-catalog">
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
