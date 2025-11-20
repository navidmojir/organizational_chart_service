import { Routes } from '@angular/router';
import { AuthGuard } from 'my-angular-commons2';
import { OrgChart } from './components/org-chart/org-chart';

export const routes: Routes = [
    {
        path: '**',
        component: OrgChart,
		canActivate: [AuthGuard]
    }
];
