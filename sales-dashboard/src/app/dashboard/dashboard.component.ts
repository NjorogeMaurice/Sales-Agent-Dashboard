import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service'
import Chart from 'chart.js/auto';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})


export class DashboardComponent {
  title = 'sales-dashboard';
  top_card: any;
  signup_reviews: any;
  target:any;
  analyticsLabel:any;
  analyticsDataset: any;
  financeLabel:any;
  financeDataset: any;
  timetableLabel:any;
  timetableDataset: any;
  analyticsData:any;
  financeData:any;
  timetableData:any;
  analyticsData1:any;
  financeData1:any;
  timetableData1:any;
  analyticsDataPie:any;
  financeDataPie:any;
  timetableDataPie:any;
  analyticsSignupBar: any;
  financeSignupBar: any;
  timetableSignupBar: any;



  constructor(private dataService:DataService) { }
 
  ngOnInit(): void {
    this.loadData();
}




async loadData(): Promise<void> {
  await this.dataService.getTopCard().subscribe(response => {
    this.top_card = response;
    // console.log(this.top_card);
  });



  await this.dataService.getTotalVisualizations().subscribe(response => {
    this.target = response;
    this.analyticsData = this.target['analyticsData'];
    this.financeData = this.target['financeData'];
    this.timetableData = this.target['timetableData'];
    this.loadCharts();
    
  });

  await this.dataService.getSignUpReviews().subscribe(response1 => {
    this.signup_reviews = response1;
    this.analyticsLabel=Object.keys(this.signup_reviews['analyticsData'])
    this.analyticsDataset =Object.values(this.signup_reviews['analyticsData']);

    this.financeLabel=Object.keys(this.signup_reviews['financeData'])
    this.financeDataset =Object.values(this.signup_reviews['financeData']);

    this.timetableLabel=Object.keys(this.signup_reviews['timetableData'])
    this.timetableDataset =Object.values(this.signup_reviews['timetableData']);
    this.loadBarChart();
    // console.log(this.signup_reviews);
    
  });
}

async loadCharts():Promise<void>{
  this.analyticsDataPie = new Chart('analyticsChart', {
    type: 'pie', //this denotes tha type of chart

    data: this.analyticsData,
    options: {
      aspectRatio:2.5
    }

  });

  this.financeDataPie = new Chart("financeChart", {
    type: 'pie', //this denotes tha type of chart

    data: this.financeData,
    options: {
      aspectRatio:2.5
    }

  });

  this.timetableDataPie = new Chart("timetableChart", {
    type: 'pie', //this denotes tha type of chart

    data: this.timetableData,
    options: {
      aspectRatio:2.5
    }

  });

}

loadBarChart():void{
  this.analyticsSignupBar = new Chart('analyticsBar', {
    type: 'bar',
    data: {
        labels: this.analyticsLabel,
        datasets: [{
            data: this.analyticsDataset,
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
      labels: this.financeLabel,
      datasets: [{

          data: this.financeDataset,
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
    labels: this.timetableLabel,
    datasets: [{
        label: 'Zeraki Timetable',
        data: this.timetableDataset,
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
updateChart(): void {
  if (this.analyticsDataPie) {
    this.analyticsDataPie.data = this.analyticsData;
    this.analyticsDataPie.update();
  }

  if (this.timetableDataPie) {
    this.timetableDataPie.data = this.timetableData;
    this.timetableDataPie.update();
  }
  if (this.financeDataPie) {
    this.financeDataPie.data = this.financeData;
    this.financeDataPie.update();
  }
}

updateBarChart():void{
  if(this.analyticsSignupBar){
  this.analyticsSignupBar.data={
        labels: this.analyticsLabel,
        datasets: [{
            data: this.analyticsDataset,
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
           
        }]
    }
    this.analyticsSignupBar.update();
  }

  if(this.financeSignupBar){
    this.financeSignupBar.data = {
      labels: this.financeLabel,
      datasets: [{
          label: 'Zeraki Finance',
          data: this.financeDataset,
          backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)'
          ],
          borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
          ]
          
      }]
  }
    this.financeSignupBar.update();
  }

  if(this.timetableSignupBar){
    this.timetableSignupBar.data = {
      labels: this.timetableLabel,
      datasets: [{
          label: 'Zeraki Timetable',
          data: this.timetableDataset,
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
          
      }]
  }
    this.timetableSignupBar.update();
  }
}
}
