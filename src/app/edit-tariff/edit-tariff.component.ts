import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TourismApiService } from '../services/tourism-api.service';

@Component({
  selector: 'app-edit-tariff',
  templateUrl: './edit-tariff.component.html',
  styleUrls: ['./edit-tariff.component.css']
})
export class EditTariffComponent implements OnInit {
  updated = false;
  branchId: any;
  branchForm!: FormGroup;
  places = [
    'ANDAMAN',
    'THAILAND',
    'DUBAI',
    'SINGAPORE',
    'MALAYSIA'
  ];
  loaded = false;
  constructor(private formBuilder: FormBuilder, private _tourismApiService: TourismApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.branchId = this.route.snapshot.paramMap.get('branchId');
    this._tourismApiService.searchBranch("branchId", this.branchId).subscribe((response:any) => {
      this.loaded = true;
      this.buildForm(response[0]);
    });
  }

  buildForm(branchResponse: any) {
    this.branchForm = this.formBuilder.group({
      branchName: [branchResponse.branchName],
      place: [branchResponse.place],
      website: [branchResponse.website],
      email: [branchResponse.email],
      contact: [branchResponse.contact],
      tariffs: this.formBuilder.array([])
    });
    this.addExistingPlace(branchResponse.tariffs);
  }

  get tariffs(): UntypedFormArray {
    return this.branchForm.get('tariffs') as UntypedFormArray;
  }

  addExistingPlace(responseTariffs: any) {
    responseTariffs.forEach((tariff:any) => {
      this.tariffs.push(this.formBuilder.group({
        place: [tariff.place],
        tariffAmount: [tariff.tariffAmount]
      }));
    });
  }

  addPlace() {
    this.tariffs.push(this.formBuilder.group({
      place: [''],
      tariffAmount: [''],
    }));
  }

  error: any = '';

  updateTariff() {
    if(this.branchForm.valid) {
      this._tourismApiService.updateTariff(this.branchId, this.tariffs.value).subscribe((response:any) => {
        this.error = "";
        if(response['response'] == "success") {
          this.updated = true;
        }
      }, (error: any) => {
        let messageArray = error.error.message;
        this.error = [];
        messageArray[0].split(",").forEach((err: any) => {
          this.error.push(err.split(":")[1]);
        });
        this.updated = false;
      });
    } else {
      this.updated = false;
      this.error = "Invalid form data";
    }
  }

}
