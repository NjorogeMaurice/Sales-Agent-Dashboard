import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl} from '@angular/forms';
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
  newInvoiceNumber = '';
  deleteInvoiceNumber:any;
  deleteForm = false;




  constructor(private route: ActivatedRoute,private dataService:DataService,private fb: FormBuilder) { }

 

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        await this.getSchool(id);
        
      } else {
        // Handle the case where id is not a valid number
        // To - complete ***
      }
    });

    const invoiceNumber =  this.generateRandomString(4);
    this.invoiceForm = new FormGroup({
      invoice_number: new FormControl('INV'+invoiceNumber),
      invoice_item: new FormControl(),
      creation_date: new FormControl(),
      due_date: new FormControl(),
      amount: new FormControl(),
      paid_amount:new FormControl(),
      status: new FormControl(),
      balance: new FormControl(),
      days_until_due:new FormControl()
    });

  }

  generateRandomString(length: number): string {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
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

  editStates: { [key: number]: boolean } = {};

  enableEdit(invoiceId:number){
    this.editStates[invoiceId]=true;
    console.log("hello");
  }

  async disableEdit(schoolId: number) {
    this.editStates[schoolId] = false;
    console.log("hello")
    await this.dataService.updateInvoice(this.id,this.schoolid)
    this.getSchool(this.id);
    
  }
  
  enableInputForm(){
    this.inputData = true;
  }
  disableInputForm() {
    this.inputData = false;
  }

  generateCollectionNumber(): string {
    // For simplicity, let's say you're appending 'COL' with a random number for now
    return 'COL' + Math.floor(Math.random() * 1000);
  }

createCollection(invoiceNumber: string, amount: number): any {
    const collectionNumber = this.generateCollectionNumber();
    const dateOfCollection = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const status = "Valid";
  
    return {
      collection_number: collectionNumber,
      invoice_number: invoiceNumber,
      date_of_collection: dateOfCollection,
      status: status,
      amount: amount
    };
  }


  async onSubmit(){
    this.schoolid['collections'].push(this.createCollection(this.invoiceForm.value.invoice_number,this.invoiceForm.value.amount))
    this.schoolid['invoices'].push(this.invoiceForm.value);
    await this.dataService.updateInvoice(this.id,this.schoolid);
    window.location.reload();
   
  }

  cancelInvoiceDeletion(){
    this.deleteForm = false;
  }


  removeInvoiceByNumber(invoiceNumber:any) {

    this.deleteInvoiceNumber = invoiceNumber;
    this.deleteForm = true;
    
    
     // Return false if the invoice with the specified invoice number is not found
}

async confirmInvoiceDeletion(invoiceNumber:any){
//Find the index of the invoice with the specified invoice number
    const index = this.schoolid['invoices'].findIndex((invoice: { invoice_number: any; }) => invoice.invoice_number === invoiceNumber);
    
    // If the invoice with the specified invoice number is found
    if (index !== -1) {
        // Remove the invoice from the array
        // Find the index of the corresponding collection in the collections array
        const collectionIndex = this.schoolid['collections'].findIndex((collection: any) => collection.invoice_number === invoiceNumber);

        if (collectionIndex !== -1) {
          // Remove the corresponding collection from the collections array
          this.schoolid['collections'].splice(collectionIndex, 1);
        }
        this.schoolid['invoices'].splice(index, 1);
         // Return true to indicate successful removal
        await this.dataService.deleteInvoice(this.id,this.schoolid);
        window.location.reload();
    }
    else{
      alert(false);
      window.location.reload();
    
    }
}
   
  
}
