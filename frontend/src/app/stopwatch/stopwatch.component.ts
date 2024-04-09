import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  template: '',
  standalone: true
})
export class StopwatchComponent implements OnChanges, OnDestroy, OnInit {
  @Input() isOpen: boolean = false;
  @Input() isRunning: boolean = false;
  @Output() timeChange: EventEmitter<string> = new EventEmitter<string>();
  
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  milliseconds: number = 0;

  intervalId: any;

  ngOnInit() {
    this.updateTime();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isRunning'] && changes['isRunning'].currentValue) {
      this.startStopWatch();
    } else {
      this.stopStopWatch();
    }

    if (changes['isOpen'] && !changes['isOpen'].currentValue) {
      this.resetTime();
    }
  }

  ngOnDestroy() {
    this.stopStopWatch();
  }

  startStopWatch() {
    this.intervalId = setInterval(() => {
      if (this.isRunning) {
        this.milliseconds += 1.6; // We do this because the setInterval function is not entirely accurate

        if (this.milliseconds >= 100) {
          this.milliseconds = 0;
          this.seconds++;
        }

        if (this.seconds >= 60) {
          this.seconds = 0;
          this.minutes++;
        }

        if (this.minutes >= 60) {
          this.minutes = 0;
          this.hours++;
        }

        this.updateTime();
      }
    }, 1);
  }

  updateTime() {
    const padded = (value: number) => Math.floor(value).toString().padStart(2, '0');
    const timeString = `${padded(this.hours)}:${padded(this.minutes)}:${padded(this.seconds)}.${padded(this.milliseconds)}`;
    this.timeChange.emit(timeString);
  }

  stopStopWatch() {
    clearInterval(this.intervalId);
  }

  resetTime() {
    this.stopStopWatch();
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.milliseconds = 0;
    this.updateTime();
  }
}
