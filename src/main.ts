import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router'; 
import { routes } from './app/app.routes';
import { provideStore } from '@ngxs/store'; 

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), provideStore(
[],
)
  ]
}).catch(err => console.error(err));