import { AnimatePresence, motion } from 'framer-motion'
import React, { act } from 'react'
import { CloseIcon } from './Closeicon'
import Image from 'next/image'
import { buyInsurance } from '@/services/blockchain'
import { SystemPolicy } from '@/interfaces/SystemPolicy'

const ActiveInsurance = (
    { active, setActive, id, ref }: {
        active: SystemPolicy | boolean | null,
        setActive: (value: SystemPolicy | boolean | null) => void,
        id: string,
        ref: React.RefObject<HTMLDivElement>
    }) => {

    const triggerBuyInsurance = async () => {
        if (active && typeof active === "object") {
            await buyInsurance(active.id, active.price);
            setActive(null);
        }
    }

    return (
        <AnimatePresence>
            {active && typeof active === "object" ? (
                <div className="fixed inset-0 grid place-items-center z-[200]">
                    <motion.button
                        key={`button-${active.name}-${id}`}
                        layout
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.05,
                            },
                        }}
                        className="flex absolute top-2 right-2 lg:hidde items-center justify-center bg-white rounded-full h-6 w-6"
                        onClick={() => setActive(null)}
                    >
                        <CloseIcon />
                    </motion.button>
                    <motion.div
                        layoutId={`card-${active.name}-${id}`}
                        ref={ref}
                        className="w-full max-w-[500px] h-full- md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                    >
                        <motion.div layoutId={`image-${active.name}-${id}`} className='py-8'>
                            <Image
                                priority
                                width={200}
                                height={200}
                                src={active.image}
                                alt={active.name}
                                className="w-full h-80 lg:h-40 sm:rounded-tr-lg sm:rounded-tl-lg object-contain object-top"
                            />
                        </motion.div>

                        <div>
                            <div className="flex justify-between items-start p-4">
                                <div className="">
                                    <motion.h3
                                        layoutId={`title-${active.name}-${id}`}
                                        className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                                    >
                                        {active.name}
                                    </motion.h3>
                                    <motion.p
                                        layoutId={`description-${active.description}-${id}`}
                                        className="text-neutral-600 dark:text-neutral-400 text-base"
                                    >
                                        {/* {active.description} */}
                                    </motion.p>
                                </div>

                                <motion.button
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    // href={'#'}
                                    // target="_blank"
                                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                                    onClick={triggerBuyInsurance}
                                >
                                    Buy Insurance for {active.price} ETH
                                </motion.button>
                            </div>
                            <div className="pt-4 relative px-4">
                                <motion.div
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                >
                                    {/* {typeof active.description === "function"
                                ? active.content()
                                : active.description} */}
                                    {active.description}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            ) : null}
        </AnimatePresence>
    )
}

export default ActiveInsurance