import { BankListItem, fetchBanks } from "../features/companies";
import { Params, useLoaderData, useParams } from "react-router-dom";

interface Props {}

export const ClientPage: React.FC<Props> = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const bank = useLoaderData() as BankListItem;

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

export const Component = ClientPage;
export const loader = ({ params }: { params: Params }) =>
  fetchBanks().then((banks) =>
    banks.find((bank) => String(bank.id) === params.clientId)
  );
