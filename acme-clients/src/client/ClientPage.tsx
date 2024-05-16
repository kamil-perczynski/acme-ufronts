import { BankListItem, fetchBanks } from "../features/companies";
import { Params, useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import { Column, textEditor } from "react-data-grid";

import { usageCols, usageRows } from "./data";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  GridColumn,
  ExcelDataGrid,
} from "@acme/acme-ds";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { DollarSign, GaugeCircle } from "lucide-react";
import { UsageChart } from "../clients/UsageChart/UsageChart";

const nf = new Intl.NumberFormat();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: GridColumn<any>[] = [
  {
    key: "label",
    name: "#",
    editable: false,
    resizable: false,
    draggable: false,
    frozen: true,
    sortable: true,
    width: 40,
  },
  ...usageCols.map(
    (col) =>
      ({
        key: col.key,
        isNumeric: col.isNumeric,
        name: col.name,
        sortable: true,
        minWidth: 150,
        draggable: false,
        cellClass: col.isNumeric
          ? (row) => {
              const rawValue = row[col.key];
              const numericValue = Number(rawValue);

              if (isNaN(numericValue)) {
                return undefined;
              }

              return "c-text-right";
            }
          : undefined,
        renderCell: col.isNumeric
          ? (props) => {
              const rawValue = props.row[props.column.key];
              const numericValue = Number(rawValue);

              if (isNaN(numericValue)) {
                return rawValue;
              }

              return nf.format(numericValue);
            }
          : undefined,
        renderEditCell: textEditor,
        resizable: true,
        editorOptions: {
          displayCellContent: true,
        },
      } as Column<Record<string, unknown>>)
  ),
];

const initialRows = usageRows.map((row, i) => ({
  label: i + 1,
  ...row,
}));

interface Props {}

export const ClientPage: React.FC<Props> = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const bank = useLoaderData() as BankListItem;

  const [rows, setRows] = useState(initialRows);

  const currentAddress = bank.addresses[0];

  if (!bank) {
    return (
      <div>
        <h1 className="c-text-4xl c-font-semibold c-mb-6 c-border-b-[1px] c-border-gray c-pb-2">
          Cannot find client: {clientId}
        </h1>
      </div>
    );
  }

  const latlng: [number, number] = [
    51 + (currentAddress.latitude % 10),
    18 + (currentAddress.latitude % 10),
  ];

  return (
    <div className="c-flex c-flex-col c-gap-8 c-mt-4 c-lg:mt-12 c-pb-10">
      <h1 className="c-text-4xl c-font-semibold c-mb-2 c-border-b-[1px] c-border-gray c-pb-2">
        {bank.name}
      </h1>

      <div className="c-flex c-flex-col lg:c-flex-row c-gap-4">
        <div className="c-rounded-xl c-w-full c-border c-bg-card c-text-card-foreground c-shadow">
          <div className="c-p-6 flex c-flex-row c-items-center c-justify-between c-space-y-0 c-pb-2">
            <h3 className="c-tracking-tight c-text-sm c-font-medium">
              Upcoming invoice
            </h3>
            <DollarSign stroke="hsl(var(--accent))" />
          </div>

          <div className="c-p-6 c-pt-0">
            <div className="c-text-2xl c-text-primary c-font-bold">
              $45,231.89
            </div>
            <p className="c-text-xs c-text-muted-foreground">
              +20.1% from last month
            </p>
          </div>
        </div>

        <div className="c-rounded-xl c-w-full c-border c-bg-card c-text-card-foreground c-shadow">
          <div className="c-p-6 flex c-flex-row c-items-center c-justify-between c-space-y-0 c-pb-2">
            <h3 className="c-tracking-tight c-text-sm c-font-medium">
              Total API requests
            </h3>
            <GaugeCircle stroke="hsl(var(--accent))" />
          </div>
          <div className="c-p-6 c-pt-0">
            <div className="c-text-2xl c-text-primary c-font-bold">
              ~915,231
            </div>
            <p className="c-text-xs c-text-muted-foreground">
              +24.21% from last month
            </p>
          </div>
        </div>
      </div>

      <h3 className="c-tracking-tight c-text-2xl c-font-semibold">
        Usage data
      </h3>

      <Tabs defaultValue="chart">
        <TabsList>
          <TabsTrigger className="lg:c-w-[320px]" value="chart">
            Usage chart
          </TabsTrigger>
          <TabsTrigger className="lg:c-w-[320px]" value="report">
            API usage report
          </TabsTrigger>
        </TabsList>
        <TabsContent value="chart" className="c-pt-4">
          <UsageChart />
        </TabsContent>
        <TabsContent value="report" className="c-pt-4">
          <ExcelDataGrid
            title="API usage report"
            columns={columns}
            rows={rows}
            setRows={setRows}
            fullscreenPortal={() =>
              document.getElementById("@acme/acme-clients")!
            }
          />
        </TabsContent>
      </Tabs>

      <h3 className="c-tracking-tight c-text-2xl c-font-semibold">
        Client information
      </h3>
      <div className="c-border c-rounded-md">
        <Table className="c-table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className="c-w-[250px]">-</TableHead>
              <TableHead className="c-w-[750px]">-</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Client name</TableCell>
              <TableCell className="c-font-medium">{bank.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Identifier</TableCell>
              <TableCell className="c-font-medium">{bank.id}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell className="c-font-medium">{bank.country}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>E-Mail</TableCell>
              <TableCell className="c-font-medium">{bank.email}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Phone</TableCell>
              <TableCell className="c-font-medium">{bank.phone}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>VAT ID</TableCell>
              <TableCell className="c-font-medium">{bank.vat}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Country</TableCell>
              <TableCell className="c-font-medium">
                {currentAddress.country}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell className="c-font-medium">
                {currentAddress.street}, {currentAddress.city}{" "}
                {currentAddress.zipcode}, {currentAddress.county_code}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Website</TableCell>
              <TableCell className="c-font-medium">
                <a
                  rel="nofollow"
                  target="_blank"
                  className="hover:underline"
                  href={bank.website}
                >
                  {bank.website}
                </a>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <MapContainer
        className="c-rounded-md c-border c-hue-rotate-[266deg]"
        style={{ width: "100%", height: 400 }}
        center={latlng}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          className="c-grayscale c-invert"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={latlng}>
          <Popup>{currentAddress.street}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export const Component = ClientPage;

export const loader = ({ params }: { params: Params }) =>
  fetchBanks().then((banks) =>
    banks.find((bank) => String(bank.id) === params.clientId)
  );
