import { Component,inject, signal } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-booking-list',
  standalone: true,
  imports: [BookingCardComponent, RouterLinkWithHref],
  templateUrl: './booking-list.component.html',
  styleUrl: './booking-list.component.css'
})
export class BookingListComponent {
    private BookingService = inject(BookingService);
    bookings = signal<any>([])

    ngOnInit() {
      this.BookingService.bookingList().subscribe({
        next: (bookings: any) => {
          this.bookings.set(bookings);
          console.log(bookings)
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
}
