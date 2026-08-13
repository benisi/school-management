DOCUMENTATION_FULL — Role-based dashboard & DB wiring
Generated: 2026-08-13T18:32:46+01:00

Table of contents
1. Overview
2. Environment & run steps
3. Database schema (migrations) — table definitions
4. Eloquent models & relationships
5. Seeders & sample data summary
6. DashboardService: methods and return structures (per role)
7. Controller & Inertia payloads
8. Frontend: pages, components, props, and TypeScript interfaces
9. Verification & common queries
10. Next steps & TODOs

1. Overview
This repository implements a role-aware dashboard (SuperAdmin, Admin, Supervisor/HOD, Teacher, Student, Parent) backed by PostgreSQL and Laravel. Frontend uses React + Inertia + TypeScript with role-specific components. Backend provides new models, migrations and a DashboardService that aggregates role-specific metrics.

Repository key paths (short list)
- Backend: app/Services/DashboardService.php, app/Http/Controllers/DashboardController.php, app/Models/{SchoolClass,Enrollment,Fee,Result,Attendance}.php
- Migrations: database/migrations/* (files creating school_classes, enrollments, fees, results, attendance, parent_child)
- Seeders: database/seeders/{SchoolSeeder.php,SampleDataSeeder.php,SuperAdminSeeder.php}
- Frontend: resources/js/pages/dashboard.tsx, resources/js/components/dashboards/DashboardRouter.tsx, resources/js/components/dashboards/roles/*.tsx, resources/js/components/dashboards/shared/*

2. Environment & run steps
- Requirements: PHP (Laravel 10-9 style), Composer, Node 18+, npm, PostgreSQL (configured in .env).
- .env important keys: DB_CONNECTION=pgsql, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, DB_PASSWORD, APP_URL, APP_ENV.

Common commands
1) Install
   composer install
   npm install
2) Migrate & seed
   php artisan migrate --seed
   OR fresh
   php artisan migrate:fresh --seed
3) Run app / assets (dev)
   npm run dev
   php artisan serve --port=8000
4) Build production assets
   npm run build

3. Database schema (migrations)
This lists the new tables introduced; column types are the Laravel migration shorthand (approximate mapping shown). These were added as separate migration files in database/migrations.

Table: schools (existing)
- id (bigint PK)
- name (string)
- address (nullable string)
- created_at, updated_at

Table: school_classes
- id (bigint PK)
- school_id (bigint FK -> schools.id)
- name (string) e.g., "Primary 1", "JSS 2"
- teacher_id (bigint nullable FK -> users.id)  -- homeroom teacher
- capacity (integer default 0)
- created_at, updated_at

Table: enrollments
- id (bigint PK)
- student_id (bigint FK -> users.id)
- school_class_id (bigint FK -> school_classes.id)
- school_id (bigint FK -> schools.id)
- roll_no (string nullable)
- admitted_at (timestamp nullable)
- created_at, updated_at

Table: fees
- id (bigint PK)
- student_id (bigint FK -> users.id) nullable when fee is school-level
- school_id (bigint FK -> schools.id)
- amount (decimal)
- status (string) e.g., 'pending','paid'
- due_date (date nullable)
- created_at, updated_at

Table: results
- id (bigint PK)
- student_id (bigint FK -> users.id)
- exam (string) e.g., 'term1'
- subject (string)
- score (decimal)
- total (decimal) or max_score
- grade (string nullable)
- created_at, updated_at

Table: attendance
- id (bigint PK)
- student_id (bigint FK -> users.id)
- date (date)
- status (string) e.g., 'present','absent','late'
- notes (nullable text)
- created_at, updated_at

Table: parent_child (pivot)
- id
- parent_id (bigint FK -> users.id)
- child_id (bigint FK -> users.id)
- relationship (string nullable)
- created_at, updated_at

Indexes & FKs: migrations add foreign keys for school_id, student_id, teacher_id where appropriate. Postgres-specific timestamps use timestamptz by default in Laravel.

4. Eloquent models & relationships
Files and key relationships implemented (app/Models):
- School (existing) — hasMany(SchoolClass), hasMany(User?)
- SchoolClass — belongsTo(School), belongsTo(User as teacher), hasMany(Enrollment)
- Enrollment — belongsTo(Student (User)), belongsTo(SchoolClass), belongsTo(School)
- Fee — belongsTo(School), belongsTo(Student (nullable))
- Result — belongsTo(Student (User))
- Attendance — belongsTo(Student (User))
- parent_child pivot is modeled via a simple table; helper methods on User model (children(), parents()) are added or can be used via belongsToMany(User::class, 'parent_child', 'parent_id', 'child_id')

User model notes
- The repo already contains a User model with role enum. The seeders create users with roles: super_admin, admin, hod, teacher, student, parent.
- Role logic in DashboardService depends on User->role string values. Adjust names if your app uses other naming (e.g., 'superadmin' vs 'super_admin').

5. Seeders & sample data summary
- SchoolSeeder.php — creates/updates four schools:
  1) Blessed Children Academy
  2) Wisdom Gate School
  3) National Comprehensive College
  4) Nana College

- SuperAdminSeeder.php — creates super@local (password 'password' or seeded value) and assigns Super Admin role

- SampleDataSeeder.php — populates the FIRST school (the earliest created school) with:
  - 1 Admin user
  - 1 HOD/Supervisor user
  - 1 Teacher user
  - 6 Student users
  - 1 Parent user (linked to first two student users via parent_child)
  - 2-3 SchoolClass rows (e.g., Primary 1, Primary 2) linked to the teacher
  - Enrollment rows linking the students to classes
  - Sample Fee rows (one per student, statuses varied)
  - Sample Results for students across sample subjects
  - Sample Attendance entries for a recent date range

Seeder idempotency: seeders use updateOrCreate / firstOrCreate patterns so repeated seeding won't create duplicates.

How to seed other schools with sample data
- Option A (fast): Duplicate SampleDataSeeder logic with a parameterized school_id. Add a new seeder class or update SampleDataSeeder to accept an env var or argument. Example pattern in Laravel: php artisan db:seed --class=SampleDataSeeder --school_id=2 (you may need to implement input parsing inside the seeder).
- Option B: Manually adjust SampleDataSeeder::run() to target other schools and re-run.

6. DashboardService: methods and return structures
File: app/Services/DashboardService.php
Purpose: Perform DB aggregation queries and return role-specific 'dashboardData' arrays (or associative objects) used by Inertia to render dashboards.

Implemented public methods (signatures approximate):
- getSuperAdminData(User $user): array
  Returns: {
    total_schools: int,
    total_users: int,
    total_students: int,
    total_teachers: int,
    recent_schools: [ {id, name, created_at}, ... ]
  }

- getAdminData(User $user): array
  Uses $user->school_id (admin is scoped to one school). Returns: {
    school: {id,name},
    students_count: int,
    classes_count: int,
    teachers_count: int,
    pending_fees_total: decimal,
    attendance_today: {present:int, absent:int, late:int}
  }

- getSupervisorData(User $user) / getHodData(User $user): array
  Aggregates class-level and department-level counts (approx): {
    classes_count, students_count, teacher_count, average_attendance_percent, pending_fees_count
  }

- getTeacherData(User $user): array
  Based on teacher's assigned classes: {
    my_classes: [{id,name,students_count}],
    students_count: int,
    attendance_today: [{student_id, status}],
    recent_results: [{student_id, subject, score}]
  }

- getStudentData(User $user): array
  Returns: {
    enrolled_class: {id,name},
    fees_balance: decimal,
    recent_results: [{exam,subject,score,total,grade}],
    attendance_summary: {present,absent,late,total_days}
  }

- getParentData(User $user): array
  Aggregates for parent->children: {
    children: [{id,name, class:{id,name}, recent_results, fees_balance}],
    notifications: []
  }

Notes on structure
- DashboardService returns plain PHP associative arrays. DashboardController wraps them into Inertia props named 'dashboardData'. Frontend components accept a single "data" prop typed accordingly.

7. Controller & Inertia payloads
File: app/Http/Controllers/DashboardController.php
- Method: index() or show() that authenticates the user, calls DashboardService based on role and passes props:
  Inertia::render('dashboard', [
    'user' => Auth::user()->load('school'),
    'dashboardData' => $dashboardData
  ]);

Route: GET /dashboard typically defined in routes/web.php with auth middleware.

Example Inertia payload (JSON-ish) for Admin
{
  "user": { id: 10, name: "Admin One", role: "admin", school_id: 2, ...},
  "dashboardData": {
    "school": { "id": 2, "name": "Blessed Children Academy" },
    "students_count": 120,
    "classes_count": 8,
    "teachers_count": 15,
    "pending_fees_total": "10500.00",
    "attendance_today": {"present": 110, "absent": 8, "late": 2}
  }
}

8. Frontend: pages, components, props, and TypeScript interfaces
Files
- resources/js/pages/dashboard.tsx
  - Receives props: user (object), dashboardData (any)
  - Forwards to <DashboardRouter user={user} data={dashboardData} />

- resources/js/components/dashboards/DashboardRouter.tsx
  - Reads user.role and returns the appropriate role component:
    SuperAdminDashboard, AdminDashboard, SupervisorDashboard, HODDashboard, TeacherDashboard, StudentDashboard, ParentDashboard
  - Passes 'data' prop to the component

- resources/js/components/dashboards/roles/*.tsx
  - Each role component accepts a prop interface similar to:
    interface RoleDashboardProps<T = any> { data: T; user?: User; }
  - They render StatCard, DashboardHeader, and lists as needed. Components are small and presentation-only; any action links point to existing or placeholder routes.

Type definitions (approx)
- User: { id:number, name:string, role:string, school_id?:number, email:string }
- DashboardData: union of role-specific shapes (see Section 6). TypeScript interfaces added in resources/js/types/dashboard.d.ts (if present).

9. Verification & common queries
- Check schools seeded:
  SELECT id, name, created_at FROM schools ORDER BY created_at DESC;

- Check sample classes and enrollments for first school
  SELECT sc.id, sc.name, u.name as teacher FROM school_classes sc LEFT JOIN users u ON u.id=sc.teacher_id WHERE sc.school_id = 1;
  SELECT e.student_id, u.name, sc.name as class_name FROM enrollments e JOIN users u ON u.id=e.student_id JOIN school_classes sc ON sc.id=e.school_class_id WHERE e.school_id = 1;

- Dashboard payload test (Laravel tinker)
  >>> $user = App\Models\User::where('email','super@local')->first();
  >>> $svc = new App\Services\DashboardService();
  >>> $svc->getSuperAdminData($user);

- Frontend: open /dashboard while logged in as seeded users. Use the Super Admin credentials in SuperAdminSeeder.

10. Next steps & TODOs
- Seed sample data across the other three schools (currently only the first has full sample users and classes)
- Add CRUD pages and controllers for Schools, Classes, Students, Enrollments, Fees, Results, Attendance
- Implement a Department model and explicit HOD relationships (currently approximated by teacher->class mapping)
- Add robust authorization policies for management operations (Laravel Policies + gates)
- Add tests: unit tests for DashboardService methods and feature tests for DashboardController
- Consider heavy-aggregation caching or queued jobs for large datasets

Appendix A — Where to change seed target
- To reuse SampleDataSeeder for other schools, edit database/seeders/SampleDataSeeder.php and add a public static property or constructor param to accept school_id, or modify run() to read env('SEED_TARGET_SCHOOL', 1).

Appendix B — Example minimal change to SampleDataSeeder.php (concept)
- At top of run(): $schoolId = env('SEED_TARGET_SCHOOL', null) ?? \App\Models\School::first()->id;
- Then use $schoolId when creating classes and users.

If more granular per-file field listings or generated ER diagram desired, confirm and the repository will receive an ERD SVG and a per-file table of columns (DOCUMENTATION_SCHEMA.md).
