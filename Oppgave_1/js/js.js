

var interval;//global
var piano = document.getElementById('piano')
var video = document.getElementById('video')

document.getElementById('mdglink').addEventListener('click', function() {
	document.getElementById('mdg').className = ''
	document.getElementById('sp').className = 'skjult'
	document.getElementById('mdglink').className = 'selected'
	document.getElementById('splink').className = ''

	// pause video
	video.pause()

	// piano
	piano.play()

	// slideshow
	var bilder = ['b1', 'b2', 'b3']
	var current = 0
	function nesteBilde(){
		document.querySelectorAll('.slideshow').forEach(function(el) {
			el.style = 'display:none'
		})

		document.getElementById(bilder[current]).style='display:block'
		current++;
		if(current >= bilder.length){
			current = 0;
		}
	}
	nesteBilde()
	interval = setInterval(nesteBilde, 2000)
})

document.getElementById('splink').addEventListener('click', function() {
	document.getElementById('mdg').className = 'skjult'
	document.getElementById('sp').className = ''
	document.getElementById('mdglink').className = ''
	document.getElementById('splink').className = 'selected'

	// stopp piano og slideshow
	piano.pause()
	clearInterval(interval)

	// start video
	video.play()
})