import Header from '@/components/header';
import MobileNavigation from '@/components/mobile-navigation';
import Sidebar from '@/components/sidebar';
import { getCurrentUser } from '@/server/actions/users.actions';
import { redirect } from 'next/navigation';
import React from 'react'

const RootLayout = async ({ children }: { children: React.ReactNode }) => {

    const currentUser = await getCurrentUser();

    if (!currentUser) return redirect("/sign-in");

    return (
        <main className="flex h-screen">
            <Sidebar {...currentUser} />

            <section className="flex h-full flex-1 flex-col">
                <MobileNavigation {...currentUser} />
                <Header userId={currentUser.$id} accountId={currentUser.accountId} />
                <div className="main-content">{children}</div>
            </section>

            {/* <Toaster /> */}
        </main>
    );
}

export default RootLayout