import React, { useState } from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Button,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  Input,
  DropdownMenuCheckboxItem,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Checkbox,
} from "@acme/acme-ds";
import { BankListItem } from "../features/companies";
import { Link } from "react-router-dom";

const columnNames: Record<string, string> = {
  name: "Company name",
  email: "E-mail",
  phone: "Phone",
  vat: "VAT",
};

export const columns: ColumnDef<BankListItem>[] = [
  {
    id: "select",
    size: 35,
    header: ({ table }) => (
      <Checkbox
        className="c-block"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="c-block"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    size: 420,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company Name
          <CaretSortIcon className="c-ml-2 c-h-4 c-w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">
        <Link className="hover:c-underline" to={`/clients/${row.original.id}`}>
          {row.getValue("name")}
        </Link>
      </div>
    ),
  },
  {
    size: 210,
    accessorKey: "email",
    header: () => <div>E-mail</div>,
    cell: ({ row }) => {
      return <div className="c-font-medium">{row.getValue("email")}</div>;
    },
  },
  {
    size: 150,
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div className="c-flex c-justify-end">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Phone
            <CaretSortIcon className="c-ml-2 c-h-4 c-w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="c-text-right c-font-medium">
          {row.getValue("phone")}
        </div>
      );
    },
  },
  {
    size: 120,
    accessorKey: "vat",
    header: () => <div className="c-text-right">VAT</div>,
    cell: ({ row }) => {
      return (
        <div className="c-text-right c-font-medium">{row.getValue("vat")}</div>
      );
    },
  },
  {
    size: 40,
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const bank = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="c-h-8 c-w-8 c-p-0">
              <DotsHorizontalIcon className="c-h-4 c-w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(bank.vat)}
            >
              Copy VAT
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const ClientsListView: React.FC<{ banks: BankListItem[] }> = (props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const table = useReactTable({
    data: props.banks,
    columns,
    defaultColumn: {
      minSize: 10,
      size: 100,
      maxSize: 600,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      pagination,
      globalFilter,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="c-w-full c-flex c-flex-col c-gap-4 c-pb-24">
      <div className="c-flex c-items-center c-gap-y-4">
        <Input
          placeholder="Filter rows..."
          value={globalFilter}
          onChange={(event) => {
            setGlobalFilter(event.target.value);
          }}
          className="c-max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="c-ml-auto">
              Columns <ChevronDownIcon className="c-ml-2 c-h-4 c-w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="c-capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {columnNames[column.id]}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="c-rounded-md c-border">
        <Table className="c-table-fixed">
          <TableHeader className="bg-background">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      style={{ width: header.getSize() }}
                      key={header.id}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="c-h-24 c-text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="c-flex c-items-center c-justify-end c-space-x-2 c-gap-y-4">
        <div className="c-flex-1 c-text-sm c-text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected. Page&nbsp;
          {pagination.pageIndex + 1} of {table.getPageCount()}.
        </div>
        <div className="c-space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
