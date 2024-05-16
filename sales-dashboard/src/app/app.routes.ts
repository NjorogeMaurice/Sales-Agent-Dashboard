import { Routes } from '@angular/router';
import { SchoolDetailComponentComponent } from './school-detail-component/school-detail-component.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolsComponent } from './schools/schools.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'schools', component: SchoolsComponent },
    { path: 'schools/:id', component: SchoolDetailComponentComponent },
];
