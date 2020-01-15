import { Injectable } from '@angular/core';
import { CoffeeElectionStore } from './coffee-election.store';

@Injectable()
export class GlobalStore {
  public coffeeElectionStore: CoffeeElectionStore;

  constructor() {
    this.coffeeElectionStore = new CoffeeElectionStore();
  }
}
