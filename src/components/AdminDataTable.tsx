"use client";

import { TableHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useMemo } from "react";

export interface Column<T> {
  key: string;
  header: string;
  accessor: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyAccessor: (item: T) => string;
  className?: string;
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
  actions?: (item: T) => React.ReactNode;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  onSort?: (key: string, order: "asc" | "desc") => void;
  selectable?: boolean;
  selectedKeys?: Set<string>;
  onSelectionChange?: (keys: Set<string>) => void;
}

function DataTable<T>({
  columns,
  data,
  keyAccessor,
  className,
  emptyMessage = "No data available",
  onRowClick,
  actions,
  sortBy,
  sortOrder,
  onSort,
  selectable,
  selectedKeys,
  onSelectionChange,
}: DataTableProps<T>) {
  const [localSortBy, setLocalSortBy] = useState(sortBy);
  const [localSortOrder, setLocalSortOrder] = useState<"asc" | "desc">(sortOrder || "asc");

  const handleSort = (key: string) => {
    const column = columns.find((c) => c.key === key);
    if (!column?.sortable) return;

    let newOrder: "asc" | "desc" = "asc";
    if (localSortBy === key) {
      newOrder = localSortOrder === "asc" ? "desc" : "asc";
    }
    setLocalSortBy(key);
    setLocalSortOrder(newOrder);
    onSort?.(key, newOrder);
  };

  const sortedData = useMemo(() => {
    if (!localSortBy) return data;
    return [...data].sort((a, b) => {
      const column = columns.find((c) => c.key === localSortBy);
      if (!column) return 0;

      const aVal = column.accessor(a);
      const bVal = column.accessor(b);

      const aStr = typeof aVal === "string" ? aVal : String(aVal);
      const bStr = typeof bVal === "string" ? bVal : String(bVal);

      return localSortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [data, columns, localSortBy, localSortOrder]);

  const isAllSelected = selectable && data.length > 0 && selectedKeys?.size === data.length;
  const isIndeterminate = selectable && selectedKeys && selectedKeys.size > 0 && selectedKeys.size < data.length;

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (isAllSelected) {
      onSelectionChange(new Set());
    } else {
      onSelectionChange(new Set(data.map(keyAccessor)));
    }
  };

  const handleSelectRow = (key: string) => {
    if (!onSelectionChange) return;
    const newSelection = new Set(selectedKeys);
    if (newSelection.has(key)) {
      newSelection.delete(key);
    } else {
      newSelection.add(key);
    }
    onSelectionChange(newSelection);
  };

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full caption-bottom text-sm" role="grid">
        <thead className="[&_tr]:border-b">
          <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
            {selectable && (
              <th className="h-12 px-4 text-left align-middle">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn(
                  "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
                  column.sortable && "cursor-pointer select-none hover:bg-muted/50",
                  column.className
                )}
                onClick={() => column.sortable && handleSort(column.key)}
                style={{ userSelect: column.sortable ? "none" : "auto" }}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {column.sortable && localSortBy === column.key && (
                    localSortOrder === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  )}
                </div>
              </th>
            ))}
            {actions && <th className="h-12 px-4 text-right align-middle">Actions</th>}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            sortedData.map((item) => {
              const key = keyAccessor(item);
              const isSelected = selectedKeys?.has(key);
              return (
                <tr
                  key={key}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
                    onRowClick && "cursor-pointer",
                    isSelected && "bg-primary/5"
                  )}
                  onClick={() => onRowClick?.(item)}
                  data-state={isSelected ? "selected" : undefined}
                >
                  {selectable && (
                    <td className="p-4 align-middle">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectRow(key)}
                        onClick={(e) => e.stopPropagation()}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn("p-4 align-middle", column.className)}
                    >
                      {column.accessor(item)}
                    </td>
                  ))}
                  {actions && (
                    <td className="p-4 align-middle text-right">
                      {actions(item)}
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export { DataTable as AdminDataTable };