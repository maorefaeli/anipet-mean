import { Component, OnInit } from '@angular/core';
import { StoreService } from '../_services/store.service';
import Store from '../_models/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.sass']
})
export class StoresComponent implements OnInit {
  loadingStores = true;  
  storeForm: FormGroup;
  loading = false;
  submitted = false;
  errorMessage = '';
  stores: Store[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private storeService: StoreService) {
  }

  // convenience getter for easy access to form fields
  get f() { return this.storeForm.controls; }

  ngOnInit() {
    this.storeService.get().subscribe(
      data => {
        this.stores = data;
        this.loadingStores = false;
      },
      error => {
        this.stores = [];
        this.loadingStores = false;
      });
    this.storeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      lng: [0, [Validators.required]],
      lat: [0, [Validators.required]],
    });
  }

  delete(id: string) {
    this.errorMessage = '';
    this.storeService.delete(id).subscribe(
      data => this.stores = this.stores.filter(store => store.id !== id),
      error => this.errorMessage = 'Could not delete store'
    );
  }
  
  add() {
    this.errorMessage = '';
    this.submitted = true;

    // stop here if form is invalid
    if (this.storeForm.invalid) {
        return;
    }

    this.loading = true;

    this.storeService.add(this.f.name.value, this.f.lng.value, this.f.lat.value).subscribe(
      data => {
        this.loading = false;
        this.stores.unshift(data);
      },
      error => {
        this.errorMessage = 'Failed to add a new store';
        this.loading = false;
      },
    );
  }

  setLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.f.lng.setValue(position.coords.longitude);
        this.f.lat.setValue(position.coords.latitude);
      });
    }
  }
}
