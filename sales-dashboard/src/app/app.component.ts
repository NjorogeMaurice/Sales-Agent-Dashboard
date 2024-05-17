import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import Chart from 'chart.js/auto';


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
  top_card: any;
  signup_reviews: any;
  target:any;
  analyticsDataPie:any;
  financeDataPie:any;
  timetableDataPie:any;
  analyticsSignupBar: any;
  financeSignupBar: any;
  timetableSignupBar: any;
  schools:any;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getTopCard().subscribe(response => {
      this.top_card = response;
      // console.log(this.top_card);
    });

    this.dataService.getSignUpReviews().subscribe(response => {
      this.signup_reviews = response;
      // console.log(this.signup_reviews);
    });

    this.dataService.getTotalVisualizations().subscribe(response => {
      this.target = response;
      // console.log(this.target);
    });

    this.dataService.getSchools().subscribe(response => {
      this.schools = response;
      

    });




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
