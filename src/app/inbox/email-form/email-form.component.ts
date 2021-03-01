import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  @Input() email: Email;
  @Output() emailSubmit = new EventEmitter()

  emailForm: FormGroup;

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    const {from, to, subject, text, html} = this.email;
    this.emailForm = new FormGroup({
      from: new FormControl({value: from, disabled: true}),
      to: new FormControl(to, [Validators.required, Validators.email]),
      subject: new FormControl(subject, [Validators.required]),
      text: new FormControl(text, [Validators.required]),
    })
  }

  onSubmit() {
    if(this.emailForm.invalid) return;
    console.log(this.emailForm.value); //no (from) value because it is disabled (no need here for 'form' value because api doesn't neet it)
    console.log(this.emailForm.getRawValue); //get all values included disabled one
    this.emailSubmit.emit(this.emailForm.value)

  }

}
