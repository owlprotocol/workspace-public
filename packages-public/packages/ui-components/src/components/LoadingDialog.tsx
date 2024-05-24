import { PropsWithChildren } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog.js";

export function LoadingDialog({
    isOpen,
    children,
}: PropsWithChildren<{
    isOpen: boolean;
}>) {
    return (
        <Dialog open={isOpen}>
            <DialogContent
                className="max-w-48 flex justify-between"
                showCloseIcon={false}
            >
                {/** TODO: Improve Layout */}
                {children}
                <Loader2 className="animate-spin" />
            </DialogContent>
        </Dialog>
    );
}
