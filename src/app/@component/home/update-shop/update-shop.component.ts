import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {DialogData} from '../shops/shops.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ShopService } from 'src/app/@service/shop.service';
import {AuthService} from '../../../@service/auth.service';
import { User } from 'src/app/@models/user';

@Component({
  selector: 'app-update-shop',
  templateUrl: './update-shop.component.html',
  styleUrls: ['./update-shop.component.css']
})
export class UpdateShopComponent implements OnInit {
 shops;
  form: FormGroup;
  submitted: boolean = false;
  errorMsg:string='';
  currentUser:User;
  constructor(public dialogRef: MatDialogRef<UpdateShopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private shopService:ShopService,
    private router: Router,
    private authService: AuthService,
    ) { this.authService.currentUser.subscribe(x => this.currentUser = x); }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      imgURL: ['', Validators.required],
      contnent: ['', Validators.required],
    });
    this.shopService.getShops(this.currentUser._id).subscribe((data)=>{
      this.shops=data;
    })

  }
  get f() {
    return this.form.controls;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  Update(id){
   this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value,this.form)
    this.shopService.updateShop(id,this.form.value)
      .subscribe(
        data => {
          console.log(data);
          if(this.router.url.includes('shops'))
          {
            this.router.navigate(['/home/shop'])
          }
          else
          {
            this.router.navigate(['/home/shop'])
          }
        },
        error => {
          this.errorMsg = error.error || error.statusText;
          console.log(error);
        });
  }

}
