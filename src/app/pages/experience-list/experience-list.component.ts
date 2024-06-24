import { Component, inject, signal } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  imports: [
    ExperienceCardComponent,
    CommonModule,
    ReactiveFormsModule,
    RouterLinkWithHref,
  ],
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.css',
})
export class ExperienceListComponent {
  private ExperienceService = inject(ExperienceService);
  experiences = signal<any>([]);

  ngOnInit() {
    this.ExperienceService.ExperienceList(1).subscribe({
      next: (experience: any) => {
        this.experiences.set(experience.experiences);
        console.log(experience);
      },
      error: (error) => {
        console.log(error);
      },
    });

    if (localStorage.getItem('showExperienceNotification') === 'true') {
      this.activeNotification.update((value) => !value);
      localStorage.removeItem('showExperienceNotification');
    }
  }

  // Create user Overlay logic

  showCreateOverlay = signal(false);
  activeNotification = signal(false);
  images: File[] = [];

  toggleCreateOverlay() {
    this.showCreateOverlay.update((value) => !value);
  }

  errorMessage: string = '';

  createExperienceForm = new FormGroup({
    name: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    price: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    place: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    description: new FormControl('', {
      validators: [Validators.required, Validators.minLength(5)],
    }),
    images: new FormControl(null, {
      validators: [Validators.required],
    }),
  });

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

  onSubmit(event: Event) {
    if (this.createExperienceForm.valid && this.images) {
      const formData = this.toFormData(this.createExperienceForm.value);
      this.ExperienceService.createExperience(formData).subscribe({
        next: (Response) => {
          window.location.reload();
          localStorage.setItem('showExperienceNotification', 'true');
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

  logOut() {
    localStorage.removeItem('admin_token');
    window.location.reload();
  }
}
