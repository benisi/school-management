<?php

namespace App\Enums;

enum UserType: string
{
    case Staff = 'staff';
    case Student = 'student';
    case Parent = 'parent';

    public function label(): string
    {
        return match ($this) {
            self::Staff => 'Staff',
            self::Student => 'Student',
            self::Parent => 'Parent',
        };
    }
}