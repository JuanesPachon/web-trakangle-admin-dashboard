import { Component, inject, signal } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [BookingCardComponent, RouterLinkWithHref],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css',
})
export class BookingListComponent {
  
  private BookingService = inject(BookingService);
  bookings: any[] = [];

  ngOnInit() {
    this.BookingService.bookingList().subscribe({
      next: (bookings: any) => {
        const allExperienceIds: any[] = [];

        bookings.forEach((booking: any) => {
          booking.experiences.forEach((experience: any) => {
            allExperienceIds.push({
              ...experience.experienceId,
              user: booking.user[0],
            });
          });
        });
        this.bookings = allExperienceIds;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
