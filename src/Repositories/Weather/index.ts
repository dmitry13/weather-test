export default interface Weather {
  getByLatLng: (lat: number, lng: number) => Promise<any>;
}

