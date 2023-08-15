import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-widget-main',
  templateUrl: './weather-widget-main.component.html',
  styleUrls: ['./weather-widget-main.component.css']
})
export class WeatherWidgetMainComponent {

  WeatherData: any;
  apiKey = 'cf77a0a9198c0ffcf8c3d9720b17bde9';
  city = ''; // Initialize with an empty string
  apiUrl = '';

  constructor(private http: HttpClient) {}

  convertUnixTimestampToTime(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);
    let hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes.substr(-2)} ${amPm}`;
  }

  isDayTime(): boolean {
    if (this.WeatherData && this.WeatherData.sys) {
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime >= this.WeatherData.sys.sunrise && currentTime <= this.WeatherData.sys.sunset;
    }
    return false;
  }
  fetchWeatherData() {
    this.apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=imperial`;
    this.http.get(this.apiUrl).subscribe((data: any) => {
      this.WeatherData = data;
      console.log(data);
    },
    (error) => {
      if (error.status === 404) {
        alert(`${this.city} not found`)
      }
    });
  }
}





