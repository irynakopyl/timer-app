import { Component } from '@angular/core';
import { interval, timer } from "rxjs";
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  numbers = interval(1000);
  time: number = 0;
  isRunning: boolean = false;
  takeFourNumbers = this.numbers.pipe(takeWhile(it => this.isRunning === true));
  
  startTimer() {
     this.isRunning = true;
     this.takeFourNumbers.subscribe(x =>  {
     this.time++;}
    );
  }

  pauseTimer() {
    this.isRunning = false;
  }

  resetTimer() {
    this.time = 0;
  }
  
  stopTimer(){
    this.pauseTimer();
    this.resetTimer();
  }
}
