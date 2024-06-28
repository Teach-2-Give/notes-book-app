import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification.service';
import { BehaviorSubject } from 'rxjs';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationService]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show a message', (done) => {
    const testMessage = 'Test message';

    service.showMessage(testMessage);

    service.message$.subscribe((message) => {
      if (message === testMessage) {
        expect(message).toBe(testMessage);
        done();
      }
    });
  });

  it('should hide the message after 3 seconds', (done) => {
    const testMessage = 'Test message';

    service.showMessage(testMessage);

    service.message$.subscribe((message) => {
      if (message === testMessage) {
        setTimeout(() => {
          service.message$.subscribe((messageAfterTimeout) => {
            expect(messageAfterTimeout).toBeNull();
            done();
          });
        }, 3000); // Wait for 3 seconds
      }
    });
  });
});