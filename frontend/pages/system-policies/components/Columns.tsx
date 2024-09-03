// "use client"

// import { Button } from "@/components/ui/button"
// import { SystemPolicy } from "@/interfaces/SystemPolicy"
// import { ColumnDef } from "@tanstack/react-table"

// export const columns: ColumnDef<SystemPolicy>[] = [
//     {
//         accessorKey: "id",
//         header: "ID",
//     },
//     {
//         accessorKey: "price",
//         header: "Price",
//         cell: ({ getValue }) => `${getValue<string>()} ETH`,
//     },
//     {
//         accessorKey: "maxPayout",
//         header: "Max Payout",
//         cell: ({ getValue }) => `${getValue<string>()} ETH`,
//     },
//     {
//         accessorKey: "threshold",
//         header: "Rainfall Threshold",
//     },
//     {
//         accessorKey: "duration",
//         header: "Duration",
//     }, {
//         id: "actions",  // Custom column for actions like Edit
//         header: "Actions",
//         cell: ({ row }) => (
//             <Button onClick={() => handleEdit(row.original)}>
//                 Edit
//             </Button>
//         ),
//     },
// ]
