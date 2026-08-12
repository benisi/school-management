import { Link } from '@inertiajs/react';

export default function AuthLanding() {
    return (
        <div className="min-h-screen bg-slate-100">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-lg font-bold text-white">
                            S
                        </div>

                        <span className="text-lg font-bold text-slate-800">
                            School Management System
                        </span>
                    </Link>

                    {/* Navigation Buttons */}
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
                <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
                    {/* Left Content */}
                    <div>
                        <div className="mb-6 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                            Modern School Administration
                        </div>

                        <h1 className="max-w-2xl text-4xl leading-tight font-bold text-slate-900 sm:text-5xl lg:text-6xl">
                            Manage your school
                            <span className="block text-blue-600">
                                smarter and easier.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                            School Management System gives administrators a
                            centralized platform for managing students,
                            teachers, classes, attendance, and other school
                            activities.
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
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
                        <div className="mt-10 flex flex-wrap gap-8">
                            <div>
                                <p className="text-2xl font-bold text-slate-900">
                                    01
                                </p>

                                <p className="text-sm text-slate-500">
                                    Centralized Management
                                </p>
                            </div>

                            <div>
                                <p className="text-2xl font-bold text-slate-900">
                                    02
                                </p>

                                <p className="text-sm text-slate-500">
                                    Easy Administration
                                </p>
                            </div>

                            <div>
                                <p className="text-2xl font-bold text-slate-900">
                                    03
                                </p>

                                <p className="text-sm text-slate-500">
                                    Secure Access
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Preview */}
                    <div className="relative">
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl">
                            {/* Dashboard Header */}
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-slate-500">
                                        School Dashboard
                                    </p>

                                    <h2 className="text-xl font-bold text-slate-900">
                                        Overview
                                    </h2>
                                </div>

                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                    <span className="font-bold text-blue-600">
                                        S
                                    </span>
                                </div>
                            </div>

                            {/* Statistics */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Students */}
                                <div className="rounded-xl bg-blue-50 p-5">
                                    <p className="text-sm font-medium text-blue-600">
                                        Students
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-slate-900">
                                        1,250
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Total students
                                    </p>
                                </div>

                                {/* Teachers */}
                                <div className="rounded-xl bg-emerald-50 p-5">
                                    <p className="text-sm font-medium text-emerald-600">
                                        Teachers
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-slate-900">
                                        85
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Active teachers
                                    </p>
                                </div>

                                {/* Classes */}
                                <div className="rounded-xl bg-violet-50 p-5">
                                    <p className="text-sm font-medium text-violet-600">
                                        Classes
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-slate-900">
                                        32
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        School classes
                                    </p>
                                </div>

                                {/* Attendance */}
                                <div className="rounded-xl bg-orange-50 p-5">
                                    <p className="text-sm font-medium text-orange-600">
                                        Attendance
                                    </p>

                                    <p className="mt-2 text-3xl font-bold text-slate-900">
                                        94%
                                    </p>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Today's attendance
                                    </p>
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="mt-5 rounded-xl border border-slate-200 p-5">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-slate-800">
                                        Recent Activity
                                    </h3>

                                    <span className="text-xs font-medium text-blue-600">
                                        View all
                                    </span>
                                </div>

                                <div className="mt-4 space-y-4">
                                    {/* Activity 1 */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
                                            <span className="text-xs font-bold text-blue-600">
                                                +
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-700">
                                                New student registered
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                10 minutes ago
                                            </p>
                                        </div>
                                    </div>

                                    {/* Activity 2 */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100">
                                            <span className="text-xs font-bold text-emerald-600">
                                                ✓
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-700">
                                                Attendance updated
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                30 minutes ago
                                            </p>
                                        </div>
                                    </div>

                                    {/* Activity 3 */}
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100">
                                            <span className="text-xs font-bold text-violet-600">
                                                +
                                            </span>
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-700">
                                                New class created
                                            </p>

                                            <p className="text-xs text-slate-400">
                                                1 hour ago
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Background */}
                        <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-blue-200/50 blur-2xl" />

                        <div className="absolute -top-6 -right-6 -z-10 h-32 w-32 rounded-full bg-indigo-200/50 blur-2xl" />
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
