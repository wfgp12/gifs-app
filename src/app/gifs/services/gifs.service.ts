import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifService {

  public gifsList: Gif[] = [];

  private _tagHistory: string[] = [];
  private apiKey = "3AvGmvFXo00qVNZjRiK6qGt3GTbKecBR"
  private baseUrl = 'http://api.giphy.com/v1/gifs'

  constructor(private http: HttpClient) {
    this.loadLocalStorage()
    console.log('Gift Loaded!!')
  }

  get tagHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag !== tag);
    }
    this._tagHistory.unshift(tag.toLowerCase());
    this._tagHistory = this._tagHistory.splice(0, 10);
    this.saveLocalStorage()
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory))
  }

  private loadLocalStorage(): void {
    const listGif = localStorage.getItem('history');
    if (!listGif) return;
    this._tagHistory = JSON.parse(listGif);
    if (!this._tagHistory.length) return
    this.searchTag(this._tagHistory[0])
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.baseUrl}/search`, { params })
      .subscribe(resp => {
        this.gifsList = resp.data;
        console.log(resp.data);
      })
  }
}
