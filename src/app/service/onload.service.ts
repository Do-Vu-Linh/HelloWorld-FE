import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { errorLoader } from 'src/environments/environtment';

export interface ErrorLoader{
  status? : number;
  name? : string;
  path? : string;
  description? : string;
}

@Injectable({
  providedIn: 'root'
})
export class OnloadService {
  onload = false
  error : any

  constructor(
    private router : Router,
    private routerActive : ActivatedRoute
  ) {}

}
