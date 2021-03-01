import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailPlaceholderComponent } from './email-placeholder/email-placeholder.component';
import { EmailShowComponent } from './email-show/email-show.component';
import { HomeComponent } from './home/home.component';
import { EmailResolverService } from "./email-resolver.service";
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: 'not-found', component: NotFoundComponent},
    {path: ':id', resolve:{email: EmailResolverService}, component: EmailShowComponent},
    {path: '', component: EmailPlaceholderComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InboxRoutingModule { }
