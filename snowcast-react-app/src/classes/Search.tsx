import { SnowResort } from './SnowResort';
import { getAllResortData } from '../components/PopularResorts';
import { IResortData, IOpenC } from '../types/allTypes';

export class SearchObj {
  query: string;
  results: IResortData[] | [];
  openCResponse: IOpenC | {};

  constructor(query: string) {
    this.query = query;
    this.openCResponse = [];
    this.results = [];
  }

// =============================================================================
// Class Methods
// =============================================================================
  fetchOpenCage = async (limit: number = 10): Promise<IOpenC> => {
    const openCageApiKey = process.env.REACT_APP_OPEN_CAGE_API_KEY;
    const requestUrl = `https://api.opencagedata.com/geocode/v1/json?q=${this.query}&key=${openCageApiKey}&limit=${limit}`;
    
    console.log('Fetching from Open Cage API');

    const res = await fetch(requestUrl);
    const data: IOpenC = await res.json();

    return data;
  }

  getResults = async (): Promise<IResortData[]> => {
    return this.fetchOpenCage(10)
      .then(openCResponse => {
        this.openCResponse = openCResponse;
        const resorts = openCResponse.results.map(result => {
          return new SnowResort(result.formatted)
        });
        return getAllResortData(resorts);
      })
      .then(allResortData => {
        return Promise.all(allResortData)
      });
  }
}