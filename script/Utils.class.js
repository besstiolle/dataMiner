export class Utils {

    static appendPre(message) {
        dmContent.appendChild(document.createTextNode(message + '\n'));
    }

    static toArray(map) {
        let a = [];
        const iterator = map.values();
        for (let i = 0; i < map.size; i++) {
            a.push(iterator.next().value);
        }
        return a;
    }

    static formatDate(d) {
        d = new Date(d.getTime() + (d.getTimezoneOffset() * 60000));
        return d.toISOString().split('T')[0];
    }

    static durationSeance(debut, fin){
        return (Date.parse(fin) - Date.parse(debut)) / 1000;
    }

    static maxDate(date1, date2){
        if(Date.parse(date1) > Date.parse(date2)){
            return date1
        } else {
            return date2
        }
    }

    static sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static hash(str) {
        return Array.from(str).reduce((hash, char) => 0 | (31 * hash + char.charCodeAt(0)), 0);
    }
}
