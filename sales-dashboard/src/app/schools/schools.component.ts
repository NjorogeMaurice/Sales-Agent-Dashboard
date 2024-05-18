import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from '../data.service'
import Chart from 'chart.js/auto';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,RouterOutlet, RouterLink, RouterLinkActive,FormsModule],
  templateUrl: './schools.component.html',
  styleUrl: './schools.component.css'
})
export class SchoolsComponent implements OnInit {
  schools:any;
searchText="";
loading=true;


  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getSchools().subscribe(response => {
      
      this.schools = response;
      this.schools = this.schools['schools'];
      this.loading = false; 
    },error => {
      console.error('Error fetching schools:', error);
      this.loading = false;  // Also set loading to false if there's an error
    });
  }

  get filteredSchools() {

      return this.schools.filter((response: any) => this.matchesSearch(response));
    
    
  }

  matchesSearch(school: any): boolean {
    if(this.searchText.length<1){
       return this.schools;
    }

    return school.name.toLowerCase().includes(this.searchText.toLowerCase());
  }


}
