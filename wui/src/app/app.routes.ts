import { Routes } from '@angular/router';
import { AuthGuard } from 'my-angular-commons2';
import { OrganizationTree } from './components/organization-tree/organization-tree';

export const routes: Routes = [
    {
        path: '**',
        component: OrganizationTree,
		canActivate: [AuthGuard]
    }
];
