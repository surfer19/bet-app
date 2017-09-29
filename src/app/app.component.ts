import {Component, AfterViewInit} from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'app';

  ngAfterViewInit() {
    $( document ).ready(function() {
      $('.nav.navbar-nav > li').on('click', function(e) {
        $('.nav.navbar-nav > li').removeClass('active');
        $(this).addClass('active');
      });
    });
  }
}
