import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../shared/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private profileService: ProfileService) {}
  submitted: boolean;
  showSuccessMessage: boolean;
  formControls = this.profileService.form.controls;

  ngOnInit() {

  }

  onSubmit() {
    this.submitted = true;
    if (this.profileService.form.valid) {
      if (this.profileService.form.get('$key').value == null)
        this.profileService.addProfile(this.profileService.form.value);
        else
        this.profileService.updateProfile(this.profileService.form.value);
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
      this.submitted = false;
      this.profileService.form.reset();
    }
  }
  
  url: any= '';
  selectedFile = null;
  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => {
      this.url = (<FileReader>event.target).result;
    }
  }

  setDefaultPic() {
    this.url = "assets/placeholder.png";
  }

}