import { Component, OnInit } from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  onSave() {
    this.dataService.onSaveEdit()
  }
  onEdit() {
    this.dataService.onEditProfile()
  }
  onCancel() {
    this.dataService.onCancelEdit()
  }
  onDelete() {
    this.dataService.onDeleteProfile()
  }

}
