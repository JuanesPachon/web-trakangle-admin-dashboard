import { Component, inject, signal } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  imports: [ExperienceCardComponent, CommonModule, ReactiveFormsModule, RouterLinkWithHref],
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.css'
})
export class ExperienceListComponent{

  private ExperienceService = inject(ExperienceService);
  experiences = signal<any>([])

  ngOnInit() {

    this.ExperienceService.ExperienceList(1).subscribe({
      next: (experience: any) => {
        this.experiences.set(experience.experiences);
        console.log(experience);
      },
      error: (error) => {
        console.log(error);
      }
    });
    
    if (localStorage.getItem('showExperienceNotification') === 'true') {
      this.activeNotification.update(value => !value);
      localStorage.removeItem('showExperienceNotification');
    }

  }

    // Create user Overlay logic

    showCreateOverlay = signal(false);
    activeNotification = signal(false);
  
    toggleCreateOverlay() {
      this.showCreateOverlay.update(value => !value);
    }
    errorMessage: string = '';

    createExperienceForm = new FormGroup({
      name: new FormControl("",{
        validators: [ Validators.required, Validators.minLength(5) ],
      }),
      price: new FormControl("",{
        validators: [ Validators.required, Validators.minLength(5) ],
      }),
      place: new FormControl("",{
        validators: [ Validators.required, Validators.minLength(5) ],
      }),
      description: new FormControl("",{
        validators: [ Validators.required, Validators.minLength(5) ],
      }),
      images: new FormControl("",{
        validators: [ Validators.required, ],
      }),
      
    })

    onSubmit(event: Event){
      if(this.createExperienceForm){
        this.ExperienceService.createExperience(this.createExperienceForm.value).subscribe({
          next: (Response)=>{
            window.location.reload();
            localStorage.setItem('showExperienceNotification', 'true');
          },
          error: (error)=>{
            if (error.status === 400) {
              this.errorMessage = error.error.errors[0];
            } else {
              this.errorMessage = 'An unexpected error occurred. Please try again later.';
            }
            console.log(error);
          }
        })
      }

    }
  
}

