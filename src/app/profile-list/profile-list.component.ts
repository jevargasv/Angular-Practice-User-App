import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss']
})
export class ProfileListComponent implements OnInit {

  constructor(private profileService: ProfileService) {}
  profileArray = [];
  showDeletedMessage: boolean;
  searchText: string = "";

  ngOnInit() {
    this.profileService.getProfiles().subscribe(
      list => {
        this.profileArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onDelete($key) {
    if (confirm('Are you sure to delete this record?')) {
      this.profileService.deleteProfile($key);
      this.showDeletedMessage = true;
      setTimeout(() => this.showDeletedMessage = false, 4000);
    }
  }

  filterCondition(profile) {
    return profile.fullName.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }

}
