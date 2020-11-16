// Helper utils for table event (click) handlers

export function isEventValid($event: any, component: string, notifier: any): boolean {
  if ($event && typeof $event.value === 'undefined') {
    notifier.showWarn(component, 'No data in event selector!');
    return false;
  }
  // disallow if table operations except pick item
  else if ($event.value.length > 0 // if it's search operation
    || typeof $event.value.order !== 'undefined'
    || typeof  $event.value.page !== 'undefined') {
    return false;
  }

  return true;
}
