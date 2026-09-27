"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import {
    runCompsSchema,
    RunCompsFormValues,
} from "../schemas/runCompsSchema";
import { useSearchAddress } from "../hooks/useSearchAddress";
import { RunCompsResults } from "./RunCompsResults";
import { RunCompsResultsSkeleton } from "./RunCompsResultsSkeleton";



export function RunCompsForm() {
    const runComps = useSearchAddress();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RunCompsFormValues>({
        resolver: zodResolver(runCompsSchema),

        defaultValues: {
            address: "",
            repairs: 0,
            buying_costs: 0,
            holding_costs: 0,
            selling_costs: 0,
            desired_profit: 0,
        },
    });

    function onSubmit(data: RunCompsFormValues) {
        runComps.mutate(data);
    }

    return (
        <section className="rounded-[4px] border border-[#dce2e8] bg-white p-5">
            {/* Header */}
            <div className="mb-4">
                <p className="text-[8px] font-semibold uppercase tracking-[0.08em] text-[#d97706]">
                    Algorithmic Valuation Engine
                </p>

                <h2 className="mt-1 text-[16px] font-semibold tracking-tight text-[#18212f]">
                    Underwrite any commercial or residential parcel in seconds
                </h2>

                <p className="mt-1 text-[9px] text-[#8a94a1]">
                    Enter the property details and acquisition assumptions.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Address */}
                <div>
                    <label
                        htmlFor="address"
                        className="mb-1.5 block text-[9px] font-medium text-[#4f5b69]"
                    >
                        Property Address
                    </label>

                    <div className="flex h-10 overflow-hidden rounded-[4px] border border-[#cfd7df] bg-white focus-within:border-[#c96a00]">
                        <div className="flex flex-1 items-center gap-2 px-3">
                            <Search
                                size={14}
                                className="shrink-0 text-[#c96a00]"
                            />

                            <input
                                id="address"
                                type="text"
                                placeholder="Enter full address"
                                {...register("address")}
                                className="w-full bg-transparent text-[10px] text-[#263241] outline-none placeholder:text-[#a0a8b2]"
                            />
                        </div>
                    </div>

                    {errors.address && (
                        <p className="mt-1 text-[8px] text-red-500">
                            {errors.address.message}
                        </p>
                    )}
                </div>

                {/* Costs */}
                <div className="grid grid-cols-2 gap-3">
                    <MoneyInput
                        label="Repairs"
                        name="repairs"
                        register={register}
                        error={errors.repairs?.message}
                    />

                    <MoneyInput
                        label="Buying Costs"
                        name="buying_costs"
                        register={register}
                        error={errors.buying_costs?.message}
                    />

                    <MoneyInput
                        label="Holding Costs"
                        name="holding_costs"
                        register={register}
                        error={errors.holding_costs?.message}
                    />

                    <MoneyInput
                        label="Selling Costs"
                        name="selling_costs"
                        register={register}
                        error={errors.selling_costs?.message}
                    />

                    <MoneyInput
                        label="Desired Profit"
                        name="desired_profit"
                        register={register}
                        error={errors.desired_profit?.message}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={runComps.isPending}
                    className="
            flex h-9 w-full
            items-center justify-center gap-1.5
            rounded-[4px]
            bg-[#c96a00]
            text-[9px] font-semibold
            text-white
            transition
            hover:bg-[#b75f00]
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
                >
                    {runComps.isPending ? (
                        "Running Analysis..."
                    ) : (
                        <>
                            Run Comp Model
                            <ArrowRight size={11} />
                        </>
                    )}
                </button>
                {runComps.isPending && (
                    <RunCompsResultsSkeleton />
                )}

                {runComps.isSuccess && runComps.data && (
                    <RunCompsResults result={runComps.data} />
                )}

                {runComps.isError && (
                    <p className="text-[9px] text-red-500">
                        {runComps.error.message}
                    </p>
                )}
            </form>
        </section>
    );
}

interface MoneyInputProps {
    label: string;
    name:
    | "repairs"
    | "buying_costs"
    | "holding_costs"
    | "selling_costs"
    | "desired_profit";
    register: any;
    error?: string;
}

function MoneyInput({
    label,
    name,
    register,
    error,
}: MoneyInputProps) {
    return (
        <div>
            <label
                htmlFor={name}
                className="mb-1.5 block text-[9px] font-medium text-[#4f5b69]"
            >
                {label}
            </label>

            <div className="flex h-9 items-center rounded-[4px] border border-[#cfd7df] bg-white px-2.5 focus-within:border-[#c96a00]">
                <span className="mr-1 text-[9px] text-[#9aa2ad]">
                    $
                </span>

                <input
                    id={name}
                    type="number"
                    min="0"
                    step="any"
                    {...register(name)}
                    className="w-full bg-transparent text-[10px] outline-none"
                />
            </div>

            {error && (
                <p className="mt-1 text-[8px] text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}