import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
public tasks:Task[];
public task:Task;

  constructor() { }

  getTasks() {
     this.tasks = JSON.parse(localStorage.getItem('todoSpaAngular'));
     return this.tasks;
	}

  getCurrentTasks() {
     let currentTasks=[];
     this.tasks = JSON.parse(localStorage.getItem('todoSpaAngular'));
     if (this.tasks!=null || this.tasks!=undefined ) { 
     this.tasks.forEach(function(item, i, tasks) {
      if (item.done===false) {
      currentTasks.push(item);
      }
    });
   } else {
     currentTasks=[];
   }
     return currentTasks;
   }

  getCompletedTasks() {
    let completedTasks=[];
     this.tasks = JSON.parse(localStorage.getItem('todoSpaAngular'));
     if (this.tasks!=null || this.tasks!=undefined ) { 
     this.tasks.forEach(function(item, i, tasks) {
      if (item.done===true) {
      completedTasks.push(item);
      }
    });
   } else {
     completedTasks=[];
   }
     return completedTasks;
  }

  addTask(task) {
      let tasks = JSON.parse(localStorage.getItem('todoSpaAngular'));
      if (this.tasks===null || this.tasks===undefined) {tasks=[];}
      tasks.unshift(task);
      localStorage.setItem('todoSpaAngular', JSON.stringify(tasks));
	}

  deleteTask(id) {
     let tasks = JSON.parse(localStorage.getItem('todoSpaAngular'));
     for(let i = 0; i <tasks.length; i++) {
      if(tasks[i].id == id) {
        tasks.splice(i, 1);
      }
   }
      localStorage.setItem('todoSpaAngular', JSON.stringify(tasks));
   }

  updateTask(oldTask, newTask){  
      let tasks = JSON.parse(localStorage.getItem('todoSpaAngular'));

     for(let i = 0; i <tasks.length; i++) {
      if(tasks[i].id == oldTask.id) {
        tasks[i] = newTask;
      }
   }
      localStorage.setItem('todoSpaAngular', JSON.stringify(tasks));
   }  
}
