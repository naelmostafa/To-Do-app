<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Permission::create(['name' => 'create-tasks']);
        Permission::create(['name' => 'edit-tasks']);
        Permission::create(['name' => 'delete-tasks']);


        $adminRole = Role::create(['name' => 'Admin']);
        $userRole = Role::create(['name' => 'User']);

        $adminRole->givePermissionTo([
            'create-tasks',
            'edit-tasks',
            'delete-tasks',
        ]);

        $userRole->givePermissionTo([
            'create-tasks',
            'edit-tasks',
            'delete-tasks',
        ]);
    }
}
