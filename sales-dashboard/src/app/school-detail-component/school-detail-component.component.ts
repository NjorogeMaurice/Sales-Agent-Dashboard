import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-school-detail-component',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,RouterOutlet, RouterLink, RouterLinkActive,FormsModule,ReactiveFormsModule],
  templateUrl: './school-detail-component.component.html',
  styleUrl: './school-detail-component.component.css'
})
export class SchoolDetailComponentComponent {

  schoolid:any;
  schools:any;
  edit=false;
  id:any;
  updated:any;
  invoiceForm!: FormGroup;
  inputData = false;



  constructor(private route: ActivatedRoute,private dataService:DataService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.getSchool(id);
        
      } else {
        // Handle the case where id is not a valid number
        // To - complete ***
      }
    });

    this.invoiceForm = this.fb.group({
      invoice_number: ['', Validators.required],
      invoice_item: ['', Validators.required],
      creation_date: ['', Validators.required],
      due_date: ['', Validators.required],
      amount: ['', Validators.required],
      paid_amount: ['', Validators.required],
      balance: ['', Validators.required],
      status: ['', Validators.required],
      days_until_due: ['', Validators.required]
    });

  }

  getSchool(id: number): void {
    this.dataService.getSchools().subscribe(response=>{
      this.schools=response;
      for (var i = 0; i < this.schools.length; i++) {
        if (this.schools[i].id == id) {
          this.id=id
          console.log(this.id)

          this.schoolid =this.schools[i];
        }
    }
  });
  }

  enableEdit(){
    this.edit=true;
    console.log("hello");
  }
  async disableEdit() {
    this.edit = false;
    console.log("hello")
    this.dataService.updateInvoice(this.id,this.schoolid)
    window.location.reload();
  }
  
  enableInputForm(){
    this.inputData = true;
  }
  disableInputForm() {
    this.inputData = false;
  }

  async onSubmit(){
    this.schoolid['invoices'].push(this.invoiceForm.value);
    await this.dataService.updateInvoice(this.id,this.schoolid);
    window.location.reload();


   
  }
   
  
}
