import { trigger, transition, style, animate } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
  animations: [
    trigger("slideDown", [
      transition(":enter", [style({ height: 0 }), animate(250)]),
    ]),
  ],
})
export class SideNavComponent {

  navList: any = [];

  ngOnInit(): void {
    this.navList = [
      {
        title: "Dashboard",
        path: "/dashboard",
        group: false,
        display: true,
        img: "home",
      },
      {
        title: "Add-Providers",
        path: "addProviders",
        display: true,
        img: "person_add",
        // display: getAccessStatus(
        //   Roles.loginAccessRole,
        //   Roles.fullAccessRole
        // ),
      },
      {
        title: "Upload-File",
        path: "/upload-file",
        group: false,
        display: true,
        img: "upload",
      },
      {
        title: "Providers",
        group: true,
        img: "people",
        display: true,
        // display: getAccessStatus(
        //   Roles.loginAccessRole,
        //   Roles.fullAccessRole
        // ),
        navItems: [
          {
            title: "UHC",
            path: "providers/UHC",
            img: "person",
            display: true,
          },
          {
            title: "UHG",
            path: "providers/UHG",
            img: "person",
            display: true,
          },
          {
            title: "UHG",
            path: "people/off-shore",
            img: "person",
            // display: getAccessStatus(
            //   Roles.loginAccessRole,
            //   Roles.fullAccessRole
            // ),
          },
        ]
      },
      {
        title: "Invoices",
        path: "/invoices",
        group: false,
        display: true,
        img: "receipt_long",
      },
    ];
  }
  
  expandNavItems(index: number) {
    this.navList[index]["show"] = !this.navList[index]["show"];
  }
}
