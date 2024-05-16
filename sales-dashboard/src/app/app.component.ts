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

    this.analyticsDataPie = new Chart("analyticsChart", {
      type: 'pie', //this denotes tha type of chart

      data: this.target['analyticsData'],
      options: {
        aspectRatio:2.5
      }

    });

    this.financeDataPie = new Chart("financeChart", {
      type: 'pie', //this denotes tha type of chart

      data: this.target['financeData'],
      options: {
        aspectRatio:2.5
      }

    });

    this.timetableDataPie = new Chart("timetableChart", {
      type: 'pie', //this denotes tha type of chart

      data: this.target['timetableData'],
      options: {
        aspectRatio:2.5
      }

    });

    this.analyticsSignupBar = new Chart('analyticsBar', {
      type: 'bar',
      data: {
          labels: Object.keys(this.signup_reviews['ZikiAnalytics']),
          datasets: [{
              
              data: Object.values(this.signup_reviews['ZikiAnalytics']),
              backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });

  this.financeSignupBar = new Chart('financeBar', {
    type: 'bar',
    data: {
        labels: Object.keys(this.signup_reviews['ZikiFinance']),
        datasets: [{
            label: 'Zeraki Finance',
            data: Object.values(this.signup_reviews['ZikiFinance']),
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

this.timetableSignupBar = new Chart('timetableBar', {
  type: 'bar',
  data: {
      labels: Object.keys(this.signup_reviews['ZikiTimetable']),
      datasets: [{
          label: 'Zeraki Timetable',
          data: Object.values(this.signup_reviews['ZikiTimetable']),
          backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          y: {
              beginAtZero: true
          }
      }
  }
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
