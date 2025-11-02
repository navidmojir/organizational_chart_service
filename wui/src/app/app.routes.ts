import { Routes } from '@angular/router';
import { OrganizationDetails } from './components/organization-details/organization-details';
import { Organizations } from './components/organizations/organizations';
import { AuthGuard } from 'my-angular-commons2';

export const routes: Routes = [
    {
        path: 'organizations',
        component: Organizations,
		canActivate: [AuthGuard]
    },
    {
        path: 'organization-details',
        component: OrganizationDetails,
		canActivate: [AuthGuard]
    },
    {
        path: 'organization-details/:id',
        component: OrganizationDetails,
		canActivate: [AuthGuard]
    }];
