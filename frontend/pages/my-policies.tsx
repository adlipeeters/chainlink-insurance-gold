import { SpotlightCard } from '@/components/SpotlightCard'
import { getUserPolicies } from '@/services/blockchain';
import usePolicies from '@/store/policies';
import React, { useEffect } from 'react'

const MyPolicies = () => {
    const { userPolicies } = usePolicies();

    useEffect(() => {
        getUserPolicies();
    }, []);

    return (
        <div className='py-20 flex justify-center'>
            <div className="container px-0 grid md:grid-cols-2 lg:grid-cols-3 py-20 justify-center gap-6">
                {
                    userPolicies.map((policy) => (
                        <div className="flex justify-center">
                            <SpotlightCard policy={policy} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyPolicies