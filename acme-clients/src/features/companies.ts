export interface BankListItem {
  id: number;
  uid: string;
  account_number: string;
  iban: string;
  bank_name: string;
  routing_number: string;
  swift_bic: string;
}

export async function fetchBanks() {
  return fetch("https://random-data-api.com/api/v2/banks?size=60").then((res) =>
    res.json()
  );
}
