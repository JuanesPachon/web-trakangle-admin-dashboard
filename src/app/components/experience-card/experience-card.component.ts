import { Component, Input, inject, signal } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './experience-card.component.html',
  styleUrl: './experience-card.component.css',
})
export class ExperienceCardComponent {
  @Input() experience: any = {};

  private experienceService = inject(ExperienceService);

  // Edit user Overlay logic

  showEditExperienceOverlay = signal(false);
  activeEditExperienceNotification = signal(false);

  toggleEditExperienceOverlay() {
    this.showEditExperienceOverlay.update((value) => !value);
  }

  // Create Request

  errorMessage: string = '';

  editForm = new FormGroup({
    name: new FormControl(''),
    place: new FormControl(''),
    price: new FormControl(''),
    description: new FormControl(''),
    images: new FormControl(null),
  });

  // Edit Request

  images: File[] = [];

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.images = Array.from(files);
    }
  }

  toFormData(formValue: any) {
    const formData = new FormData();
    for (const key in formValue) {
      if (
        formValue.hasOwnProperty(key) &&
        formValue[key] !== null &&
        formValue[key] !== undefined
      ) {
        formData.append(key, formValue[key]);
      }
    }
    if (this.images && this.images.length > 0) {
      this.images.forEach((image) => {
        formData.append('images', image, image.name);
      });
    }
    return formData;
  }

  onEditSubmit(event: Event) {
    if (this.editForm.valid && this.images) {
      const formData = this.toFormData(this.editForm.value);
      this.experienceService.editExperience(formData, this.experience._id).subscribe({
          next: (experience) => {
            window.location.reload();
            localStorage.setItem('showEditExperienceNotification', 'true');
          },
          error: (error) => {
            if (error.status === 400) {
              this.errorMessage = error.error.errors[0];
            } else {
              this.errorMessage =
                'An unexpected error occurred. Please try again later.';
            }
            console.log(error);
          },
      });
    }
  }

  // delete experience logic

  deleteExperience() {
    this.experienceService.deleteExperience(this.experience._id).subscribe({
      next: () => {
        window.location.reload();
        localStorage.setItem('showDeleteExperienceNotification', 'true');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  activeDeleteExperienceNotification = signal(false);

  ngOnInit() {
    if (localStorage.getItem('showEditExperienceNotification') === 'true') {
      this.activeEditExperienceNotification.update((value) => !value);
      localStorage.removeItem('showEditExperienceNotification');
    }

    if (localStorage.getItem('showDeleteExperienceNotification') === 'true') {
      this.activeDeleteExperienceNotification.update((value) => !value);
      localStorage.removeItem('showDeleteExperienceNotification');
    }
  }
}
