import { Component, OnInit } from "@angular/core";
import { User } from "./user";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user = new User();
  private isNew: boolean;
  private password: string;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {

  }

  ngOnInit() {
    this.route.data.subscribe((data: { user: User }) => {
      this.user = data.user;
      this.isNew = !this.user.userName;
    })
  }

  async save() {
    await this.userService.saveUser(this.user);
    this.router.navigate(['/user/admin']);
  }

}
