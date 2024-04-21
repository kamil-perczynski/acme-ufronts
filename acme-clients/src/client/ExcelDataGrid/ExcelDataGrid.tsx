import { useCallback, useEffect, useRef, useState } from "react";
import DataGrid, { CellSelectArgs, Column, SortColumn } from "react-data-grid";
import { Button } from "@acme/acme-ds";
import { createPortal } from "react-dom";
import { Fullscreen, X } from "lucide-react";

import styles from "./ExcelDataGrid.module.css";

interface Props<T> {
  title: string;
  columns: Column<T>[];
  rows: T[];
  setRows: (rows: T[]) => void;
}

type Selection = [number, number, number, number];

export function ExcelDataGrid<T extends Record<string, unknown>>(
  props: Props<T>
) {
  const { columns, rows, setRows, title } = props;

  const [selectionCoords, setSelection] = useState<Selection>([-1, -1, -1, -1]);

  const selectedCells = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (selectionCoords.includes(-1)) {
      return;
    }
    const [startX, startY, endX, endY] = normalizeSelection(selectionCoords);

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

    return () => {
      selectedCells.current.forEach((el) =>
        el?.removeAttribute("data-highlighted")
      );
    };
  }, [selectionCoords, selectedCells]);

  useEffect(() => {
    const listener = (): void => {
      const [startX, startY, endX, endY] = normalizeSelection(selectionCoords);

      if (selectionCoords.includes(-1)) {
        const rowIdx = startY - 2;
        const colIdx = startX - 1;
        const col = columns[colIdx];

        const cell = rows[rowIdx][col.key];
        navigator.clipboard.writeText(String(cell) ?? "");
        return;
      }

      let currentLine: string[] = [];
      const lines: string[][] = [currentLine];

      for (let j = startY; j <= endY; j++) {
        const rowIdx = j - 2;
        for (let i = startX; i <= endX; i++) {
          const colIdx = i - 1;
          const col = columns[colIdx];

          const cell = rows[rowIdx][col.key];
          currentLine.push(String(cell) ?? "");
        }
        currentLine = [];
        lines.push(currentLine);
      }

      const copiedText = lines
        .map((line) => line.join("\t"))
        .filter((it) => Boolean(it))
        .join("\n");

      navigator.clipboard.writeText(copiedText);
    };

    document.addEventListener("copy", listener);
    return () => document.removeEventListener("copy", listener);
  }, [columns, rows, selectionCoords]);

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

  const handleSelectedCellChanged = (e: CellSelectArgs<T>) => {
    const colIdx = e.column.idx + 1;
    const rowIdx = e.rowIdx + 2;
    if (!isShiftEnabled.current) {
      setSelection([colIdx, rowIdx, -1, -1]);
    }

    if (isShiftEnabled.current) {
      setSelection((current) => [current[0], current[1], colIdx, rowIdx]);
    }
  };

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      pasteExcelDataInRows(e, columns, rows, selectionCoords, setRows);
    },
    [columns, rows, selectionCoords, setRows]
  );

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const redrawSelection = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (selectionCoords.includes(-1)) {
      return;
    }

    timeoutRef.current = setTimeout(() => {
      const [startX, startY, endX, endY] = normalizeSelection(selectionCoords);

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

  const [sortColumns, setSortColumns] = useState<SortColumn[]>([
    { columnKey: "label", direction: "ASC" },
  ]);

  const handleSortColumnsChange = (sortColumns: SortColumn[]) => {
    setSortColumns(sortColumns);
    const [sortedCol] = sortColumns;
    if (!sortedCol) {
      return;
    }
    setSelection([-1, -1, -1, -1]);
    setRows(
      rows.sort((r1, r2) => {
        const value1 = r1[sortedCol.columnKey];
        const value2 = r2[sortedCol.columnKey];

        if (typeof value1 == "number" && typeof value2 == "number") {
          const result = value1 > value2 ? 1 : value1 === value2 ? 0 : -1;
          return sortedCol.direction === "ASC" ? result : -result;
        }

        return sortedCol.direction === "ASC"
          ? String(value1).localeCompare(String(value2))
          : -String(value1).localeCompare(String(value2));
      })
    );
  };

  const [isFullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    redrawSelection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFullScreen]);

  const dataGridEl = (
    <DataGrid
      style={{
        height: isFullScreen ? "90%" : rows.length > 100 ? 1000 : undefined,
      }}
      onRowsChange={setRows}
      onSelectedCellChange={handleSelectedCellChanged}
      sortColumns={sortColumns}
      onSortColumnsChange={handleSortColumnsChange}
      className={`${styles.datagrid} c-select-none ${
        isFullScreen ? "c-border" : ""
      }`}
      columns={columns}
      onScroll={redrawSelection}
      rows={rows}
    />
  );

  return (
    <>
      <div className="c-border c-rounded-md" onPaste={handlePaste}>
        {!isFullScreen && dataGridEl}
        {isFullScreen && (
          <div style={{ minHeight: 1000 }} className="c-bg-muted" />
        )}

        {isFullScreen &&
          createPortal(
            <div className="c-w-screen c-h-screen c-fixed c-z-50 c-bg-background c-top-0 c-left-0">
              <div className="c-flex c-flex-row c-gap-2 c-p-8 c-mb-4 c-justify-between">
                <h2 className="c-text-4xl c-font-semibold c-text-primary">
                  {title}
                </h2>
                <div>
                  <Button
                    size="icon"
                    onClick={() => setFullScreen(false)}
                    variant="ghost"
                  >
                    <X />
                  </Button>
                </div>
              </div>

              {dataGridEl}
            </div>,
            document.body
          )}
      </div>
      <div className="c-flex c-justify-end c-mt-1">
        <Button size="sm" onClick={() => setFullScreen(true)} variant="ghost">
          <Fullscreen size={16} />
          &nbsp; Fullscreen
        </Button>
      </div>
    </>
  );
}

function pasteExcelDataInRows<T extends Record<string, unknown>>(
  e: React.ClipboardEvent<HTMLDivElement>,
  columns: Column<T>[],
  rows: T[],
  selectionCoords: Selection,
  setRows: (rows: T[]) => void
) {
  const incomingText = e.clipboardData.getData("text");
  if (incomingText.includes("\t") || incomingText.includes("\n")) {
    e.preventDefault();
    const grid = incomingText.split("\n").map((line) => line.split("\t"));

    const nextRows = [...rows];

    const [startX, startY] = normalizeSelection(selectionCoords);

    for (const [i, incomingRow] of grid.entries()) {
      const rowIdx = startY + i - 2;
      const row = { ...nextRows[rowIdx] };
      nextRows[rowIdx] = row;

      for (const [j, incomingCell] of incomingRow.entries()) {
        const colKey = columns[startX + j - 1]?.key;
        if (!colKey) {
          continue;
        }

        const row = nextRows[rowIdx] as unknown as Record<string, unknown>;
        row[colKey] = incomingCell;
      }
    }
    setRows(nextRows);
  }
}

function normalizeSelection(selectionCoords: [number, number, number, number]) {
  const [x1, y1, x2, y2] = selectionCoords;

  if (selectionCoords.includes(-1)) {
    return selectionCoords;
  }

  const startX = Math.min(x1, x2);
  const startY = Math.min(y1, y2);
  const endX = Math.max(x1, x2);
  const endY = Math.max(y1, y2);

  return [startX, startY, endX, endY];
}
