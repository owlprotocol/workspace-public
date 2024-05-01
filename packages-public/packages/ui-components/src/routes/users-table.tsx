import { createLazyFileRoute, createFileRoute } from "@tanstack/react-router";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../components/ui/card";

export const Route = createFileRoute("/users-table")({
    component: UsersTable,
});

function UsersTable() {
    return (
        <div className="p-2">
            <h3>This is the Users Table</h3>
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Card Content</p>
                </CardContent>
                <CardFooter>
                    <p>Card Footer</p>
                </CardFooter>
            </Card>
        </div>
    );
}
