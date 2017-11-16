


var myChart; //global

document.getElementById('form').addEventListener('submit', function(e) {
	e.preventDefault() // slik at den ikkje oppdaterer sida

	var rg = parseInt(document.getElementById('rg').value)
	var borgarleg = parseInt(document.getElementById('borgarleg').value)
	var størsteblokk = document.getElementById('storste')


	// skriv endring
	var resultat = endringProsentpoeng(rg, borgarleg, document.getElementById('output'))

	// sjekk om funksjonen var suksessfull
	// viss nei, avslutt
	if(!resultat){
		// ta vekk eventuelle resultat
		myChart.destroy()
		størsteblokk.innerHTML = ''
		return
	}

	// skriv kva blokk som er størst
	if(rg > borgarleg){
		størsteblokk.innerHTML = 'Raud-grøn blokk er størst!'
	} else if(rg == borgarleg) {
		størsteblokk.innerHTML = 'Blokkene er like store!'
	} else {
		størsteblokk.innerHTML = 'Den borgarlege blokka er størst!'
	}

	// lag diagram
	var ctx = document.getElementById("diagram").getContext('2d');
	myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: ["Raud-grøn", "Borgarleg"],
	        datasets: [{
	            label: '% stemmer',
	            data: [rg, borgarleg],
	            backgroundColor: [
	                'red',
	                'blue'
	            ]
	        }]
	    },
	    options: {
	        scales: {
	            yAxes: [{
	                ticks: {
	                    beginAtZero:true
	                }
	            }]
	        }
	    }
	});
	
})

function endringProsentpoeng(rg, borgarleg, outputElement) {

	// sjekke om verdiane er i gyldig område
	// mellom 0 og 100
	if(rg < 0 || rg > 100 || borgarleg < 0 || borgarleg > 100 || isNaN(rg) || isNaN(borgarleg)){
		outputElement.innerHTML = 'ERORR: verdiane må vere mellom 0 og 100'
		return false
	}

	// sjekke om verdiane til sammen er max 100
	console.log(rg + borgarleg)
	if(rg + borgarleg > 100){
		outputElement.innerHTML = 'ERROR: kan til saman ikkje overskride 100'
		return false
	}

	// regne ut forrige val
	var forrigeval = {
		rg: 5 + 23 + 4.2,
		borgarleg: 2.8 + 6.7 + 28.2 + 15.6
	}

	// subtrahere ny verdi med den gamle
	console.log(forrigeval.rg, rg)
	var diff = {
		rg: rg - forrigeval.rg,
		borgarleg: borgarleg - forrigeval.borgarleg
	}

	// så runde av til en desimal
	diff = {
		rg: Math.round( diff.rg * 10 ) / 10,
		borgarleg: Math.round( diff.borgarleg * 10 ) / 10
	}

	

	// deretter skrive verdiane til domen
	outputElement.innerHTML = `
		Raud-grøn blokk endring: ${diff.rg} prosentpoeng <br />
		Borgarleg blokk endring: ${diff.borgarleg} prosentpoeng <br />
	`

	return true
}