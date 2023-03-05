import Places from './';
import { Loader } from '@googlemaps/js-api-loader';

interface LoadablePlaces extends Places {
  load: () => Promise<any>
}

export default function GoogleAPI(apiKey: string | undefined): LoadablePlaces {
  let placesService: google.maps.places.AutocompleteService;
  let geocoder: google.maps.Geocoder;

  return {
    async load() {
      if (!apiKey) throw new Error('[GoogleAPI] No API key specified');

      await new Loader({
        apiKey: apiKey,
        version: 'weekly',
        libraries: ['places']
      }).load();

      placesService = new window.google.maps.places.AutocompleteService();
      geocoder = new window.google.maps.Geocoder();
      return this;
    },
    async suggest(query: string) {
      const request: google.maps.places.AutocompletionRequest = {
        input: query,
      };
      const response = await placesService.getPlacePredictions(request);

      return response.predictions.map((x) => ({
        value: x.place_id,
        label: x.description
      }));
    },
    async getLatLng(placeId: string) {
      const response = await geocoder.geocode({ placeId });
      const location = response.results[0].geometry.location;

      return {
        lat: location.lat(),
        lng: location.lng()
      }
    }
  }
}
