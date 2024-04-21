import { BankListItem, fetchBanks } from "../features/companies";
import { Params, useLoaderData, useParams } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import DataGrid, { CellSelectArgs, Column, textEditor } from "react-data-grid";

import styles from "./ClientPage.module.css";

const columns: Column<Row>[] = [
  {
    key: "label",
    name: "#",
    editable: false,
    sortable: false,
    resizable: false,
    draggable: false,
    frozen: true,
  },
  ...new Array(20).fill(0).map(
    (_, i) =>
      ({
        key: "col" + i,
        name: String.fromCharCode("A".charCodeAt(0) + i),
        sortable: true,
        width: 150,
        draggable: true,
        renderEditCell: textEditor,
        resizable: true,
        editorOptions: {
          displayCellContent: true,
        },
      } as Column<Row>)
  ),
];

interface Row {
  label: string;
  col0: string;
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
  col6: string;
  col7: string;
  col8: string;
  col9: string;
  col10: string;
  col11: string;
  col12: string;
  col13: string;
  col14: string;
  col15: string;
  col16: string;
  col17: string;
  col18: string;
  col19: string;
}

const initialRows: Row[] = new Array(100).fill(0).map((_, i) => ({
  label: String(i + 1),
  col0: "---",
  col1: "---",
  col2: "---",
  col3: "---",
  col4: "---",
  col5: "---",
  col6: "---",
  col7: "---",
  col8: "---",
  col9: "---",
  col10: "---",
  col11: "---",
  col12: "---",
  col13: "---",
  col14: "---",
  col15: "---",
  col16: "---",
  col17: "---",
  col18: "---",
  col19: "---",
}));

interface Props {}

export const ClientPage: React.FC<Props> = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const bank = useLoaderData() as BankListItem;

  const [rows, setRows] = useState(initialRows);

  const [selectionCoords, setSelection] = useState<
    [number, number, number, number]
  >([-1, -1, -1, -1]);

  const selectedCells = useRef<HTMLElement[]>([]);
  useEffect(() => {
    if (selectionCoords.includes(-1)) {
      return;
    }
    const [x1, y1, x2, y2] = selectionCoords;
    const startX = Math.min(x1, x2);
    const endX = Math.max(x1, x2);
    const startY = Math.min(y1, y2);
    const endY = Math.max(y1, y2);

    const cells: HTMLElement[] = [];
    for (let i = startX; i <= endX; i++) {
      for (let j = startY; j <= endY; j++) {
        const el = document.querySelector(
          `[aria-rowindex="${j}"] [aria-colindex="${i}"]`
        );
        cells.push(el as unknown as HTMLElement);
      }
    }

    cells.forEach((el) => el?.setAttribute("data-highlighted", "true"));
    selectedCells.current = cells;

    const listener = (): void => {
      let currentLine: string[] = [];
      const lines: string[][] = [currentLine];

      for (let j = startY; j <= endY; j++) {
        for (let i = startX; i <= endX; i++) {
          const el = document.querySelector(
            `[aria-rowindex="${j}"] [aria-colindex="${i}"]`
          );
          currentLine.push(el?.textContent?.trim() ?? "");
        }
        currentLine = [];
        lines.push(currentLine);
      }

      const newLocal = lines
        .map((line) => line.join("\t"))
        .filter((it) => Boolean(it))
        .join("\n");
      console.log('"', newLocal, '"');
      navigator.clipboard.writeText(newLocal);
    };
    document.addEventListener("copy", listener);
    return () => {
      selectedCells.current.forEach((el) =>
        el?.removeAttribute("data-highlighted")
      );
      document.removeEventListener("copy", listener);
    };
  }, [selectionCoords, selectedCells]);

  const isShiftEnabled = useRef<boolean>();

  useEffect(() => {
    const listener = (e: KeyboardEvent): void => {
      isShiftEnabled.current = e.shiftKey;
    };
    document.addEventListener("keydown", listener);
    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("keydown", listener);
      document.removeEventListener("keyup", listener);
    };
  }, [isShiftEnabled]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleSelectedCellChanged = (e: CellSelectArgs<Row>) => {
    const colIdx = e.column.idx + 1;
    const rowIdx = e.rowIdx + 2;
    if (!isShiftEnabled.current) {
      setSelection([colIdx, rowIdx, -1, -1]);
    }

    if (isShiftEnabled.current) {
      setSelection((current) => [current[0], current[1], colIdx, rowIdx]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const incomingText = e.clipboardData.getData("text");
    if (incomingText.includes("\t") || incomingText.includes("\n")) {
      e.preventDefault();
      const grid = incomingText.split("\n").map((line) => line.split("\t"));

      const nextRows = [...rows];

      const [x1, y1, x2, y2] = selectionCoords;
      const startX = x2 === -1 ? x1 : Math.min(x1, x2);
      const startY = y2 === -1 ? y1 : Math.min(y1, y2);

      for (const [i, incomingRow] of grid.entries()) {
        const rowIdx = startY + i - 2;
        const row = { ...nextRows[rowIdx] };
        nextRows[rowIdx] = row;

        for (const [j, incomingCell] of incomingRow.entries()) {
          const colKey = columns[startX + j - 1].key;

          nextRows[rowIdx][colKey as keyof Row] = incomingCell;
        }
      }
      setRows(nextRows);
    }
  };

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const redrawSelection = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (selectionCoords.includes(-1)) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      const [x1, y1, x2, y2] = selectionCoords;
      const startX = Math.min(x1, x2);
      const endX = Math.max(x1, x2);
      const startY = Math.min(y1, y2);
      const endY = Math.max(y1, y2);

      const cells: HTMLElement[] = [];
      for (let i = startX; i <= endX; i++) {
        for (let j = startY; j <= endY; j++) {
          const el = document.querySelector(
            `[aria-rowindex="${j}"] [aria-colindex="${i}"]`
          );
          cells.push(el as unknown as HTMLElement);
        }
      }

      cells.forEach((el) => el?.setAttribute("data-highlighted", "true"));
      selectedCells.current = cells;
    }, 30);
  }, [timeoutRef, selectionCoords]);

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

      <div
        className="c-border c-rounded-md"
        style={{ userSelect: "none" }}
        onPaste={handlePaste}
      >
        <DataGrid
          style={{ height: 800, position: "relative" }}
          onRowsChange={setRows}
          onSelectedCellChange={handleSelectedCellChanged}
          sortColumns={[{ columnKey: "col1", direction: "ASC" }]}
          className={`${styles.datagrid}`}
          columns={columns}
          onScroll={redrawSelection}
          rows={rows}
        />
      </div>
    </div>
  );
};

export const Component = ClientPage;
export const loader = ({ params }: { params: Params }) =>
  fetchBanks().then((banks) =>
    banks.find((bank) => String(bank.id) === params.clientId)
  );
