import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './user.service';
import { AuthenticateService } from '../login/authenticate.service';
import { MdDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { isArray } from 'util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public user: User;
  public isNew: boolean;
  public password: string;
  public errorMessage: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private authenticateService: AuthenticateService,
              private dialog: MdDialog) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User, isNew: boolean }) => {
      this.user = data.user;
      this.isNew = data.isNew;
    });
  }


  async save() {
    if (this.isNew) {
      try {
        await this.authenticateService.registerUser(this.user, this.password);
      } catch (e) {
        if (isArray(e)) {
          this.errorMessage = e.join('\n');
        } else if (isArray(e.error)) {
          this.errorMessage = e.error.join('\n');
        } else {
          this.errorMessage = e;
        }
        return;
      }
    } else {
      await this.userService.saveUser(this.user, this.password);
    }
    this.router.navigate(['/user/admin']);
  }

  async grantAdmin() {
    await this.userService.grantAdmin(this.user.userName);
    this.user.isAdmin = true;
  }

  async revokeAdmin() {
    await this.userService.revokeAdmin(this.user.userName);
    this.user.isAdmin = false;
  }

  deleteUser() {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: ConfirmDialogComponent.Options(`Delete User ${this.user.userName}?`, 'Delete', 'Cancel')});
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.userService.deleteUser(this.user.id);

        this.router.navigate(['/user/admin']);
      }
    });
  }

}
