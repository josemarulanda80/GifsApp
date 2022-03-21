import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerachGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey : string='YU0Orq7oJq5BPIvUPCDC0lZ8uCdkbFrk'
  private servicioUrl:string ='https://api.giphy.com/v1/gifs'
  private _historial: string[] = [];
//'https://api.giphy.com/v1/gifs/search?api_key=YU0Orq7oJq5BPIvUPCDC0lZ8uCdkbFrk=Dragon ball z'

resultados:Gif[]=[]
constructor(private http: HttpClient) { 

  this._historial=JSON.parse(localStorage.getItem('historial')!)|| []
  this.resultados=JSON.parse(localStorage.getItem('resultados')!)|| []
  

}
  get historial() {

    return [...this._historial];
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase()
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial',JSON.stringify(this._historial) )
    }
    const params = new HttpParams()
    .set('api_key',this.apiKey)
    .set('limit',10)
    .set('q',query);

    this.http.get<SerachGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp)=>{
    console.log(resp.data);
    this.resultados=resp.data;
    localStorage.setItem('resultados',JSON.stringify(this.resultados))
    }
    )
    console.log(this._historial)
  }


}
