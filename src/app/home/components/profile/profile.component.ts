import { Component } from '@angular/core';
import { ProfileModel } from 'src/app/model/profile.model';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profileData: ProfileModel = {} as ProfileModel;
  constructor(private profileService: ProfileService) {
    const token = sessionStorage.getItem('token');
    if (token)
      this.profileService.getProfile(token).subscribe((data: ProfileModel) => {
        this.profileData = data;
        console.log('>>>>>', data);
      });
  }
}
