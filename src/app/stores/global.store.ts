import { Injectable } from '@angular/core';
// import { CoffeeElectionStore } from './coffee-election.store';
import { CandidatesStore } from './candidates-store';

@Injectable()
export class GlobalStore {
  // public coffeeElectionStore: CoffeeElectionStore;
  public candidatesStore: CandidatesStore;

  constructor() {
    // this.coffeeElectionStore = new CoffeeElectionStore();
    this.candidatesStore = new CandidatesStore();
  }
}
