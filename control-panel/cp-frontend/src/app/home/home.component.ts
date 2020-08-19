import {Component, OnInit} from '@angular/core';
import {VersionModel} from '../model/version.model';
import {ServerEventModel} from '../model/server-event.model';
import {HttpClient} from '@angular/common/http';
import {WebsocketService} from '../service/websocket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient, private ws: WebsocketService) {
  }

  version = '';
  events: ServerEventModel[] = [];

  ngOnInit(): void {
    this.http.get('api/version').subscribe(
      (data: VersionModel) => {
        this.version = data.name + ' ' + data.tag;
      }
    );
    this.ws.connect('ws://localhost:3000/websocket').subscribe((event: ServerEventModel) => {
      this.events.push(event);
    });
  }
}