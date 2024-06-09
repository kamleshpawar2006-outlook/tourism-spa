import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TourismApiService } from '../services/tourism-api.service';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.component.html',
  styleUrls: ['./branch-list.component.css']
})
export class BranchListComponent implements OnInit {
  searchForm!: FormGroup;
  places = [
    'ANDAMAN',
    'THAILAND',
    'DUBAI',
    'SINGAPORE',
    'MALAYSIA'
  ];

  branches = [];

  constructor(private _tourismApiService: TourismApiService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      criteria: ['branchId'],
      criteriaValue: ['4']
    });
    this.search();
  }

  search() {
    this._tourismApiService.searchBranch(this.searchForm?.value?.criteria, this.searchForm?.value?.criteriaValue).subscribe((response:any) => {
      if(response.length > 0) {
        this.branches = response;
      } else {
        this.branches = [];
      }
    },(error:HttpErrorResponse)=> {
      this.branches = [];
    });
  }

}
