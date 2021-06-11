
function yesterday() {
    const today = new Date()
    const yesterday = new Date(today)

    yesterday.setDate(yesterday.getDate() - 1)
    return yesterday;
}
function today() {
    const today = new Date()
    return today
}

function tomorrow() {
    const today = new Date()
    const tomorrow = new Date(today)

    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow;
}

function ddmmyyyy(){
    const today = new Date()

    var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();

    return dd.toString()+mm.toString()+yyyy.toString();
}

function getyyyymmddFormattedDate(date){
    var dd = String(date.getDate()).padStart(2, '0');
	var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = date.getFullYear();
    return yyyy.toString()+"-"+mm.toString()+"-"+dd.toString();
}

function nextYear() {
	var nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear()+1);
    return nextYear;
}

module.exports={
    today:today,
    yesterday:yesterday,
    ddmmyyyy:ddmmyyyy,
    tomorrow:tomorrow,
    nextYear:nextYear,
    getddmmyyyyFormattedDate:getyyyymmddFormattedDate
}