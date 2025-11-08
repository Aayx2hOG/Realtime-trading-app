import { auth } from "@/lib/authentication/auth";
import { Header } from "../header";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function rootLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    if (!session?.user) redirect('/sign-in');

    const user = {
        id: session.user.id,
        email: session.user.email || '',
        name: session.user.name || '',
    }

    return (
        <main className="min-h-screen text-gray-400">
            <Header user={user} />
            <div className="container py-10">
                {children}
            </div>
        </main>
    );
}