import {FC} from "react";
import styles from './flightItem.module.scss'
import ItemContent from "./ItemContent.tsx";
import { getDayOfWeek, getMonthOfYear } from "../../helpers/data-helpers.ts";

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
    image: string
}





const FlightItem: FC<FlightItemProps> = ({data, image}) => {

    const startTime = data.legs[0].segments[0].departureDate
    let ind = startTime.indexOf('T')
    console.log(startTime.slice(ind + 1, ind + 6))
    // console.log(startTime.slice(0, ind).split('-').reverse().join('-'))
    console.log(new Date(startTime).toLocaleString())
    console.log(new Date(startTime).getDate())



    console.log(getDayOfWeek(startTime))
    console.log(startTime)
    console.log(getMonthOfYear('2020-08-02'))

    const segmentsQuantityFirstLeg = data.legs[0].segments.length
    const segmentsQuantitySecondLeg = data.legs[1].segments.length


    return (
        <div className={styles.flightItem}>
            <div className={styles.itemHeader}>
                <img src={image}/>
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