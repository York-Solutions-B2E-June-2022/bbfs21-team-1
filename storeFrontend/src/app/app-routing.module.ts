import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {ShopComponent} from "./pages/shop/shop.component";
import {ShoppingCartComponent} from "./pages/shopping-cart/shopping-cart.component";
import {EditProfileComponent} from "./pages/edit-profile/edit-profile.component";
import {ADMINUsersComponent} from "./pages/admin-users/admin-users.component";
import {ADMINAddUsersComponent} from "./pages/admin-add-users/admin-add-users.component";
import {PastOrdersComponent} from "./pages/past-orders/past-orders.component";

const routes:Routes = [
	{path: "", component: ShopComponent},
	{path:"signup", component: SignInComponent},
	{path:"cart", component: ShoppingCartComponent},
	{path:"edit", component: EditProfileComponent},
	{path: "users", component: ADMINUsersComponent },
	{path: "users/add", component: ADMINAddUsersComponent},
  {path: "pastOrders", component: PastOrdersComponent}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
	SignInComponent,
	ShopComponent,
	ShoppingCartComponent,
	EditProfileComponent,
	ADMINUsersComponent,
	ADMINAddUsersComponent
]
