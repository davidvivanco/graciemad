import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

export class StoreUtils<T> {

  private state$: Subject<Partial<T>>;

  setState(state: Partial<T> = {}) {
    this.state$ = new BehaviorSubject<Partial<T>>(state);
  }

  getState() {
    if (!this.state$) this.setState();
    return this.state$.asObservable();
  }

  updateState(state: Partial<T>) {
    if (!this.state$) this.setState();
    this.state$.next(state);
  }

  completeState() {
    if (this.state$) this.state$.complete();
  }

  resetState() {
    this.state$ = new BehaviorSubject<Partial<T>>({});
  }

  stateIsComplete(): boolean {
    return this.state$ ? this.state$.isStopped : true;
  }

}
