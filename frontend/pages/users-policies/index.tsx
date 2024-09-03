import DashboardLayout from '@/components/DashboardLayout'
import { DashboardLayoutV2 } from '@/components/DashboardLayoutV2'
import { DataTable } from '@/components/DataTable'
import { Modal } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { BoughtUserPolicy } from '@/interfaces/BoughtUserPolicy'
import { getAllUsersPolicies } from '@/services/blockchain'
import usePolicies from '@/store/policies'
import { truncate } from '@/utils/functions'
import { ColumnDef } from '@tanstack/react-table'
import React, { useEffect, useState } from 'react'
import ViewPolicy from './components/ViewPolicy'

const UsersInsurances = () => {
    const [open, setOpen] = useState(false)
    const [selectedPolicy, setSelectedPolicy] = useState<BoughtUserPolicy | null>(null)
    const { boughtPolicies } = usePolicies();

    const handleView = (policy: BoughtUserPolicy) => {
        setSelectedPolicy(policy);
        setOpen(true);
    };

    useEffect(() => {
        getAllUsersPolicies();
    }, []);

    useEffect(() => {
        if (!open) {
            // Reset selected policy when modal is closed
            setSelectedPolicy(null);
        }
    }, [open])

    const columns: ColumnDef<BoughtUserPolicy>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "policyId",
            header: "Policy ID",
        },
        {
            accessorKey: "threshold",
            header: "Threshold",
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ getValue }) => `${getValue<string>()} ETH`,
        },

        {
            accessorKey: "startDate",
            header: "Start Date",
        },
        {
            accessorKey: "endDate",
            header: "End Date",
        },
        {
            accessorKey: "policyAddress",
            header: "Policy Address",
            cell: ({ getValue }) => truncate({ text: getValue<string>(), startChars: 6, endChars: 4, maxLength: 16 }),
        },
        {
            accessorKey: "policyHolder",
            header: "Policy Holder",
            cell: ({ getValue }) => truncate({ text: getValue<string>(), startChars: 6, endChars: 4, maxLength: 16 }),
        },
        {
            accessorKey: "policyActive",
            header: "Active",
            cell: ({ getValue }) => getValue<boolean>() ? 'Yes' : 'No',
        },
        {
            accessorKey: "payoutTriggered",
            header: "Payout Triggered",
            cell: ({ getValue }) => getValue<boolean>() ? 'Yes' : 'No',
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Button onClick={() => handleView(row.original)}>
                    View
                </Button>
            ),
        },
    ];

    return (
        <DashboardLayoutV2
            title='Users Insurances'
        >
            <div className='flex flex-col gap-4'>
                <div>
                    {/* <Button onClick={() => setOpen(true)}>Create Insurance</Button> */}
                </div>
                <DataTable columns={columns} data={boughtPolicies} />
            </div>
            <Modal

                open={open}
                setOpen={setOpen}
                children={<ViewPolicy
                    setOpen={setOpen}
                    selectedPolicy={selectedPolicy}
                />}
                title={"Policy Details"}
            />
        </DashboardLayoutV2>

    )
}

export default UsersInsurances