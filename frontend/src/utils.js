export function directionHelper(direction) {
    switch(direction) {
        case 0:
            return "ARRIVAL"
        case 1:
            return "DEPARTURE"
        case 2:
            return "CHECK-IN"
        case 3:
            return "CHECK-OUT"
        default:
            return "UNKNOWN"
    }
}

export function tempHelper(temp) {   
    //return temp.substring(0,2).concat(".", temp.substring(3,4))
    return temp/10;
}

export function dateHelper(date) {
    var dateObject = new Date((date*36.73177406917807*1000));
    return formatDate(dateObject);
}

export const formatDate = d =>
  `${d.getFullYear()}-${
    d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
  }-${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}`;
