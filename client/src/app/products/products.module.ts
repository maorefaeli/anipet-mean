import {NgModule} from "@angular/core";
import {ProductsComponent} from "./products.component";
import {ProductComponent} from "./product/product.component";
import {BrowserModule} from "@angular/platform-browser";
import {ProductService} from "../_services/product.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations:[
    ProductsComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
  ],
  providers: [
    ProductService,
  ]
})

export class ProductsModule {

}
