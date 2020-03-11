import {NgModule} from "@angular/core";
import {ProductsComponent} from "./products.component";
import {ProductComponent} from "./product/product.component";
import {BrowserModule} from "@angular/platform-browser";
import {ProductService} from "../_services/product.service";
import {ReactiveFormsModule} from "@angular/forms";
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations:[
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  providers: [
    ProductService,
  ]
})

export class ProductsModule {

}
