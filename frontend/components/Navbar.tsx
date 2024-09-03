"use client";

import React from 'react'
import useWalletStore from '@/store/wallet';
import { truncate } from '@/utils/functions';
import { Button } from './ui/button';
import { Wallet } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { changeWallet, connectWallet } from '@/services/blockchain';
import { constants } from '@/utils/constants';
import Image from 'next/image';

const Navbar = () => {
    const pathname = usePathname();
    const { wallet, setWallet } = useWalletStore();

    return (
        <div className='flex justify-center w-full'>
            <div className="container py-4 rounded-lg border-[2px] flex justify-between items-center mt-2 shadow-sm bg-white">
                <div className='flex justify-between gap-3 items-center'>
                    <Link href='/' className='text-orange-500 font-bold text-xl flex items-center gap-3'>
                        <Image
                            src="/gold.png"
                            alt="Hero Image"
                            width={100}
                            height={100}
                            className="h-10 w-10"
                        />
                        Policy
                    </Link>
                    <Link
                        className={pathname === '/' ? 'underline font-semibold text-primary text-orange-500' : ''}
                        href='/'>Home</Link>
                    {
                        wallet ? (
                            <Link
                                className={pathname === '/my-policies' ? 'underline font-semibold text-primary text-orange-500' : ''}
                                href='/my-policies'>My Policies</Link>

                        ) : null
                    }
                    {
                        constants.adminAccountAddress.toLowerCase() === wallet.toLowerCase() ? (
                            <Link
                                href='/system-policies'>Dashboard</Link>
                        ) : null
                    }
                </div>
                {wallet ? (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            className='flex items-center gap-2 text-orange-500 border-orange-500 hover:text-opacity-75 hover:text-orange-500'
                            onClick={changeWallet}>
                            <Wallet className='w-4 h-4' />
                            <span className='hidden md:block'>
                                {truncate({ text: wallet, startChars: 6, endChars: 4, maxLength: 16 })}
                            </span>
                        </Button>
                    </div>
                ) : (
                    <Button
                        variant="outline"
                        className='flex items-center gap-2 text-orange-500 border-orange-500 hover:text-opacity-75 hover:text-orange-500'
                        onClick={connectWallet}>
                        <Wallet className='w-4 h-4' />
                        <span className='hidden md:block'>
                            Connect Wallet
                        </span>
                    </Button>
                )
                }
            </div>
        </div>
    )
}

export default Navbar