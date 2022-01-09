import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe';
import { Stage } from 'src/app/models/stage';
import { StageDescription } from 'src/app/models/stage-description';

@Component({
  selector: 'app-stage-form',
  templateUrl: './stage-form.component.html',
  styleUrls: ['./stage-form.component.css']
})
export class StageFormComponent implements OnInit {
  @Input() stage?: StageDescription;
  @Input() index?: number;
  @Output() deleteEvent: EventEmitter<Stage> = new EventEmitter<Stage>();
  @Output() cancelEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() addStageEvent: EventEmitter<StageDescription> = new EventEmitter<StageDescription>();
  @Output() modifStageEvent: EventEmitter<StageDescription[]> = new EventEmitter<StageDescription[]>();
  stageGroup : FormGroup;
  labelButton: String = "";
  isModify: boolean = false;
  constructor() { 
    this.stageGroup = new FormGroup({
      title: new FormControl(),
      description: new FormControl()
    }
    );
  }

  ngOnInit(): void {
    if(this.stage) { this.labelButton = "Modifier" }
    else { this.labelButton = "Ajouter" }
  }

  delete() {
    this.deleteEvent.emit(this.stage)
  }

  submit() {
    if(this.stage) {
      this.modifStageEvent.emit([
        this.stage, // the old stage
        new StageDescription(0,
        this.stageGroup.get("title")!.value, [],
        this.stageGroup.get("description")!.value)]);
    }
    else {
      this.addStageEvent.emit(new StageDescription(0, 
        this.stageGroup.get("title")!.value, [],
        this.stageGroup.get("description")!.value));
    }
  }

  cancel() {
    if(!this.stage) {
      this.cancelEvent.emit();
    }
    else {
      this.isModify = false;
    }
  }

  selectToModify() {
    this.isModify = true;
    this.stageGroup = new FormGroup({
      title: new FormControl(this.stage!.title),
      description: new FormControl(this.stage!.description)
    });
  }

}
