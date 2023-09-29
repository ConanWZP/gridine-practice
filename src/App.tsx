import './App.scss'
import data from './flights.json'
import SortBar from "./components/SortBar/SortBar.tsx";
import FlightItem from "./components/FlightItem/FlightItem.tsx";
import AirFrance from './assets/Air_France_Logo.svg'
import AeroFlot from './assets/Aeroflot_Russian_Airlines_logo.svg'

const App = () => {
  //  console.log(data.result.flights[3].flight.legs[0].segments)
   // console.log(data.result.flights[3].flight.legs[1].segments)

    console.log(   data.result.flights[14].flight.legs   )
    console.log(data.result.flights[0].flight)

    const a = data.result.flights.map((fl) => fl.flight.carrier.caption)
   // let a = data.result.flights.filter((fl) =>
   // console.log(fl.flight.legs[0]?.segments[1]?.stops !== 0) )
  //  console.log(a[0].flight.legs)
    console.log([...new Set(a)]) // десять уникальных компаний

    const firstLegSegments = data.result.flights.map((fl) => fl.flight.legs[0].segments.length)
    const secondLegSegments = data.result.flights.map((fl) => fl.flight.legs[1].segments.length)
    const maxQuantityStops = Math.max(...firstLegSegments, ...secondLegSegments) - 1 // -1 т.к. длина сегментов = 1 - это без пересадок
    console.log(maxQuantityStops)
    const arrayWithQuantityStops = []
    for (let i = 1; i <= maxQuantityStops; i++) {
        arrayWithQuantityStops.push(i)
    }


    const arrayWithUniqCompany = ['LOT Polish Airlines', 'Аэрофлот - российские авиалинии']   // Тут компании, которые уже присутствуют на странице

   // console.log(b.length)
    console.log(data.result.flights.length)

  return (
      <div className={'wrapper'}>
          <div className={'container'}>
              <SortBar arrayWithQuantityStops={arrayWithQuantityStops} arrayWithUniqCompany={arrayWithUniqCompany} />
              <div className={'block'}>
                  <div>
                      <FlightItem data={data.result.flights[0].flight} image={AirFrance} />
                      <FlightItem data={data.result.flights[14].flight} image={AirFrance} />
                  </div>

                  <button>Показать еще</button>
              </div>
          </div>

      </div>
  )
};

export default App
