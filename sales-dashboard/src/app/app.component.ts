import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent implements OnInit {
  title = 'sales-dashboard';
  asideOpen = false;
  schoolOpen = false;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {





}

  toggleAside() {
    this.asideOpen = !this.asideOpen;
  }

  closeAside() {
    this.asideOpen = false;
  }

  toggleSchool() {
    this.schoolOpen = true;
  }

  toggleDashboard() {
    this.schoolOpen = false;
  }



}
