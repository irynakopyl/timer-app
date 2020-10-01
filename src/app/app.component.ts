import { Component, OnInit } from '@angular/core';
import { interval, timer } from "rxjs";
import { takeWhile } from 'rxjs/operators';
import { fromEvent,  } from 'rxjs'; 
import { map, bufferCount, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  numbers = interval(1000);
  time = 0;
  isRunning = false;
  takeFourNumbers = this.numbers.pipe(takeWhile(it => this.isRunning === true));
  clickCount = 2;
  clickTimespan = 300;
  ngOnInit(): void{
    const button = document.getElementById('wait');
    fromEvent(button, 'click').pipe(
      map(() => new Date().getTime()),
      bufferCount(this.clickCount, 1),
      filter((timestamps) => {
        return timestamps[0] > new Date().getTime() - this.clickTimespan;
      }))
      .subscribe(() => {
        this.pauseTimer();
      });
  }

  startTimer(): void {
     this.isRunning = true;
     this.takeFourNumbers.subscribe(x =>  {
     this.time++;
    }
    );
  }

  pauseTimer(): void {
    this.isRunning = false;
  }

  resetTimer(): void {
    this.time = 0;
  }

  stopTimer(): void{
    this.pauseTimer();
    this.resetTimer();
  }
}
