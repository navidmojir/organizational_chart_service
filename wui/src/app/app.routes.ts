import { Routes } from '@angular/router';
import { AuthGuard } from 'my-angular-commons2';
import { OrgChart } from './components/org-chart/org-chart';
import { DeviceTreeComponent } from './components/device-tree/device-tree.component';

export const routes: Routes = [
    {
        path: '**',
        component: DeviceTreeComponent,
		canActivate: [AuthGuard]
    }
];
