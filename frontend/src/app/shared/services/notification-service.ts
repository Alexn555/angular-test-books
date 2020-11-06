import {Injectable} from '@angular/core';
import {NotificationsService} from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  defaults = {
    id: null,
    timeOut: 1000,
    showProgressBar: false,
  };

  constructor(private notificationService: NotificationsService) {
  }

  showSuccess(title: string, message: string, id?: string, timeout?: number): void {
    this.createDefaultSettings(id, timeout);
    this.notificationService.success(title, message, this.defaults);
  }

  showWarn(title: string, message: string, id?: string, timeout?: number): void {
    this.createDefaultSettings(id, timeout);
    this.notificationService.warn(title, message, this.defaults);
  }

  showError(title: string, message: string, id?: string, timeout?: number): void {
    this.createDefaultSettings(id, timeout);
    this.notificationService.error(title, message, this.defaults);
  }

  createDefaultSettings(id: string, timeout: number): void {
    this.defaults.id = id ? id : null;
    this.defaults.timeOut = timeout || 2000;
  }

  remove(id: string): void {
    this.notificationService.remove(id);
  }

}
