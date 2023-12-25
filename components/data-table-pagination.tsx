
'use client'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
}  from "lucide-react"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"


interface DataTablePaginationProps<TData> {
  table: Table<TData>,
  setPageIndex?: (pageIndex: number) => void,
  pageIndex?:number,
  total?:number
}
const pageCount = 10;
export function DataTablePagination<TData>({
  table,
  setPageIndex,
  pageIndex=0,
  total=0
}: DataTablePaginationProps<TData>) {

  const canPreviousPage = pageIndex>0;
  const canNextPage = pageIndex < Math.ceil(total/pageCount) -1;
  return (
    <div className="flex items-center justify-between px-2">

      <div className="flex-1 text-sm text-muted-foreground">
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">

        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of{" "}
          {Math.ceil(total/pageCount)}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex&& setPageIndex(0)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>  setPageIndex&&setPageIndex(pageIndex-1)}
            disabled={!canPreviousPage}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>  setPageIndex&&setPageIndex(pageIndex+1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>  setPageIndex&&setPageIndex(Math.ceil(total/pageCount) - 1)}
            disabled={!canNextPage}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
