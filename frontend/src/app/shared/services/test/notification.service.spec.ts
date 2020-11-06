import { TestBed, inject } from '@angular/core/testing';

import { NotificationService } from '../notification-service';
import {NotificationsService} from 'angular2-notifications';

describe('Notification-service', () => {
  let notifications: NotificationsService;
  let ttsNotificationService: NotificationService;
  const defaultComponent = {
    id: null,
    timeOut: 1000,
    showProgressBar: false,
  };
  beforeEach(() => {
    notifications = jasmine.createSpyObj('NotificationsService', ['success', 'warn', 'error']);
    TestBed.configureTestingModule({
      providers: [NotificationService,
        {provide: NotificationsService, useValue: notifications}]
    });
  });

  beforeEach(() => {
    ttsNotificationService = TestBed.get(NotificationService);
  });

  it('should be created and should test defaultSettings', inject([NotificationService], (service: NotificationService) => {
    expect(service).toBeTruthy();
    expect(service.defaults.id).toBeNull();
    expect(service.defaults.timeOut).toBe(5000);
    expect(service.defaults.showProgressBar).toBeFalsy();
  }));

  it('expect to call success with values', () => {
    ttsNotificationService.showSuccess('Success', 'message', '1');
    defaultComponent.id = '1';
    defaultComponent.timeOut = 5000;
    expect(notifications.success).toHaveBeenCalledWith('Success', 'message', defaultComponent);
  });

  it('expect to call warning with values', () => {
    ttsNotificationService.showWarn('Warning', 'message2', '2', 2000);
    defaultComponent.id = '2';
    defaultComponent.timeOut = 2000;
    expect(notifications.warn).toHaveBeenCalledWith('Warning', 'message2', defaultComponent);
  });

  it('expect to call error with values', () => {
    ttsNotificationService.showError('Error', 'message3', '2', 2000);
    defaultComponent.id = '2';
    defaultComponent.timeOut = 2000;
    expect(notifications.warn).toHaveBeenCalledWith('Error', 'message3', defaultComponent);
  });
});
