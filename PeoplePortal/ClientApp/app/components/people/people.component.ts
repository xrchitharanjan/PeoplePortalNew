import { Directive, ChangeDetectionStrategy, Component, Input, OnInit, Injectable } from '@angular/core';
import { ImageService } from '../../services/imageservice.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'spa-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css'],
  providers: [ImageService],
  //changeDetection: ChangeDetectionStrategy.OnPush
})


@Injectable()
export class PeopleComponent implements OnInit {
  @Input()
  public id: number = 0;
  @Input()
  public firstname: string = "";
  @Input()
  public gender: string = "";
  @Input()
  public profilepic: string = "";

  public errorMessage: any;
  public ProfilePicUrl: string = "http://localhost:41627/api/images/profileimage/51";
  public sanitzedImageData: any;

  ngOnInit(): void {
    //console.log(this.id);
    //console.log(this.firstname);
    //console.log(this.gender);

    //this._ImageService.getProfilePicture(this.id).subscribe((data) => {
    //  this.ProfilePicUrl = data;
    //});

    //this.getProfilePicture(this.id);
    // this.getProfileImage(this.id);
    //this.getProfilePicUrl();
    //this.ProfilePicUrl = "https://wallpapers.pub/web/wallpapers/birds-water-spray-wallpaper/3840x2160.jpg";
  }

  constructor(private _ImageService: ImageService, private sanitizer: DomSanitizer) {

  }


  public getProfileImage(peopleId: number) {
    this._ImageService.getProfilePicture(peopleId)
      .subscribe((data) => {
        this.ProfilePicUrl = data;
        debugger;

      }, error => {
        console.log(error);
        this.errorMessage = error
      })
  }
  getProfilePicUrl():any {

    return this._ImageService.getProfileImageUrl(this.id)
  }

  public getProfilePicture(peopleId: number) {
    debugger;
    this._ImageService.getProfilePicture(this.id).subscribe((data) => {
      this.ProfilePicUrl = data;
    });
    //return this.ProfilePicUrl;

    //this.ProfilePicUrl = this._ImageService.getProfileImageUrl(peopleId);
    //this.ProfilePicUrl = this._ImageService.getProfilePicture(peopleId);
    //debugger;
    //return this._ImageService.getProfilePicture(peopleId);
    //this._ImageService.getProfileImage(peopleId)
    //  .subscribe((data) => {
    //    debugger;
    //    this.ProfilePicUrl = data;
    //    this.sanitzedImageData = this.sanitizer.bypassSecurityTrustUrl(data);
    //    //this.ProfilePicUrl =this.createImageFromBlob(data.blob());
    //  }, error => {
    //    console.log(error);
    //    this.errorMessage = error
    //  })    
  }

  public getImage = function (data) {
    debugger;
    if (data != undefined && data != null) {
      return 'data:image/jpeg;base64,' + data.imageFile;
    }
  }

  createImageFromBlob(image: Blob) {
    debugger;
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      return reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public dataURItoBlob(dataURI) {
    const byteString = atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
    return blob;
  }
}
