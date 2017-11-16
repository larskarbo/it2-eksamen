
oppdaterMelding()

document.getElementById("parti").onchange = oppdaterMelding

function oppdaterMelding(){
    var parti = document.getElementById("parti").value
    var navn = document.querySelector('[value="'+parti+'"]').innerHTML

    document.getElementById("melding").innerHTML = `
        Du er i ferd med å stemme ${navn}
    `
}