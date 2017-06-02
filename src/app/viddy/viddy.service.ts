import { Injectable } from '@angular/core';
import { Viddy } from './viddy';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ViddyService {
    private viddyUrl = '/api/fbvideos';

    constructor (private http: Http) {}

    // get("/api/fbvideos")
    getViddys(): Promise<Viddy[]> {
      return this.http.get(this.viddyUrl)
                 .toPromise()
                 .then(response => response.json() as Viddy[])
                 .catch(this.handleError);
    }

    // post("/api/fbvideos")
    createViddy(newViddy: Viddy): Promise<Viddy> {
      return this.http.post(this.viddyUrl, newViddy)
                 .toPromise()
                 .then(response => response.json() as Viddy)
                 .catch(this.handleError);
    }

    // get("/api/fbvideos/:id") endpoint not used by Angular app

    // delete("/api/fbvideos/:id")
    deleteViddy(delViddyId: String): Promise<String> {
      return this.http.delete(this.viddyUrl + '/' + delViddyId)
                 .toPromise()
                 .then(response => response.json() as String)
                 .catch(this.handleError);
    }

    // put("/api/fbvideos/:id")
    updateViddy(putViddy: Viddy): Promise<Viddy> {
      var putUrl = this.viddyUrl + '/' + putViddy._id;
      return this.http.put(putUrl, putViddy)
                 .toPromise()
                 .then(response => response.json() as Viddy)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}