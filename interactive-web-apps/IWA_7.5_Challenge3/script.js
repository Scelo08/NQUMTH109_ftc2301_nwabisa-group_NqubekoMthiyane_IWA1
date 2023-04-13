const leoName = 'Leo'
const leoSurname = 'Musvaire     '
const leoBalance = '-9394'

const sarahName = 'Sarah    '
const sarahSurname = 'Kleinhans'
const sarahBalance = '-4582.21000111'

const divider = '----------------------------------'

// Only change below this line

const leoOwed = Math.abs(parseFloat(leoBalance))

const sarahOwed = Math.abs(parseFloat(sarahBalance))


 


const owed = sarahOwed + leoOwed

const thousands = Math.trunc(owed/1000) 

const hundreds = owed%1000


const leo = `${leoName.trim()}  ${leoSurname.trim()}  (Owed  R ${leoOwed.toFixed(2)}})`
const sarah = `${sarahName.trim()} ${sarahSurname.trim()}  (Owed  R ${sarahOwed.toFixed(2)})`
const total = "\t Total amount owed: R"
const result = leo + "\n" + sarah + "\n \n" + divider + "\n" + total +  thousands + " " + hundreds.toFixed(2) + "\n" + divider
 
console.log(result)