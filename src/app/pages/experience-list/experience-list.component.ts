import { Component, inject, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ExperienceService } from '../../services/experience.service';
import { ExperienceComponent } from '../../components/experience/experience.component';

@Component({
  selector: 'app-experience-list',
  standalone: true,
  imports: [CardComponent, ExperienceComponent],
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

