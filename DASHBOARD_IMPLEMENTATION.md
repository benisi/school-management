# Role-Based Dashboard Implementation Guide

## Overview

Your dashboard has been successfully refactored to support role-based UI rendering. Each user role now sees a completely customized dashboard with role-specific features and quick actions.

## Supported Roles

1. **Super Admin** - Platform-wide administration
2. **Admin** - School-wide management
3. **Supervisor** (HOD) - Department/Supervisor management
4. **HOD** - Head of Department specific features
5. **Teacher** - Teaching and classroom management
6. **Student** - Student-centric dashboard
7. **Parent** - Parent/Guardian dashboard

## Project Structure

```
resources/js/components/dashboards/
├── shared/
│   ├── DashboardHeader.tsx      # Shared header component
│   ├── StatCard.tsx              # Statistics card component
│   ├── DashboardCard.tsx          # Dashboard section card
│   ├── ActionCard.tsx             # Quick action button component
│   └── index.ts                   # Exports
├── roles/
│   ├── SuperAdminDashboard.tsx    # Super Admin dashboard
│   ├── AdminDashboard.tsx         # School Admin dashboard
│   ├── SupervisorDashboard.tsx    # Supervisor/HOD dashboard
│   ├── HODDashboard.tsx           # Head of Department dashboard
│   ├── TeacherDashboard.tsx       # Teacher dashboard
│   ├── StudentDashboard.tsx       # Student dashboard
│   ├── ParentDashboard.tsx        # Parent dashboard
│   └── index.ts                   # Exports
├── DashboardRouter.tsx            # Main router component
└── index.ts                       # Root exports
```

## Dashboard Features by Role

### Super Admin
- **Statistics**: Total Schools, Active Schools, Total Users, Total Students
- **Sections**:
  - School Management
  - Platform Users
  - System Settings
- **Quick Actions**:
  - Register New School
  - Add Platform Admin
  - View System Reports
  - System Configuration

### Admin (School Administrator)
- **Statistics**: Total Classes, Total Students, Total Staff, Pending Fees
- **Sections**:
  - Classes Management
  - Subjects Management
  - Student Management
  - Staff Management
  - Results & Performance
  - E-Learning Platform
  - Accounts & Users
  - Fees Management
  - Financial Reports
  - Result Analysis
- **Quick Actions**:
  - Enroll New Student
  - Record Results
  - Process Fee Payment
  - Generate Reports

### Supervisor/HOD
- **Statistics**: Students Under Supervision, Classes, Results Recorded, Outstanding Issues
- **Sections**:
  - Student Management
  - Result Management
  - Result Analysis
- **Quick Actions**:
  - View Supervised Students
  - View Results
  - Performance Analysis
  - CBT Management

### HOD (Head of Department)
- **Statistics**: Students in Department, Classes, Teachers
- **Sections**:
  - Result Management
  - CBT Management
  - Student Management
- **Quick Actions**:
  - Enter Results
  - Create CBT Questions
  - Create CBT Test
  - View Department Students

### Teacher
- **Statistics**: Total Classes, Total Students, Attendance Rate, Pending Results
- **Sections**:
  - My Classes
  - Students
  - Attendance
  - Results
  - E-Learning
- **Quick Actions**:
  - Record Attendance
  - Enter Results
  - Upload Learning Material
  - View Class Details

### Student
- **Statistics**: Overall Grade, Attendance, Subjects, Next Test
- **Sections**:
  - My Results
  - My Attendance
  - Timetable
  - E-Learning
- **Quick Actions**:
  - View My Results
  - View My Timetable
  - Check Attendance
  - Access E-Learning

### Parent
- **Statistics**: Children, Outstanding Fees, Attendance Status
- **Sections**:
  - My Children
  - Results
  - Attendance
  - Fees & Payments
- **Quick Actions**:
  - View Child's Results
  - Check Attendance
  - Pay School Fees
  - Contact School

## Main Entry Point

The main dashboard page (`resources/js/pages/dashboard.tsx`) is now a simple entry point that delegates to the `DashboardRouter`:

```typescript
import { DashboardRouter } from '@/components/dashboards';

export default function Dashboard({ user }: Props) {
    return <DashboardRouter user={user} />;
}
```

## Adding New Features

### To add a new section to a role's dashboard:

1. **Edit the corresponding role dashboard file** (e.g., `AdminDashboard.tsx`)
2. **Add a new DashboardCard component**:

```typescript
<DashboardCard
    title="Section Title"
    description="Section description"
    action="View All"
    actionHref="/admin/section"
>
    <div className="space-y-3">
        <p className="text-sm text-slate-600">
            Section content here.
        </p>
    </div>
</DashboardCard>
```

### To add a new quick action:

```typescript
<ActionCard
    icon="🎯"
    title="Action Title"
    description="Action description"
    href="/path/to/action"
/>
```

### To add a new stat card:

```typescript
<StatCard
    title="Stat Title"
    value="123"
    description="Stat description"
    icon="📊"
    iconClass="bg-blue-50 text-blue-600"
/>
```

## Customization

### Colors and Icons

All components use Tailwind CSS classes. You can customize colors by:
- Modifying the `iconClass` prop in StatCard
- Using different emoji or icons in the `icon` prop
- Updating the Tailwind classes in component files

### Responsive Design

All dashboards are responsive using Tailwind's grid system:
- Mobile: 1 column
- Tablet (sm): 2 columns
- Desktop (lg/xl): 3-4 columns

## Technical Details

### Path Aliases

The project uses the `@` alias for imports:
- `@/components` → `resources/js/components`
- `@/hooks` → `resources/js/hooks`
- etc.

This is configured in:
- `tsconfig.json`: TypeScript paths
- `vite.config.ts`: Vite resolve alias

### Type Safety

All components are fully TypeScript typed for better development experience and type safety.

### Styling

Uses Tailwind CSS with the following utility classes:
- `grid gap-5 sm:grid-cols-2 xl:grid-cols-4` - Responsive grid
- `rounded-2xl border border-slate-200 bg-white p-6 shadow-sm` - Card styling
- `space-y-3` - Vertical spacing
- `hover:bg-slate-50` - Interactive states

## Dynamic Content

The current dashboards show static placeholder data. To integrate real data:

1. **Pass data from Laravel backend** through Inertia props
2. **Update component props** to accept the data
3. **Render dynamic content** in place of hardcoded values

Example:
```typescript
interface AdminDashboardProps {
    user: User;
    classCount: number;
    studentCount: number;
    staffCount: number;
    pendingFees: string;
}

export function AdminDashboard({ user, classCount, ... }: AdminDashboardProps) {
    // Use the props in StatCard values
}
```

## Next Steps

1. **Connect backend endpoints** - Update ActionCard hrefs and links to actual routes
2. **Implement data fetching** - Add real data from your Laravel API
3. **Add navigation** - Integrate with your router/navigation system
4. **Customize styling** - Adjust colors, spacing, and layout as needed
5. **Add more features** - Extend dashboards with role-specific functionality

## Testing

The build was successful with no TypeScript errors. To test:

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # Lint TypeScript
```

All imports and path aliases are correctly configured and validated by the build system.
