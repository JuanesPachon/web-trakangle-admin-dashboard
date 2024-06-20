import { Component, inject, signal } from '@angular/core';
import { ExperienceService } from '../../services/experience.service';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card.component';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  imports: [ExperienceCardComponent],
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

  }
}

