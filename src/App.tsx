import { usePromiseDebounce } from './Hooks/useDebounce';
import { useState, useEffect } from 'react';
import { default as WeatherWidget } from './Components/Weather';
import AsyncSelect from 'react-select/async';
import GoogleAPI from './Repositories/Places/GoogleAPI';
import OpenWeatherAPI from './Repositories/Weather/OpenWeatherAPI';
import Places from './Repositories/Places';
import Spinner from './Components/Elements/Spinner';
import Weather from './Repositories/Weather';
import './App.css';

let weather: Weather;
let places: Places;

type OptionType = {
  value: string;
  label: string;
};

function App() {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>();
  const [weatherData, setWeatherData] = useState<object | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      weather = OpenWeatherAPI(process.env.REACT_APP_OPENWEATHER_KEY);
      places = await GoogleAPI(process.env.REACT_APP_GOOGLE_PLACES_KEY).load();
      setIsReady(true);
    }
    init();
  }, []);

  useEffect(() => {
    const processPlace = async (place: string) => {
      setIsLoading(true);
      const loc = await places.getLatLng(place);
      const weatherData = await weather.getByLatLng(loc.lat, loc.lng);
      setWeatherData(weatherData);
      setIsLoading(false);
    };

    selectedOption && processPlace(selectedOption.value)
  }, [selectedOption]);

  const promiseOptions = usePromiseDebounce<OptionType[]>((inputValue: string) => {
      return places.suggest(inputValue);
  });

  const appJSX = (<>
      <div className="pt-10 pb-10 pl-3 pr-3">
        <AsyncSelect
          className="place-select-container"
          classNamePrefix="place-select"
          onChange={setSelectedOption}
          loadOptions={promiseOptions}
          noOptionsMessage={() => 'Please start typing'}
          isClearable={true}
          isSearchable={true}
        />
      </div>
      {isLoading && !weatherData && <Spinner />}
      {weatherData && <WeatherWidget
        isLoading={isLoading}
        {...weatherData}
      />}
  </>)

  return (
    <div className="App">
      {isReady ? appJSX : <Spinner className="pt-10" /> }
    </div>
  );
}

export default App;
