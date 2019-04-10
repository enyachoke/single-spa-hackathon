import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { PatientSearchService } from './services/patient-search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.css']
})
export class PatientSearchComponent implements OnInit {
  public patients: [];
  public title: string = 'Patient Search';
  public adjustInputMargin: string = '240px';
  public errorMessage: string = '';
  public hasConductedSearch: boolean = false;
  public hideResults: boolean = false;
  public isLoading: boolean = false;
  public isResetButton: boolean = true;
  public lastSearchString: string = '';
  public noMatchingResults: boolean = false;
  public page: number = 1;
  public subscription: Subscription;
  public totalPatients: number;
  private _searchString: string;

  public get searchString(): string {
    return this._searchString;
  }
  
  public set searchString(v: string) {
    this._searchString = v;
    this.hasConductedSearch = false;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private patientSearchService: PatientSearchService) { }

  public ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['reset'] !== undefined) {
        this.resetSearchList();
      } else {
        this.errorMessage = '';
        this.patientSearchService.patientSearchResults.pipe(take(1))
          .subscribe((patients) => {
            this.onResultsFound(patients);
          },
          (error) => {
            this.onError(error);
          });
      }
    });
  }

  public onResultsFound(results) {
    if (results.length > 0) {
      this.patients = results;
      this.totalPatients = this.patients.length;
      this.hideResults = false;
    } else {
      this.patients = [];
      this.totalPatients = 0;
      this.hideResults = true;
    }
    this.searchString = '';
    this.hasConductedSearch = true;
  }

  public onError(error) {
    this.isLoading = false;
    this.resetInputMargin();
    console.error('error', error);
    this.errorMessage = error;
    this.hasConductedSearch = false;
  }

  public loadPatient(): void {
    this.totalPatients = 0;
    if (this.subscription) {
      this.subscription.unsubscribe();
    } 
    if (this.searchString && this.searchString.length > 2) {
      this.isLoading = true;
      this.patients = [];
      this.errorMessage = '';
      this.subscription = this.patientSearchService.searchPatient(this.searchString)
        .subscribe((data) => {
          this.isLoading = false;
          const searchTerm = this.searchString;
          this.onResultsFound(data);
          if (data.length === 0) {
            this.noMatchingResults = true;
            this.lastSearchString = searchTerm;
          }
          this.resetInputMargin();
        },
        (error) => {
          this.onError(error);
        });
      this.isResetButton = true;
    }
  }

  public resetSearchList() {
    this.hideResults = true;
    this.patientSearchService.resetPatients();
    this.searchString = '';
    this.totalPatients = 0;
    this.isResetButton = false;
    this.isLoading = false;
    this.hasConductedSearch = false;
    this.resetInputMargin();
    this.noMatchingResults = false;
  }

  public updatePatientCount(search) {
    if (this.totalPatients > 0 && search.length > 0) {
      this.totalPatients = 0;
    }
    this.noMatchingResults = false;
  }

  public resetInputMargin() {
    if (window.innerWidth > 768) {
      this.adjustInputMargin = '240px';
    }
  }
}
