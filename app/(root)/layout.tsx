import { Header } from "../header";

export default function rootLayout({ children }: { children: React.ReactNode }) {
    return <main className="min-h-screen text-gray-400">
        <Header />
        <div className="container py-10">
            {children}
        </div>
    </main>
}