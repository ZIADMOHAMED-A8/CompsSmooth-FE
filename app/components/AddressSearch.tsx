"use client";

import { useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import { useSearchAddress } from "../hooks/useSearchAddress";

export function AddressSearch() {
  const [address, setAddress] = useState("");

  const searchAddress = useSearchAddress();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const trimmedAddress = address.trim();

    if (!trimmedAddress) return;

    searchAddress.mutate({
      address: trimmedAddress,
    });
  }

  return (
    <section className="rounded-[4px] border border-[#dce2e8] bg-white p-5">
      <div className="mb-4">
        <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#d97706]">
          Algorithmic Valuation Engine
        </p>

        <h2 className="mt-1 text-[16px] font-semibold tracking-tight text-[#18212f]">
          Underwrite any commercial or residential parcel in seconds
        </h2>

        <p className="mt-1 text-[9px] text-[#8a94a1]">
          Enter a property address to begin the valuation analysis.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex h-10 overflow-hidden rounded-[4px] border border-[#cfd7df] bg-white focus-within:border-[#c96a00]">
          <div className="flex flex-1 items-center gap-2 px-3">
            <Search
              size={14}
              className="shrink-0 text-[#c96a00]"
            />

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter parcel number, street address, or natural language search..."
              className="w-full bg-transparent text-[10px] text-[#263241] outline-none placeholder:text-[#a0a8b2]"
            />
          </div>

          <button
            type="submit"
            disabled={
              !address.trim() || searchAddress.isPending
            }
            className="
              flex w-[92px]
              items-center justify-center gap-1.5
              bg-[#c96a00]
              text-[9px] font-semibold
              text-white
              transition
              hover:bg-[#b75f00]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {searchAddress.isPending ? (
              "Searching..."
            ) : (
              <>
                Query
                <ArrowRight size={11} />
              </>
            )}
          </button>
        </div>
      </form>

      {searchAddress.isError && (
        <p className="mt-2 text-[9px] text-red-500">
          {searchAddress.error.message}
        </p>
      )}
    </section>
  );
}