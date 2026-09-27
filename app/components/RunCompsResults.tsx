"use client";

import { ExternalLink, MapPin } from "lucide-react";

import { RunCompsResponse, ComparableProperty } from "../types/runComps.types";

interface RunCompsResultsProps {
  result: RunCompsResponse;
}

function formatCurrency(value: number | null) {
  if (value === null) return "—";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number | null) {
  if (value === null) return "—";

  return new Intl.NumberFormat("en-US").format(value);
}

export function RunCompsResults({
  result,
}: RunCompsResultsProps) {
  const { property, comps } = result;

  return (
    <section className="mt-4 overflow-hidden rounded-[4px] border border-[#dce2e8] bg-white">
      {/* Header */}
      <div className="border-b border-[#e6e9ed] px-4 py-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#d97706]">
              Valuation Result
            </p>

            <h3 className="mt-1 text-[13px] font-semibold text-[#18212f]">
              {property.address}
            </h3>

            <div className="mt-1 flex items-center gap-1 text-[8px] text-[#8a94a1]">
              <MapPin size={9} />
              {property.city}, {property.state} {property.zip}
            </div>
          </div>

          <span className="rounded-full bg-[#eef7f1] px-2 py-1 text-[8px] font-semibold text-[#178848]">
            {comps.confidence.label} CONFIDENCE
          </span>
        </div>
      </div>

      {/* ARV Summary */}
      <div className="grid grid-cols-3 gap-px border-b border-[#e6e9ed] bg-[#e6e9ed]">
        <SummaryCard
          label="ARV Low"
          value={formatCurrency(comps.arv.low)}
        />

        <SummaryCard
          label="Median ARV"
          value={formatCurrency(comps.arv.median)}
          highlighted
        />

        <SummaryCard
          label="ARV High"
          value={formatCurrency(comps.arv.high)}
        />
      </div>

      {/* Property + Analysis */}
      <div className="grid grid-cols-2 gap-4 border-b border-[#e6e9ed] p-4">
        {/* Subject Property */}
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-wide text-[#9099a6]">
            Subject Property
          </p>

          <div className="mt-2 grid grid-cols-3 gap-3">
            <PropertyStat
              label="Beds"
              value={String(comps.subject.beds)}
            />

            <PropertyStat
              label="Baths"
              value={String(comps.subject.baths)}
            />

            <PropertyStat
              label="Sq Ft"
              value={formatNumber(comps.subject.sqft)}
            />
          </div>
        </div>

        {/* Analysis */}
        <div>
          <p className="text-[8px] font-semibold uppercase tracking-wide text-[#9099a6]">
            Analysis
          </p>

          <div className="mt-2 grid grid-cols-3 gap-3">
            <PropertyStat
              label="Comps Used"
              value={String(comps.comps_used)}
            />

            <PropertyStat
              label="Radius"
              value={`${comps.search.radius_miles} mi`}
            />

            <PropertyStat
              label="Lookback"
              value={`${comps.search.days} days`}
            />
          </div>
        </div>
      </div>

      {/* Comparable Properties */}
      <div>
        <div className="flex items-center justify-between border-b border-[#e6e9ed] px-4 py-3">
          <div>
            <h4 className="text-[10px] font-semibold text-[#263241]">
              Comparable Properties
            </h4>

            <p className="mt-0.5 text-[8px] text-[#9099a6]">
              {comps.comps_used} properties used in valuation
            </p>
          </div>

          <span className="text-[8px] text-[#9099a6]">
            {comps.search.radius_miles} mi radius
          </span>
        </div>

        <div className="divide-y divide-[#edf0f3]">
          {comps.comps.map((comp) => (
            <CompRow
              key={comp.property_id}
              comp={comp}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- */
/* Summary Card */
/* ---------------------------------- */

function SummaryCard({
  label,
  value,
  highlighted = false,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`px-4 py-3 ${
        highlighted ? "bg-[#fffaf3]" : "bg-white"
      }`}
    >
      <p className="text-[8px] font-medium text-[#9099a6]">
        {label}
      </p>

      <p
        className={`mt-1 text-[14px] font-semibold ${
          highlighted ? "text-[#c46d00]" : "text-[#18212f]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Property Stat */
/* ---------------------------------- */

function PropertyStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[8px] text-[#9099a6]">
        {label}
      </p>

      <p className="mt-0.5 text-[10px] font-semibold text-[#263241]">
        {value}
      </p>
    </div>
  );
}

/* ---------------------------------- */
/* Comparable Row */
/* ---------------------------------- */

function CompRow({
  comp,
}: {
  comp: ComparableProperty;
}) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h5 className="truncate text-[10px] font-semibold text-[#263241]">
              {comp.formatted_address}
            </h5>

            {comp.property_url && (
              <a
                href={comp.property_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-[#9099a6] transition-colors hover:text-[#d97706]"
              >
                <ExternalLink size={10} />
              </a>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[8px] text-[#9099a6]">
            <span>
              {comp.beds} beds
            </span>

            <span>
              {comp.full_baths} baths
            </span>

            <span>
              {formatNumber(comp.sqft)} sqft
            </span>

            <span>
              {comp.distance_miles.toFixed(2)} mi
            </span>

            {comp.year_built && (
              <span>
                Built {comp.year_built}
              </span>
            )}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[10px] font-semibold text-[#18212f]">
            {formatCurrency(comp.sold_price)}
          </p>

          <p className="mt-0.5 text-[8px] text-[#9099a6]">
            {comp.price_per_sqft
              ? `$${Math.round(comp.price_per_sqft)}/sqft`
              : "—"}
          </p>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between">
        <span className="text-[8px] text-[#9099a6]">
          {comp.status}
          {comp.sale_date
            ? ` · ${new Date(comp.sale_date).toLocaleDateString()}`
            : ""}
        </span>

        <span className="text-[8px] font-medium text-[#6f7a87]">
          Score {comp.score.toFixed(1)}
        </span>
      </div>
    </div>
  );
}