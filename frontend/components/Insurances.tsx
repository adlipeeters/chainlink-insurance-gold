import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SystemPolicy } from "@/interfaces/SystemPolicy";

const Insurances = (
    {
        insurances,
        setActive,
        id
    }: {
        insurances: SystemPolicy[],
        setActive: (value: SystemPolicy | boolean | null) => void,
        id: string
    }
) => {
    return (
        <>
            {insurances.map((card: SystemPolicy, index: number) => (
                <motion.div
                    layoutId={`card-${card.name}-${id}`}
                    key={card.name}
                    onClick={() => setActive(card)}
                    className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer bg-neutral-50"
                >
                    <div className="flex gap-4 flex-col  w-full">
                        <motion.div layoutId={`image-${card.name}-${id}`}>
                            <Image
                                width={100}
                                height={100}
                                src={card.image}
                                alt={card.name}
                                className="h-60 w-full  rounded-lg object-contain object-top"
                            />
                        </motion.div>
                        <div className="flex justify-center items-center flex-col">
                            <motion.h3
                                layoutId={`title-${card.name}-${id}`}
                                className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                            >
                                {card.name}
                            </motion.h3>
                            <motion.p
                                layoutId={`description-${card.description}-${id}`}
                                className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                            >
                                {card.description}
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            ))}
        </>
    )
}

export default Insurances