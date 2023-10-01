

export const conditionalFlights = (flights: any[], currentStops: number[], currentCompanies: string[], maxQuantityStops:number, arrayWithUniqCompany: string[]) => {

    let flightsArray = []

    if (currentStops.length === maxQuantityStops || currentStops.length === 0) {

        if (currentCompanies.length === arrayWithUniqCompany.length || currentCompanies.length === 0) {
            flightsArray.push(...flights)
        } else {
            flightsArray.push(...flights.filter(fl => currentCompanies.includes(fl.flight.carrier.caption)))
        }

    } else {

        if (currentCompanies.length === arrayWithUniqCompany.length || currentCompanies.length === 0) {
            flightsArray.push(...flights.filter(fl => currentStops.includes(fl.flight.legs[0].segments.length-1) && currentStops.includes(fl.flight.legs[1].segments.length-1) ))

        } else {
            flightsArray.push(...flights.filter(fl => currentStops.includes(fl.flight.legs[0].segments.length-1) && currentStops.includes(fl.flight.legs[1].segments.length-1) ).filter(fl => currentCompanies.includes(fl.flight.carrier.caption))   )
        }

    }


    return {flightsArray}

}