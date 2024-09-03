import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Image from "next/image";

export function Hero() {
    return (
        <>
            <BackgroundBeamsWithCollision className="flex flex-col">
                <h2 className="pt-20 text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
                    <p>{"Gold Insurance"}</p>
                    <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
                        <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-orange-500 via-orange-300 to-yellow-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                            <span className="">Protect your business today</span>
                        </div>
                        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-orange-500 via-orange-300 to-yellow-500 py-4">
                            <span className="">Protect your business today</span>
                        </div>
                    </div>
                </h2>
                <Image
                    src="/gold.png"
                    alt="Hero Image"
                    width={400}
                    height={400}
                    className="mx-auto"

                />
            </BackgroundBeamsWithCollision>
        </>
    );
}