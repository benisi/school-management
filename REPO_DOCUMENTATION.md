Repository documentation — Role-based dashboard and DB wiring

Overview

This repo implements a role-based dashboard (SuperAdmin, Admin, Supervisor/HOD, Teacher, Student, Parent) wired to PostgreSQL. The dashboard UI is built with React + Inertia + TypeScript. Backend is Laravel (PHP) with new models, migrations, seeders and a DashboardService that aggregates metrics per role.

Key backend files (important):
- C:\Users\LENOVO\Herd\school-management\app\Services\DashboardService.php  — Aggregates dashboard metrics by role
- C:\Users\LENOVO\Herd\school-management\app\Http\Controllers\DashboardController.php — Inertia entry for dashboard
- C:\Users\LENOVO\Herd\school-management\database\seeders\SchoolSeeder.php — Seeds four schools
- C:\Users\LENOVO\Herd\school-management\database\seeders\SampleDataSeeder.php — Seeds admin/teacher/students/classes/fees/results/attendance for first school
- C:\Users\LENOVO\Herd\school-management\database\migrations\* — New tables: school_classes, enrollments, fees, results, attendance, parent_child
- Models: SchoolClass, Enrollment, Fee, Result, Attendance (in app\Models)

Key frontend files (important):
- C:\Users\LENOVO\Herd\school-management\resources\js\pages\dashboard.tsx — Inertia page delegating to DashboardRouter
- C:\Users\LENOVO\Herd\school-management\resources\js\components\dashboards\DashboardRouter.tsx — Routes by role
- C:\Users\LENOVO\Herd\school-management\resources\js\components\dashboards\roles\*.tsx — Role-specific dashboards
- C:\Users\LENOVO\Herd\school-management\resources\js\components\dashboards\shared\* — Shared UI components
- vite.config.ts & tsconfig.json — aliasing for '@' => resources/js

Existing documentation
- C:\Users\LENOVO\Herd\school-management\DASHBOARD_IMPLEMENTATION.md — Detailed notes about the dashboard architecture, services, and files. Use this for deep-dive on dashboard logic.

How to run locally
1. Configure .env for PostgreSQL (DB_CONNECTION=pgsql etc.)
2. Install PHP deps: composer install
3. Install Node deps: npm install
4. Run migrations + seeders (creates schools + sample data):
   php artisan migrate --seed
   (or php artisan migrate:fresh --seed if you want a clean DB)
5. Build frontend assets in dev: npm run dev  (or production: npm run build)
6. Serve app: php artisan serve

Notes & next steps
- Sample data seeded for first school; the other three schools exist but are not populated with users/classes.
- Department model and advanced domain logic (timetables, CBT scheduling, fee installments) are TODOs.
- Recommended next actions: seed remaining schools, add CRUD pages for Classes/Students, add policies and tests.

If you want, a more detailed per-file API and model field listing can be added — confirm and it will be generated into this repo as DOCUMENTATION_FULL.md.
