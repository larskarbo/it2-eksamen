
var passordDB = [
	'Passord001',
	'Passord002',
	'Passord003',
	'Passord004',
	'Passord005',
	'Passord006',
	'Passord007',
	'Passord008',
	'Passord009',
	'Passord010',
]

var stemmer = {
	Rødt: 0,
	SV: 0,
	A: 0,
	SP: 0,
	MDG: 0,
	KrF: 0,
	V: 0,
	H: 0,
	FrP: 0,
	PIR: 0,
}

var prosentarFra2013 = {
	Rødt: 3.7,
	SV: 5,
	A: 23,
	SP: 4.2,
	MDG: 3.8,
	KrF: 2.8,
	V: 6.7,
	H: 28.2,
	FrP: 15.6,
	PIR: 4.3,
}

var database = {}

database.sjekkpassord = function (pass, cb) {
	var i = passordDB.indexOf(pass)
	if(i >= 0){
		// passordet finst!

		// slett det
		passordDB.splice(i,1)

		// send tilbake dei gode nyhetene
		cb()
	} else {
		// ouch, prøv igjen
		cb('Feil passord, prøv igjen')
	}
}

database.leggTilStemme = function (parti, cb) {
	stemmer[parti] += 1
	cb()
}

database.hentStemmer = function (cb) {
	cb(null, stemmer)
}

database.hent2013Stemmer = function (cb) {
	cb(null, prosentarFra2013)
}

module.exports = database