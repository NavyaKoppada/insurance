import { trigger, transition, style, animate } from "@angular/animations";
import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { getAccessStatus } from "../helpers/session-storage-handler";
import { Roles } from "../constants/Roles";

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
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon("profit", this.domSanitizer.bypassSecurityTrustResourceUrl("../../../../assets/icons/profit.svg"));
  }

  navList: any = [];

  ngOnInit(): void {
    this.navList = [
      {
        title: "Dashboard",
        path: "/dashboard",
        group: false,
        display: !getAccessStatus(Roles.blockDashboardAccessRole),
        img: "home",
      },
      {
        title: "Add-Providers",
        path: "addProviders",
        display: !getAccessStatus(Roles.blockDashboardAccessRole),
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
        display: !getAccessStatus(Roles.blockDashboardAccessRole),
        img: "upload",
      },
      {
        title: "Providers",
        group: true,
        img: "people",
        display: !getAccessStatus(Roles.blockDashboardAccessRole),
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
      }
    ];
  }
  
  expandNavItems(index: number) {
    this.navList[index]["show"] = !this.navList[index]["show"];
  }
}
