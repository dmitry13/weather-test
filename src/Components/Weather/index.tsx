type WeatherProps = {
  className?: string,
  isLoading?: boolean,
  title?: string,
  description?: string,
  temp?: string,
  tempMax?: string,
  tempMin?: string,
  feelsLike?: string,
  pressure?: string,
  humidity?: string,
  icon?: string
};

function Weather({
  isLoading,
  title,
  description,
  temp,
  icon
}: WeatherProps
  ) {
  return (
    <div className="max-w-md p-8 mx-auto rounded-lg dark:bg-slate-900 dark:text-gray-100 relative">
      <div className="flex justify-between space-x-8">
        <div className="flex flex-col items-center">
          <img width="100px" src={icon} alt="weather icon"/>
          <h1 className="text-xl font-semibold">{ title }</h1>
        </div>
        <div className="flex justify-between space-x-8">
        <div className="flex flex-col items-center">
          <span className="font-bold text-8xl mb-2">{ temp }°</span>
          <h2 className="text-s font-semibold">{ description }</h2>
        </div>
        </div>
      </div>
      {isLoading && <div className="absolute rounded-lg top-0 right-0 bottom-0 left-0 bg-white opacity-25">
      </div>}
    </div>
  )
}

export default Weather;
