import { Component } from '@angular/core';
import { GlobalStore } from '../stores/global.store';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  public formGroup: FormGroup;

  constructor(
    public globalStore: GlobalStore,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    // (window as any).gs = this.globalStore;

    this.globalStore.coffeeElectionStore.state$.subscribe(s => {
      console.log('State', s);
    });

    this.buildForm();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      newCandidateName: [null, [Validators.required, Validators.minLength(4)]],
    });

    this.formGroup.valueChanges.subscribe((fromData: any) =>
      console.log('newCandidateName', fromData.newCandidateName),
    );
  }

  onSubmit() {
    // Since we have  access to the FormGroup instance we can directly output the same
    if (this.formGroup.valid) {
      console.log('Agregando nuevo candidato');

      this.globalStore.coffeeElectionStore.addCandidate(
        this.formGroup.value.newCandidateName,
      );
    }

    this.formGroup.reset();
  }
}
