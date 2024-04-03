
console.time('Start')
function convertDate(date, {seperator='-', originalFormat='yy/mm/dd', reqFormat='dd/mm/yy', reqSeperator='-'}) {
	let _date
	_date = date.split(`${seperator}`)
	if (originalFormat == 'yy/mm/dd') {
		if (reqFormat == 'dd/mm/yy' || reqFormat == 'dd-mm-yy')
			_date = dateStrFmt(2,1,0)
		if (reqFormat == 'yy/mm/dd' || reqFormat == 'yy-mm-dd')
			_date = dateStrFmt(0,1,2)
	}
	if (originalFormat == 'dd/mm/yy') {
		if (reqFormat == 'dd/mm/yy' || reqFormat == 'dd-mm-yy')
			_date = dateStrFmt(0,1,2)
		if (reqFormat == 'yy/mm/dd' || reqFormat == 'yy-mm-dd')
			_date = dateStrFmt(2,1,0)
	}
	function dateStrFmt(val0, val1, val2){
		return `${_date[val0]}${reqSeperator}${_date[val1]}${reqSeperator}${_date[val2]}`
	}
	console.timeEnd('End')
	return _date

}


console.log(convertDate('20/02/2024',{seperator:'/',originalFormat: 'dd/mm/yy', reqFormat: 'yy/mm/dd', }))
console.log(convertDate('2024/02/20',{seperator:'/', reqFormat: 'dd/mm/yy'}))
// 
console.log(convertDate('20-02-2024',{seperator:'-',originalFormat: 'dd/mm/yy' , reqFormat: 'yy-mm-dd'}))
console.log(convertDate('2024-02-20',{seperator:'-', reqFormat: 'dd/mm/yy'}))

