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
searchText: any;


  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getSchools().subscribe(response => {
      this.schools = response;

    });
  }

  get filteredSchools() {

      return this.schools.filter((response: any) => this.matchesSearch(response));
    
    
  }

  matchesSearch(school: any): boolean {
    return school.name.toLowerCase().includes(this.searchText.toLowerCase());
  }


}
