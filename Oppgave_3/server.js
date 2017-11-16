var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var nunjucks = require('nunjucks')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('styles'))
app.use(express.static('js'))
nunjucks.configure('templates', {
    autoescape: true,
    express: app
});

var database = require('./database.js')

/*/////////////////////////////////////////

Denne applikasjonen er laga med rein javascript-database
Det betyr at all data blir nullstilt ved restarting
av server

/////////////////////////////////////////*/


app.get('/', function (req, res) {
	res.render('main.html')
})

app.post('/', function (req, res) {
	var pass = req.body.pass

	database.sjekkpassord(pass, function (err) {
		if(err){
			return res.render('main.html', {err: err})
		}

		res.redirect('/stemme')
	})
})

app.get('/stemme', function (req, res) {
	// reelt ville det vert en sjekk her at
	// brukeren faktisk er logga inn
	res.render('stemme.html')
})

app.post('/stemme', function (req, res) {
	var parti = req.body.parti

	database.leggTilStemme(parti, function () {
		res.redirect('/stemmeergitt')
	})
})

app.get('/stemmeergitt', function (req, res) {
	res.render('takk.html')
})

app.get('/opptelling', function (req, res) {
	database.hentStemmer(function (err, stemmer) {

		// convert stemmer til array
		var arr = []
		for(parti in stemmer){
			arr.push({
				navn:parti,
				stemmer:stemmer[parti]*1
			})
		}

		// tell antall stemmer
		var totalt = arr.reduce((sum, p) => {
			return sum + p.stemmer
		}, 0)

		
		// regne prosentar
		arr = arr.map(parti => {
			var prosent = (parti.stemmer/totalt) * 100
			prosent = Math.round(prosent * 10) / 10 //runde av med 1 desimal
			if(isNaN(prosent)){
				prosent = 0
			}
			return {
				...parti,
				prosent
			}
		})

		// legg til prosentar fra 2013
		database.hent2013Stemmer(function (err, prosentar2013) {
			arr = arr.map(parti => {
				return {
					...parti,
					prosent2013:prosentar2013[parti.navn]
				}
			})

			// legg til prosentpoengvis endring
			// også rund av en gang til fordi
			// javascript kan tulle det til
			arr = arr.map(parti => {
				return {
					...parti,
					endring: Math.round((parti.prosent-parti.prosent2013)*10)/10
				}
			})

			res.render('opptelling.html', {stemmer: arr})
		})
	})
})

// start serveren

app.listen(1234, function () {
  console.log(`listening at 1234`)
})