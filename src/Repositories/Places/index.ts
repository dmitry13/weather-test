export default interface Places {
  suggest: (query: string) => Promise<any>;
  getLatLng: (placeId: string) => Promise<any>;
}

