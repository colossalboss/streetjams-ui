import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerComponent } from './player/player.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { UploadComponent } from './upload/upload.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth.guard';
import { GalleryComponent } from './gallery/gallery.component';


const routes: Routes = [
  { path: "", component: PlayerComponent },
  { path: "register", component: RegisterComponent },
  { path: "login", component: LoginComponent },
  { path: "publish", component: UploadComponent, canActivate: [AuthGuard] },
  { path: "profile/:id", component: ProfileComponent, canActivate: [AuthGuard] },
  { path: "gallery", component: GalleryComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
