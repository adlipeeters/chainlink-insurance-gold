import { BoughtUserPolicy } from '@/interfaces/BoughtUserPolicy';
import React from 'react'

interface PropsInterafce {
    selectedPolicy: BoughtUserPolicy | null;
    setOpen: (open: boolean) => void;
}

const ViewPolicy = ({ selectedPolicy, setOpen }: PropsInterafce) => {
    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-3'>
                <p><strong>ID:</strong></p>
                <p><strong>Policy ID:</strong></p>
                <p><strong>Threshold:</strong></p>
                <p><strong>Price:</strong></p>
                <p><strong>Start Date:</strong></p>
                <p><strong>End Date:</strong></p>
                <p><strong>Policy Address:</strong></p>
                <p><strong>Policy Holder:</strong></p>
                <p><strong>Active:</strong></p>
            </div>
            <div className='col-span-9'>
                <p></p>
                <p>{selectedPolicy?.id}</p>
                <p>{selectedPolicy?.policyId}</p>
                <p>{selectedPolicy?.threshold}</p>
                <p>{selectedPolicy?.price}</p>
                <p>{selectedPolicy?.startDate.toString()}</p>
                <p>{selectedPolicy?.endDate.toString()}</p>
                <p>{selectedPolicy?.policyAddress}</p>
                <p>{selectedPolicy?.policyHolder}</p>
                <p>{selectedPolicy?.policyActive ? 'Yes' : 'No'}</p>
            </div>
        </div>
    )
}

export default ViewPolicy
