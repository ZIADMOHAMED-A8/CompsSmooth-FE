"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { RecentCompsPagination as Pagination } from "../../types/recentComps.types";

interface RecentCompsPaginationProps {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

export function RecentCompsPagination({
  pagination,
  onPageChange,
}: RecentCompsPaginationProps) {
  return (
    <div className="flex items-center justify-between border-t border-[#e6e9ed] px-4 py-3">
      <p className="text-[8px] text-[#9099a6]">
        Page {pagination.page} of{" "}
        {pagination.totalPages || 1}
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={!pagination.hasPreviousPage}
          onClick={() =>
            onPageChange(pagination.page - 1)
          }
          className="flex h-6 w-6 items-center justify-center rounded-[3px] border border-[#dce2e8] text-[#687382] transition-colors hover:bg-[#f7f8fa] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={11} />
        </button>

        <button
          type="button"
          disabled={!pagination.hasNextPage}
          onClick={() =>
            onPageChange(pagination.page + 1)
          }
          className="flex h-6 w-6 items-center justify-center rounded-[3px] border border-[#dce2e8] text-[#687382] transition-colors hover:bg-[#f7f8fa] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight size={11} />
        </button>
      </div>
    </div>
  );
}