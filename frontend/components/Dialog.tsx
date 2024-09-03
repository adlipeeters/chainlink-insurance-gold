import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils";

interface PropsInterface {
    open: boolean;
    setOpen: (open: boolean) => void;
    children?: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

export function Modal({ open, setOpen, children, title, description, className }: PropsInterface) {
    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogContent className={
                cn(
                    "md:max-w-[700px]", className
                )
            }>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}
