import { Component, OnInit } from "@angular/core";
import { trackById } from "../../../../utils/track-by";
import { Notification } from "../interfaces/notification.interface";

@Component({
  selector: "vex-toolbar-notifications-dropdown",
  templateUrl: "./toolbar-notifications-dropdown.component.html",
  styleUrls: ["./toolbar-notifications-dropdown.component.scss"],
})
export class ToolbarNotificationsDropdownComponent implements OnInit {
  notifications: Notification[] = [];

  trackById = trackById;

  constructor() {}

  ngOnInit() {}
}
