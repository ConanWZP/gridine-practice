import {FC} from "react";
import styles from './flightItem.module.scss'
import ItemContent from "./ItemContent.tsx";
import AirFrance from './../../assets/Air_France_Logo.svg'
import AeroFlot from './../../assets/Aeroflot_Russian_Airlines_logo.svg'
import Polish from './../../assets/LOT_Polish_Airlines.svg'
import AirBaltic from './../../assets/AirBaltic_logo.svg'
import BrusselsAir from './../../assets/Brussels_Airlines.svg'
import KLM from './../../assets/KLM_logo.svg'
import TurkishAir from './../../assets/Turkish_Airlines_logo_2012.svg'
import Finnair from './../../assets/Finnair_Logo.svg'
import Alitalia from './../../assets/Alitalia_CityLiner_logo_2017.svg'
import Pegasus from './../../assets/Pegasus_Airlines_logo.svg'


type uidCaption = {
    uid: string,
    caption: string
}

type segment = {
    arrivalAirport: uidCaption,
    arrivalCity: uidCaption,
    arrivalDate: string,
    departureAirport: uidCaption,
    departureCity: uidCaption,
    departureDate: string,
    airline: {
        uid: string,
        caption: string,
        airlineCode: string
    }

}

type leg = {
    duration: number,
    segments: segment[]
}

export type dataType = {
    carrier: {
        uid: string,
        caption: string,
        airlineCode: string
    },
    price: {
        total: {
            amount: string,
            currencyCode: 'RUB'
        }
    }
    legs: leg[]

}

interface FlightItemProps {
    data: dataType,
}


const imageKey: any = {
    "LOT Polish Airlines": Polish,
    "Air Baltic Corporation A/S": AirBaltic,
    "Air France": AirFrance,
    "Аэрофлот - российские авиалинии": AeroFlot,
    "Brussels Airlines": BrusselsAir,
    "KLM": KLM,
    "TURK HAVA YOLLARI A.O.": TurkishAir,
    "Finnair Oyj": Finnair,
    "Alitalia Societa Aerea Italiana": Alitalia,
    "Pegasus Hava Tasimaciligi A.S.": Pegasus
}


const FlightItem: FC<FlightItemProps> = ({data}) => {
    console.log(data.carrier.caption)
    const segmentsQuantityFirstLeg = data.legs[0].segments.length
    const segmentsQuantitySecondLeg = data.legs[1].segments.length
  //  console.log(imageKey[`${data.carrier.caption}`])

    return (
        <div className={styles.flightItem}>
            <div className={styles.itemHeader}>
                <img src={imageKey[data.carrier.caption]}/>
                <div className={styles.priceBlock}>
                    <div>{data.price.total.amount} ₽</div>
                    <div>Стоимость для одного взрослого пассажира</div>
                </div>
            </div>
            <ItemContent segmentsQuantity={segmentsQuantityFirstLeg} legNumber={0} data={data} />
            <div className={styles.itemDivider}></div>
            <ItemContent segmentsQuantity={segmentsQuantitySecondLeg} legNumber={1} data={data} />
            <div className={styles.itemButton}>
                ВЫБРАТЬ
            </div>
        </div>
    );
};

export default FlightItem;