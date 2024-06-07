export const fixData = (date: Date) => {
    let dateString = '';
    if(date){
        dateString = date.toString()
        dateString = dateString.replace('T', ' ')
        dateString = dateString.substring(0, dateString.length - 5);
    }

    return dateString
}