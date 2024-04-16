import { useEffect, useState } from "react";
import { BankListItem, fetchBanks } from "../features/companies";
import { Skeleton } from "@acme/acme-ds";
import { useParams } from "react-router-dom";

interface Props {}

export const ClientPage: React.FC<Props> = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const [banks, setBanks] = useState<BankListItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchBanks()
      .then((banks) => setBanks(banks))
      .finally(() => setLoading(false));
  }, []);

  const bank = banks.find((item) => item.id.toString() === clientId);

  if (isLoading) {
    return <Skeleton />;
  }

  if (!bank) {
    return (
      <div>
        <h1 className="c-text-4xl c-font-semibold c-mb-6 c-border-b-[1px] c-border-gray c-pb-2">
          Cannot find client: {clientId}
        </h1>
      </div>
    );
  }

  return (
    <div className="c-flex c-flex-col c-gap-4 c-mt-4 c-lg:mt-12">
      <h1 className="c-text-4xl c-font-semibold c-mb-6 c-border-b-[1px] c-border-gray c-pb-2">
        {bank.name}
      </h1>

      <div>
        <pre>
          <code>{JSON.stringify(bank, undefined, 2)}</code>
        </pre>
      </div>
    </div>
  );
};
