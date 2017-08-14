import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./user.service";
import { AuthenticateService } from "../login/authenticate.service";
import { MdSnackBar } from "@angular/material";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user: User;
  private isNew: boolean;
  private password: string;

  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private router: Router,
              private authenticateService: AuthenticateService,
              private snackBar: MdSnackBar) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User, isNew: boolean }) => {
      this.user = data.user;
      this.isNew = data.isNew;
    });
  }

  async save() {
    if (this.isNew) {
      await this.authenticateService.registerUser(this.user, this.password);
    } else {
      await this.userService.saveUser(this.user);
    }
    this.router.navigate(['/user/admin']);
  }

}
