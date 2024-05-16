import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-school-detail-component',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './school-detail-component.component.html',
  styleUrl: './school-detail-component.component.css'
})
export class SchoolDetailComponentComponent {
  schoolid:any;
  schools:any;


  constructor(private route: ActivatedRoute,private dataService:DataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.getSchool(id);
      } else {
        // Handle the case where id is not a valid number
      }
    });

  }

  getSchool(id: number): void {
    this.dataService.getSchools().subscribe(response=>{
      this.schools=response;
      for (var i = 0; i < this.schools.length; i++) {
        if (this.schools[i].id === id) {
          console.log(this.schools[i])
          this.schoolid =this.schools[i];
        }
    }
  });
  }
}
