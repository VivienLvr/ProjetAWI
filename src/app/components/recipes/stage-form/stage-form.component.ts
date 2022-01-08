import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe';
import { Stage } from 'src/app/models/stage';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements OnInit {
  @Input() private stage?: Stage;
  @Output() deleteEvent: EventEmitter<Stage> = new EventEmitter<Stage>();
  stageGroup : FormGroup;
  constructor() { 
    this.stageGroup = new FormGroup({
      descr: new FormControl()
    }
    );
  }

  ngOnInit(): void {
  }

  delete() {
    this.deleteEvent.emit(this.stage)
  }

  submit() {}

}
