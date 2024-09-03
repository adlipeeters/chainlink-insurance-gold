"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { createPolicy, editPolicy } from "@/services/blockchain"
import { convertDaysToMiliseconds } from "@/utils/functions"
import { useEffect } from "react"
import { title } from "process"
import { SystemPolicy } from "@/interfaces/SystemPolicy"

interface PropsInterafce {
    selectedPolicy: SystemPolicy | null;
    setOpen: (open: boolean) => void;
}

const formSchema = z.object({
    price: z.coerce.number().min(0, {
        message: "Price must be at least 0.",
    }),
    threshold: z.coerce.number().min(0, {
        message: "Rainfall Threshold must be at least 0.",
    }),
    duration: z.coerce.number().min(0, {
        message: "Max Duration must be at least 0.",
    }),
    maxPayout: z.coerce.number().min(0, {
        message: "Max Payout must be at least 0.",
    }),
    name: z.string().nonempty({
        message: "Name is required.",
    }),
    description: z.string().nonempty({
        message: "Description is required.",
    }),
    image: z.string().nonempty({
        message: "Image is required.",
    }),
})

const CreateEditPolicy = ({ selectedPolicy, setOpen }: PropsInterafce) => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            price: 0,
            threshold: 0,
            duration: 0,
            maxPayout: 0,
            name: '',
            description: '',
            image: '',
        },
    })

    // 2. Update the form values if `selectedPolicy` is provided.
    useEffect(() => {
        if (selectedPolicy) {
            form.reset({
                price: selectedPolicy.price,
                threshold: selectedPolicy.threshold,
                duration: selectedPolicy.duration,
                maxPayout: selectedPolicy.maxPayout,
                name: selectedPolicy.name,
                description: selectedPolicy.description,
                image: selectedPolicy.image,
            })
        } else {
            form.reset({
                price: 0,
                threshold: 0,
                duration: 0,
                maxPayout: 0,
                name: '',
                description: '',
                image: '',
            });
        }
    }, [selectedPolicy, form])

    // 3. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const daysInMiliseconds = convertDaysToMiliseconds(values.duration)
        if (selectedPolicy) {
            await editPolicy({ ...values, duration: daysInMiliseconds, id: selectedPolicy.id })
                .then(() => setOpen(false));
        } else {
            await createPolicy({ ...values, duration: daysInMiliseconds })
                .then(() => setOpen(false));
        }
    }

    return (
        <Form {...form} key={selectedPolicy ? selectedPolicy.id : 'new'}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Price" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the price of the policy.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="threshold"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Threshold</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Threshold" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the threshold.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Duration</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="30" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the maximum duration (in days) of the policy.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maxPayout"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Max Payout</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Max Payout" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the maximum payout of the policy.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Name" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name of the policy.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Description" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the description of the policy.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem className="col-span-2">
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="Image" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the image of the policy.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button className="col-span-2" type="submit">Submit</Button>
            </form>
        </Form>
    )
}

export default CreateEditPolicy;