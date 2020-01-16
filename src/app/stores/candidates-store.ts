import { ObservableStore } from '@codewithdan/observable-store';
import { CandidatesState } from '../states/candidates-state';
import { tag } from 'rxjs-spy/operators';

const initialState = {
  candidates: [
    { name: 'marcos', votes: 5 },
    { name: 'marcos2', votes: 1 },
    { name: 'marcos3', votes: 11 },
    { name: 'marcos4', votes: 3 },
    { name: 'marcos5', votes: 5 },
  ],
};

export class CandidatesStore extends ObservableStore<CandidatesState> {
  constructor() {
    super({});
    this.setState(initialState, 'INIT_STATE');
    this.stateChanged = this.stateChanged.pipe(tag('CandidatesState'));
  }

  addVote(candidate: { name: string; votes: number }): void {
    this.setState({
      ...this.getState(),
      candidates: this.getState().candidates.map(c => {
        if (c.name === candidate.name) {
          return { ...c, votes: c.votes + 1 };
        }
        return c;
      }),
    });
  }

  addCandidate(name: string): void {
    this.setState({
      ...this.getState(),
      candidates: [...this.getState().candidates, { name, votes: 0 }],
    });
  }

  removeCandidate(candidate: { name: string; votes: number }) {
    const index = this.getState()
      .candidates.map(c => c.name)
      .indexOf(candidate.name);

    this.setState({
      ...this.getState(),
      candidates: [
        ...this.getState().candidates.slice(0, index),
        ...this.getState().candidates.slice(index + 1),
      ],
    });
  }
}
