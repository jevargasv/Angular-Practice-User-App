import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable ({
    providedIn: 'root'
})
export class ProfileService {

    constructor(private firebase: AngularFireDatabase) {}
    profileList: AngularFireList<any>;

    form = new FormGroup({
        $key: new FormControl(null),
        fullName: new FormControl('', Validators.required),
        age: new FormControl('', [Validators.required, Validators.minLength(2)]),
        url: new FormControl('')
    });

    getProfiles() {
        this.profileList = this.firebase.list('profiles');
        return this.profileList.snapshotChanges();
    }

    addProfile(profile) {
        this.profileList.push({
            fullName: profile.fullName,
            age: profile.age,
            url: profile.url
        });
    }

    populateForm(profile) {
        this.form.setValue(profile);
    }

    updateProfile(profile) {
        this.profileList.update(profile.$key, {
            fullName: profile.fullName,
            age: profile.age,
            photo: profile.photo
        });
    }

    deleteProfile($key: string) {
        this.profileList.remove($key);
    }
}