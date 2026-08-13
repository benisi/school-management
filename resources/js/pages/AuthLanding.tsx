import { Link } from '@inertiajs/react';

export default function AuthLanding() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
                            S
                        </div>

                        <span className="text-lg font-bold text-slate-800">
                            School Management System
                        </span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/login"
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
                        >
                            Login
                        </Link>

                        <Link
                            href="/register"
                            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main>
                <section className="flex min-h-[calc(100vh-73px)] items-center">
                    <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
                        {/* Badge */}
                        <div className="mb-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                            Modern School Administration
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl leading-tight font-bold text-slate-900 sm:text-5xl lg:text-6xl">
                            Manage your school
                            <span className="block text-blue-600">
                                smarter and easier.
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                            School Management System provides a simple and
                            secure platform for managing your school activities,
                            users, students, teachers, classes, attendance, and
                            more.
                        </p>

                        {/* Authentication Buttons */}
                        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                            <Link
                                href="/login"
                                className="rounded-lg bg-blue-600 px-7 py-3.5 text-center font-semibold text-white shadow-sm transition hover:bg-blue-700"
                            >
                                Login to Dashboard
                            </Link>

                            <Link
                                href="/register"
                                className="rounded-lg border border-slate-300 bg-white px-7 py-3.5 text-center font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Create Account
                            </Link>
                        </div>

                        {/* Features */}
                        <div className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-3">
                            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                                    01
                                </div>

                                <h2 className="mt-4 font-semibold text-slate-900">
                                    Centralized Management
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Manage important school information from one
                                    place.
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                                    02
                                </div>

                                <h2 className="mt-4 font-semibold text-slate-900">
                                    Easy Administration
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Make everyday school administration simple
                                    and organized.
                                </p>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 font-bold text-blue-600">
                                    03
                                </div>

                                <h2 className="mt-4 font-semibold text-slate-900">
                                    Secure Access
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Give authorized users secure access to
                                    school resources.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-6 py-5 text-center text-sm text-slate-500">
                    © {new Date().getFullYear()} School Management System. All
                    rights reserved.
                </div>
            </footer>
        </div>
    );
}
