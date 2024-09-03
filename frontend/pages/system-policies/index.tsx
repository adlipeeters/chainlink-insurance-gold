import { DashboardLayoutV2 } from '@/components/DashboardLayoutV2'
import { DataTable } from "@/components/DataTable"
import { useEffect, useState } from 'react'
import { Modal } from '@/components/Dialog'
import { Button } from '@/components/ui/button'
import { getSystemPolicies, togglePolicyStatus } from '@/services/blockchain'
import usePolicies from '@/store/policies'
import { ColumnDef } from "@tanstack/react-table"
import { SystemPolicy } from '@/interfaces/SystemPolicy'
import CreateEditPolicy from './components/CreateEditPolicy'

export default function systemPolicies() {
    const [open, setOpen] = useState(false)
    const [selectedPolicy, setSelectedPolicy] = useState<SystemPolicy | null>(null)
    const { systemPolicies } = usePolicies();

    const handleEdit = (policy: SystemPolicy) => {
        setSelectedPolicy(policy);
        setOpen(true);
    };

    const tooglePolicyStatus = async (policy: SystemPolicy) => {
        await togglePolicyStatus(policy.id);
    }

    useEffect(() => {
        getSystemPolicies()
    }, [])

    useEffect(() => {
        if (!open) {
            // Reset selected policy when modal is closed
            setSelectedPolicy(null);
        }
    }, [open])

    const columns: ColumnDef<SystemPolicy>[] = [
        {
            accessorKey: "image",
            header: "Image",
            cell: ({ getValue }) => <img src={getValue<string>()} alt="policy" className="h-10 w-10" />,
        },
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "description",
            header: "Description",
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ getValue }) => `${getValue<string>()} ETH`,
        },
        {
            accessorKey: "maxPayout",
            header: "Max Payout",
            cell: ({ getValue }) => `${getValue<string>()} ETH`,
        },
        {
            accessorKey: "threshold",
            header: "Threshold",
        },
        {
            accessorKey: "duration",
            header: "Duration",
            cell: ({ getValue }) => `${getValue<string>()} Days`,
        },
        {
            accessorKey: "active",
            header: "Active",
            cell: ({ row }) => (
                <Button onClick={() => tooglePolicyStatus(row.original)}
                    className={row.original.active ? "bg-green-500" : "bg-red-500"}>
                    {row.original.active ? "Deactivate" : "Activate"}
                </Button>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Button onClick={() => handleEdit(row.original)}>
                    Edit
                </Button>
            ),
        },
    ];


    return (
        <DashboardLayoutV2
            title={"System Policies"}>
            <div className='flex flex-col gap-4'>
                <div>
                    <Button onClick={() => setOpen(true)}>Create Policy</Button>
                </div>
                <DataTable columns={columns} data={systemPolicies} />
            </div>
            <Modal
                open={open}
                setOpen={setOpen}
                children={<CreateEditPolicy
                    setOpen={setOpen}
                    selectedPolicy={selectedPolicy}
                />}
                title={"Create Policy"}
            />
        </DashboardLayoutV2>
    )
}