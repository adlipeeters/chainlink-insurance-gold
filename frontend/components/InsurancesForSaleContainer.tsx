"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Insurances from "./Insurances";
import ActiveInsurance from "./ActiveInsurance";
import { SystemPolicy } from "@/interfaces/SystemPolicy";

export const InsurancesForSaleContainer = ({ insurances }: { insurances: SystemPolicy[] }) => {
    const [active, setActive] = useState<SystemPolicy | boolean | null>(
        null
    );
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <ActiveInsurance
                active={active}
                setActive={setActive}
                id={id}
                ref={ref}
            />
            <ul className="container mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4 lg:gap-8">
                <Insurances insurances={insurances} id={id} setActive={setActive} />
            </ul>
        </>
    );
}