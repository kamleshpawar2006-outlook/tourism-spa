import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { TourismApiService } from '../services/tourism-api.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {
  branchForm!: FormGroup;
  places = [
    'ANDAMAN',
    'THAILAND',
    'DUBAI',
    'SINGAPORE',
    'MALAYSIA'
  ];
  branchId: any;
  constructor(private _tourismApiService: TourismApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.branchForm = this.formBuilder.group({
      branchName: ['andamanTours'],
      place: ['ANDAMAN'],
      website: ['www.andamanTours.com'],
      email: ['info@andamanTours.com'],
      contact: ['9988776655'],
      tariffs: this.formBuilder.array([])
    });
    this.addPlace();
  }

  get tariffs(): UntypedFormArray {
    return this.branchForm.get('tariffs') as UntypedFormArray;
  }

  addPlace() {
    let tariffs: UntypedFormArray = this.branchForm.get("tariffs") as UntypedFormArray;
    tariffs.push(this.formBuilder.group({
      place: ['ANDAMAN'],
      tariffAmount: ['50000'],
    }));
  }

  removeTariff(i: any) {
    this.tariffs.removeAt(i);
  }

  addBranch() {
    if(this.branchForm.valid) {
      this._tourismApiService.addBranch(this.branchForm.value).subscribe((response:any) => {
        // this.buildForm();
        this.branchId = response['branchId'];
      }, (error: HttpErrorResponse) => {
        alert(error.message);
        this.branchId = null;
      });
    } else {
      this.branchId = null;
      alert("Invalid form data");
    }
  }

}
