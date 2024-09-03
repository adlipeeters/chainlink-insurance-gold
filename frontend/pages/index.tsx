import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { InsurancesForSaleContainer } from "@/components/InsurancesForSaleContainer";
import { Hero } from "@/components/Hero";
import useSystemPoliciesStore from "@/store/policies";
import usePolicies from "@/store/policies";
import { getAllActiveInsurances } from "@/services/blockchain";

const inter = Inter({ subsets: ["latin"] });

const Home = () => {
    const { activePoliciesForSale } = usePolicies();

    useEffect(() => {
        getAllActiveInsurances();
    }, []);

    return (
        <main
            className={`${inter.className}`}>
            <Hero />
            <div className="">
                <div className="py-20">
                    <InsurancesForSaleContainer
                        insurances={activePoliciesForSale}
                    />
                </div>
            </div>

        </main>
    );
}

export default Home;