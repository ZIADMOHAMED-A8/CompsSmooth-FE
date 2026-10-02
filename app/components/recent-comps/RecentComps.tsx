"use client";

import { useState } from "react";

import { useRecentComps } from "../../hooks/useRecentComps";

import { RecentCompsEmpty } from "./RecentCompsEmpty";
import { RecentCompsPagination } from "./RecentCompsPagination";
import { RecentCompsSkeleton } from "./RecentCompsSkeleton";

interface RecentCompsProps {
  limit?: number;
}

export function RecentComps({
  limit = 20,
}: RecentCompsProps) {
  const [page, setPage] = useState(1);

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
  } = useRecentComps(page, limit);

  const properties = data?.data.properties ?? [];
  const pagination = data?.data.pagination;

  return (
    <section className="overflow-hidden rounded-[4px] border border-[#dce2e8] bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#e6e9ed] px-4 py-3">
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#d97706]">
            Recent Comps
          </p>

          <h3 className="mt-1 text-[13px] font-semibold text-[#18212f]">
            Recent Properties
          </h3>

          <p className="mt-0.5 text-[8px] text-[#9099a6]">
            Your recently analyzed properties
          </p>
        </div>

        {isFetching && !isLoading && (
          <span className="text-[8px] text-[#9099a6]">
            Loading...
          </span>
        )}
      </div>

      {/* Initial Loading */}
      {isLoading && <RecentCompsSkeleton />}

      {/* Error */}
      {isError && !isLoading && (
        <div className="px-4 py-8 text-center">
          <p className="text-[9px] text-red-500">
            {error instanceof Error
              ? error.message
              : "Failed to load recent comps."}
          </p>
        </div>
      )}

      {/* Empty */}
      {!isLoading &&
        !isError &&
        properties.length === 0 && (
          <RecentCompsEmpty />
        )}

      {/* Properties */}
      {!isLoading &&
        !isError &&
        properties.length > 0 && (
          <>
            <div className="divide-y divide-[#edf0f3]">
              {properties.map((property, index) => (
                <RecentCompRow
                  key={
                    typeof property.id === "string"
                      ? property.id
                      : index
                  }
                  property={property}
                />
              ))}
            </div>

            {pagination && (
              <RecentCompsPagination
                pagination={pagination}
                onPageChange={setPage}
              />
            )}
          </>
        )}
    </section>
  );
}

/* ---------------------------------- */
/* Temporary Row */
/* ---------------------------------- */
function RecentCompRow({
  property,
}: {
  property: Record<string, unknown>;
}) {
  const address =
    typeof property.address === "string"
      ? property.address
      : "Unknown address";

  const beds =
    typeof property.beds === "number"
      ? property.beds
      : null;

  const baths =
    typeof property.baths === "number"
      ? property.baths
      : null;

  const mao =
    typeof property.mao === "number"
      ? property.mao
      : null;

  return (
    <div className="px-4 py-3 transition-colors hover:bg-[#fafbfc]">
      <div className="flex items-center justify-between gap-6">
        {/* Property Info */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-semibold text-[#263241]">
            {address}
          </p>

          <div className="mt-1.5 flex items-center gap-3">
            <PropertyMeta
              label="Beds"
              value={beds !== null ? String(beds) : "—"}
            />

            <div className="h-2.5 w-px bg-[#e1e5e9]" />

            <PropertyMeta
              label="Baths"
              value={baths !== null ? String(baths) : "—"}
            />
          </div>
        </div>

        {/* MAO */}
        <div className="shrink-0 text-right">
          <p className="text-[7px] font-semibold uppercase tracking-[0.08em] text-[#9099a6]">
            MAO
          </p>

          <p className="mt-0.5 text-[13px] font-semibold text-[#18212f]">
            {mao !== null
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                }).format(mao)
              : "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

function PropertyMeta({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-1">
      <span className="text-[8px] text-[#9099a6]">
        {label}
      </span>

      <span className="text-[9px] font-medium text-[#4b5563]">
        {value}
      </span>
    </div>
  );
}