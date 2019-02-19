import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragEnter, CdkDragExit, CdkDragStart, CdkDrag } from '@angular/cdk/drag-drop';
import { FormGroup, FormControl } from '@angular/forms';
import { Task } from '../task';
import { v4 as uuid } from 'uuid';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

title='Todo SPA Angular';
public editItem=false;
task:Task;
tasks:Task[];
public currentTasks:Task[];
public completedTasks:Task[];
editTaskId:any;

  public add_form : FormGroup = new FormGroup({
  description: new FormControl(),
})
    public edit_form : FormGroup = new FormGroup({
  description: new FormControl(),
})
    
  constructor( private taskService: TaskService) { }

  ngOnInit() {
    this.currentTasks=this.taskService.getCurrentTasks();
    this.completedTasks=this.taskService.getCompletedTasks();
  }
  submitAddTask() {
    if (this.add_form.value.description) {
        let newtask = {
      id:uuid(),
      done: false,
      description: this.add_form.value.description,
    }
    this.add_form.reset();
    this.taskService.addTask(newtask);
    this.currentTasks=this.taskService.getCurrentTasks();
    }
  }

  deleteTask(id) {
   this.tasks=this.taskService.getTasks();
     for(let i = 0; i < this.tasks.length; i++) {
      if(this.tasks[i].id == id) {
          this.tasks.splice(i, 1);
      }
    }

    this.taskService.deleteTask(id);
    console.log(this.tasks);
    this.currentTasks=this.taskService.getCurrentTasks();
    this.completedTasks=this.taskService.getCompletedTasks();
  }

  editTask(id) {
    this.editItem=true;
    this.editTaskId=id;
    let tasks=this.taskService.getTasks();
    this.task=tasks.find(p => p.id==id);
    this.edit_form.get('description').setValue(this.task.description);
  }

  submitSaveTask(editTaskId) {
    this.editItem=false;
    let tasks=this.taskService.getTasks();
    this.task=tasks.find(p => p.id==this.editTaskId);
    let oldTask=this.task;
    let newTask = {
      id:oldTask.id,
      done: oldTask.done,
      description: this.edit_form.value.description,
    }
    this.taskService.updateTask(oldTask, newTask);
    this.currentTasks=this.taskService.getCurrentTasks();
    }

    canselTask() {
    this.editItem=false;
    }

    drop(event: CdkDragDrop<string[]>) {
          console.log('Dropped card');
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
             console.log('moveItemInArray');
        } else {
        transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
        console.log('**********************');
        console.log(event.previousContainer.data);
        console.log(event.container.data);
        console.log(event.container.id);
        console.log(event.item.dropContainer.id);

        let containerId=event.container.id;
        let dropContainerId=event.item.dropContainer.id;
        let tasks=event.container.data;

        let oldTaskArray=[];
        let newTaskArray=[];
        tasks.forEach(function(item, i, tasks) {
          let oldTask:Task;
          let newTask:Task;
          let itemDataJson = JSON.stringify(item);
          console.log(itemDataJson);
          let itemDataObj = JSON.parse(itemDataJson);
          console.log(itemDataObj.done);
          oldTask=itemDataObj;
          oldTaskArray.push(oldTask);
          if (containerId==='cdk-drop-list-1' && dropContainerId==='cdk-drop-list-0') {
            itemDataObj.done=true;
            newTask=itemDataObj;
            newTaskArray.push(newTask);
          } else {
            itemDataObj.done=false;
            newTask=itemDataObj;
            newTaskArray.push(newTask);
          }

        });

        for (var i = 0; i < oldTaskArray.length; i++) {
          this.taskService.updateTask(oldTaskArray[i], newTaskArray[i]);
        }
         console.log('**********************');   
      }
    }


  exited(event: CdkDragExit<string[]>) {
  //  console.log('Exited (вышел): ', event.container.id);
  //   console.log('Exiteddata (вышел)', event.item.data);
  //  console.log('Card: ', event.item.dropContainer.id);
    if (event.container.id === event.item.dropContainer.id) {
    }
  //    console.log(event.container.data);
  }

 entered(event: CdkDragEnter<string[]>) {
    console.log('Entered: ', event.container.id);

    if (event.container.id !== event.item.dropContainer.id) {
    } 
            console.log(event.container.data);
             console.log(event.container);
  }




}
