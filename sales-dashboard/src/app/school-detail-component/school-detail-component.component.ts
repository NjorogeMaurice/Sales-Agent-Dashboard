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
  collectionForm!: FormGroup;
  inputData = false;
  inputCollection = false;
  newInvoiceNumber = '';
  deleteInvoiceNumber:any;
  deleteForm = false;
  all_schools:any;
  invoiceNumber='';
  searchText = '';




  constructor(private route: ActivatedRoute,private dataService:DataService,private fb: FormBuilder) { }

 

ngOnInit(): void {
    this.route.params.subscribe(async params => {
      const id = +params['id'];
      if (!isNaN(id)) {
        this.getSchool(id);
        console.log(this.schoolid)
        
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
      amount: new FormControl(0),
      paid_amount:new FormControl(0),
      status: new FormControl(),
      balance: new FormControl(0),
      days_until_due:new FormControl()
    });
    
    // Calculate the balance
    this.setupBalanceCalculation();

    this.collectionForm = new FormGroup({
      collection_number: new FormControl(this.generateCollectionNumber()),
      invoice_number: new FormControl(this.invoiceNumber),
      date_of_collection: new FormControl(new Date().toISOString().split('T')[0]),
      status: new FormControl('Valid'),
      amount: new FormControl(0),
    });

  }

  // Track changes in the amount and paid amount fields
  setupBalanceCalculation() {
    this.invoiceForm.get('amount')!.valueChanges.subscribe(() => this.calculateBalance());
    this.invoiceForm.get('paid_amount')!.valueChanges.subscribe(() => this.calculateBalance());
  }
  
  // Calculate the balance. Update the balance field 
  calculateBalance() {
    const amount = this.invoiceForm.get('amount')!.value || 0;
    const paidAmount = this.invoiceForm.get('paid_amount')!.value || 0;
    const balance = amount - paidAmount;

    this.invoiceForm.get('balance')!.setValue(balance);
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
this.dataService.getSchools().subscribe((response: any)=>{
      this.all_schools=response;
      this.schools = this.all_schools['schools']
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
    await this.dataService.updateInvoice(this.all_schools);
    await this.updateAndReload();
    
  }
  
  enableInputForm(){
    this.inputData = true;
  }
  disableInputForm() {
    this.inputData = false;
    this.inputCollection = false;
  }

  generateCollectionNumber(): string {
    // For simplicity, let's say you're appending 'COL' with a random number for now
    return 'COL' + Math.floor(Math.random() * 1000);
  }

newCollection(invoiceNumber: string, amount: number): any {
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

  async createnewCollection(invoiceNumber:any,amount:any){
    this.inputCollection = true;
    this.inputData=false;
    this.collectionForm.get('invoice_number')?.setValue(invoiceNumber);
  //   this.schoolid['collections'].push(this.newCollection(invoiceNumber,amount));
  //   await this.dataService.updateInvoice(this.all_schools);
  //   await this.updateAndReload();
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



  async onSubmit(){
    
    this.schoolid['invoices'].push(this.invoiceForm.value);
    await this.dataService.updateInvoice(this.all_schools);
    await this.updateAndReload();
    
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
 
        // Remove all collections with the specified invoice number
        this.schoolid['collections'] = this.schoolid['collections'].filter((collection: any) => collection.invoice_number !== invoiceNumber);

         // Remove the invoice from the invoices array
         this.schoolid['invoices'].splice(index, 1);
 
         // Perform the necessary asynchronous operations
         await this.dataService.deleteInvoice(this.id, this.all_schools);
         await this.updateAndReload();
    }
    else{
      alert(false);
      window.location.reload();
    
    }
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

checkCollectionStatus(collectionStatus:any){
  return collectionStatus=='Valid'? 'Bounced':'Valid';
}

// serach for invoices by number
matchesSearch(invoice: any): boolean {
  if(this.searchText.length<1){
     return this.schoolid;
  }

  return invoice.invoice_number.toLowerCase().includes(this.searchText.toLowerCase());
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
