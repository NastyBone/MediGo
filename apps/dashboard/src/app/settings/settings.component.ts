import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { SettingsService } from './settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'medigo-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  @Output()
  closed = new EventEmitter();
  form!: FormGroup;
  sub$ = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.sub$.add(
      this.settingsService.getSettingsData().subscribe((settings) => {
        this.form.patchValue(
          {
            ...settings,
          },
          { emitEvent: false }
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.closeModal();
    this.sub$.unsubscribe();
  }

  closeModal(value = false): void {
    if (!value) {
      this.closed.emit();
    } else {
      this.settingsService.setConfigData(this.form.value).subscribe(() => {
        this.closed.emit();
      });
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.maxLength(30)]],
      rif: [
        null,
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.minLength(10),
        ],
      ],
      description: [null],
      type: [null, Validators.required],
    });
  }
}
