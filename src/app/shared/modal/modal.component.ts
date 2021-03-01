import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {

  @Output() dismiss  = new EventEmitter();

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    document.body.appendChild(this.element.nativeElement)
  }

  onDismissClick() {
    this.dismiss.emit();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.element.nativeElement.remove()
  }

}
