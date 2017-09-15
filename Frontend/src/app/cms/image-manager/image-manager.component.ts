import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CmsService } from '../../services/cms.service';
import { MdDialog } from '@angular/material';
import { HttpEventType } from '@angular/common/http';
import { ImageInfo } from '../image-info';
import { ConfirmDialogComponent } from '../../dialog/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-image-manager',
  templateUrl: './image-manager.component.html',
  styleUrls: ['./image-manager.component.scss']
})
export class ImageManagerComponent implements OnInit {

  images: Observable<ImageInfo[]>;
  selectedFile: string;
  @ViewChild('fileInput') fileInput: ElementRef;
  @Input() category: string;

  constructor(private cmsService: CmsService, private dialog: MdDialog) {
  }

  ngOnInit() {
    this.refreshImages();
  }


  refreshImages() {
    this.images = this.cmsService.images();

  }

  uploading = false;
  uploadProgress = 0;

  upload() {
    let fileInput: HTMLInputElement = this.fileInput.nativeElement;
    this.uploadProgress = 0;
    this.uploading = true;
    this.cmsService.uploadImage(this.category, fileInput.files[0])
      .subscribe(event => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = (event.loaded / event.total) * 100;
        } else if (event.type == HttpEventType.Response) {
          this.uploading = false;
          this.refreshImages();
          fileInput.value = '';
          this.selectedFile = null;
          this.uploadProgress = 0;
        }
      });
  }

  deleteImage(imageInfo: ImageInfo) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {data: ConfirmDialogComponent.Options('Delete Image?', 'Delete', 'Cancel')});
    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.cmsService.deleteImage(imageInfo);
        this.refreshImages();
      }
    });
  }
}
