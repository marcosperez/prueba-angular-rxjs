import { Store } from 'rxjs-observable-store';
import { CoffeeElectionState } from '../states/coffee-election-state';
import { Injectable } from '@angular/core';
import { tag } from 'rxjs-spy/operators';
import { create } from 'rxjs-spy';

@Injectable()
export class CoffeeElectionStore extends Store<CoffeeElectionState> {
  constructor() {
    super(new CoffeeElectionState());
    this.state$ = this.state$.pipe(tag('CoffeeElectionStore'));
  }

  addVote(candidate: { name: string; votes: number }): void {
    this.setState({
      ...this.state,
      candidates: this.state.candidates.map(c => {
        if (c === candidate) {
          return { ...c, votes: c.votes + 1 };
        }
        return c;
      }),
    });
  }

  addCandidate(name: string): void {
    this.setState({
      ...this.state,
      candidates: [...this.state.candidates, { name, votes: 0 }],
    });
  }

  removeCandidate(candidate: { name: string; votes: number }) {
    const index = this.state.candidates
      .map(c => c.name)
      .indexOf(candidate.name);

    this.setState({
      ...this.state,
      candidates: [
        ...this.state.candidates.slice(0, index),
        ...this.state.candidates.slice(index + 1),
      ],
    });
  }
}
