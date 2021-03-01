import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

import { MatchPasswords } from "../validators/match-passwords";
import { UniqueUsername } from "../validators/unique-username";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ], [
      this.uniqueUsername.validate
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  }, {
    validators: [this.matchPassword.validate]
  })

  constructor(
    private matchPassword: MatchPasswords,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.signupForm.invalid) return;
    this.authService.signup(this.signupForm.value).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/inbox');
      },
      error: (err) => {
        if(!err.status) {
          this.signupForm.setErrors({noConnection: true})
        } else {
          this.signupForm.setErrors({unknownError: true})
        }
      }
    })
  }

}
