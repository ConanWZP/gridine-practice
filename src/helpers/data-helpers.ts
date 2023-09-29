export function getDay(date: string) {
    return new Date(date).getDate()
}

export function getTime(date: string) {
    let ind = date.indexOf('T')
    return date.slice(ind + 1, ind + 6)
}

export function getDayOfWeek(date: string) {
    const dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null :
        ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][dayOfWeek];
}

export function getMonthOfYear(date: string) {
    const dayOfWeek = new Date(date).getMonth();
    console.log(dayOfWeek)
    return isNaN(dayOfWeek) ? null :
        ['янв.', 'фев.', 'март', 'апр.', 'май', 'июнь', 'июль', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'][dayOfWeek];
}