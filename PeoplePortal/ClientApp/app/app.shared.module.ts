import { NgModule } from '@angular/core';
import { PeopleService } from './services/peopleservice.service'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchPeopleComponent } from './components/fetchPeople/fetchPeople.component'
import { createPeople } from './components/addPeople/AddPeople.component'

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        FetchPeopleComponent,
        createPeople,
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'fetch-People', component: FetchPeopleComponent },
            { path: 'register-People', component: createPeople },
            { path: 'People/edit/:id', component: createPeople },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [PeopleService]
})
export class AppModuleShared {
}
