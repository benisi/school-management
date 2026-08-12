<?php

namespace App\Enums;

enum UserRole: string
{
    case SuperAdmin = 'super_admin';
    case Admin = 'admin';
    case Supervisor = 'supervisor';
    case Hod = 'hod';
    case Teacher = 'teacher';
    case Student = 'student';
    case Parent = 'parent';

    public function label(): string
    {
        return match ($this) {
            self::SuperAdmin => 'Super Admin',
            self::Admin => 'Admin',
            self::Supervisor => 'Supervisor',
            self::Hod => 'Head of Department',
            self::Teacher => 'Teacher',
            self::Student => 'Student',
            self::Parent => 'Parent',
        };
    }

    public function isStaff(): bool
    {
        return in_array($this, [
            self::SuperAdmin,
            self::Admin,
            self::Supervisor,
            self::Hod,
            self::Teacher,
        ]);
    }
}