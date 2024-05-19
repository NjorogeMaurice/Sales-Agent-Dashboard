import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DataService } from '../data.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-collections',
  standalone: true,
  imports: [RouterOutlet,CommonModule,HttpClientModule,RouterOutlet, RouterLink, RouterLinkActive,FormsModule,ReactiveFormsModule],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.css'
})
export class CollectionsComponent implements OnInit {
  invoice_number:any;
  all_schools: any;
  schools: any;
  id: any;
  schoolid: any;
  invoice:any;
  collections!:any;
  collectionForm!: FormGroup;
inputCollection=false;
collections_length=0;
  constructor(private route: ActivatedRoute,private dataService:DataService,private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.params.subscribe(async params => {
      this.id = +params['id'];
      this.invoice_number = params['invoice_number'];
      this.getSchool(this.id);
      
    
    });

    this.collectionForm = new FormGroup({
      collection_number: new FormControl(this.generateCollectionNumber()),
      invoice_number: new FormControl(this.invoice_number),
      date_of_collection: new FormControl(new Date().toISOString().split('T')[0]),
      status: new FormControl('Valid'),
      amount: new FormControl(0),
    });
  
  
  }

  enableInputForm(){
    this.inputCollection = true;
  }
  disableInputForm() {
    this.inputCollection = false;
  }

  async onCollectionSubmit(){
    this.schoolid['collections'].push(this.collectionForm.value);
    this.updateInvoiceBalanceAndPaidAmount(this.collectionForm.value.invoice_number,this.collectionForm.value.amount);
    await this.dataService.updateInvoice(this.all_schools);
    await this.updateAndReload();
  }

  updateInvoiceBalanceAndPaidAmount(invoiceNumber:any,amount:any){
    //Find the index of the invoice with the specified invoice number
    const index = this.schoolid['invoices'].findIndex((invoice: { invoice_number: any; }) => invoice.invoice_number === invoiceNumber);
     
    // If the invoice with the specified invoice number is found
    if (index !== -1) {
     this.schoolid['invoices'][index]['paid_amount']+=amount;
     this.schoolid['invoices'][index]['balance']-=amount;
    }
 }

  generateCollectionNumber(): string {
    // For simplicity, let's say you're appending 'COL' with a random number for now
    return 'COL' + Math.floor(Math.random() * 1000);
  }



    getSchool(id: number): void {
      this.dataService.getSchools().subscribe((response: any)=>{
            this.all_schools=response;
            this.schools = this.all_schools['schools']
            for (var i = 0; i < this.schools.length; i++) {
              if (this.schools[i].id == id) {
                this.id=id
                console.log(this.id)
      
                this.schoolid =this.schools[i];
                this.retrieveInvoice(this.invoice_number);
              }
          }
        });
        }

    retrieveInvoice(invoiceNumber:any){
    //Find the index of the invoice with the specified invoice number
        const index = this.schoolid['invoices'].findIndex((invoice: { invoice_number: any; }) => invoice.invoice_number === invoiceNumber);
        
        // If the invoice with the specified invoice number is found
        if (index !== -1) {
          this.invoice = this.schoolid['invoices'][index];

          this.collections=this.schoolid['collections'].filter((collection: any) => collection.invoice_number == invoiceNumber);
          this.collections_length = this.collections.length;

        }}

        checkCollectionStatus(collectionStatus:any){
          return collectionStatus=='Valid'? 'Bounced':'Valid';
        }

        async updateCollectionStatus(invoiceNumber:any,collectionStatus:any,collectionNumber:any){
          // Check for corresponding invoice
          const index = this.schoolid['invoices'].findIndex((invoice: { invoice_number: any; }) => invoice.invoice_number === invoiceNumber);
          if (index !== -1) {
            
             // Find the index of the corresponding collection in the collections array
             const collectionIndex = this.schoolid['collections'].findIndex((collection: any) => collection.collection_number === collectionNumber);
             if (collectionIndex !== -1) {
              // update status of the collection
              this.schoolid['collections'][collectionIndex]['status']=collectionStatus=='Valid'? 'Bounced':'Valid';
            }
        
            // Check if any collection has 'Bounced' status
            const hasBouncedCollection = this.schoolid['collections'].some((collection: any) => collection.status === 'Bounced' && collection.invoice_number === invoiceNumber);
        
            // Update the status of the invoice based on the collection statuses
            this.schoolid['invoices'][index]['status'] = hasBouncedCollection ? 'Pending' : 'Complete';
        
            this.dataService.deleteInvoice(this.id, this.all_schools);
            await this.updateAndReload();
          }
        }


        //overall code to update changes
async updateAndReload() {
  try {
    this.getSchool(this.id);
    // Wait for a short delay to ensure the update is processed (optional)
    await new Promise(resolve => setTimeout(resolve, 500));
    window.location.reload();
  } catch (error) {
    console.error('Error updating invoice:', error);
    // Handle errors accordingly
  }
}
}
