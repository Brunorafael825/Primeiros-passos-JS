alert('Olá, seja bem-vindo(a)')
var verificar = function() {
    var data = new Date()
    var ano = data.getFullYear()
    var fano = document.getElementById('txtano')    
    var res = document.getElementById('res')
    if (fano.value.length == 0 || fano.value > ano) {
        alert('[ERRO] Verifique os dados e tente novamente!')
    } else {
       var fsex = document.getElementsByName('radsex')
       var idade = ano - Number(fano.value)
       var gênero = ''
       var img = document.createElement('img')
       img.setAttribute('id', 'foto')
       if (fsex[0].checked) {
           gênero = 'Homem'
           if (idade >= 0 && idade < 10) {
               // Criança
               img.setAttribute('src', 'foto-bebeh.jpg')
           } else if (idade < 21) {
               // Jovem
               img.setAttribute('src', 'foto-homem-jovem.jpg')
           } else if (idade < 50) {
               // Adulto
               img.setAttribute('src', 'foto-homem-adulto.jpg')
           } else {
               // Idoso
               img.setAttribute('src', 'foto-homem-idoso.jpg')
           }
       } else if (fsex[1].checked) {
           gênero = 'Mulher'
           if (idade >= 0 && idade < 10) {
               // Criança
               img.setAttribute('src', 'foto-bebem.jpg')
           } else if (idade < 21) {
               // Jovem
               img.setAttribute('src', 'foto-mulher-jovem.jpg')
           } else if (idade < 50) {
               // Adulto
               img.setAttribute('src', 'foto-mulher-adulta.jpg')
           } else {
               // Idoso
               img.setAttribute('src', 'foto-mulher-idosa.jpg')
           }
       }
       res.style.textAlign = 'center'
       res.innerHTML = `<p>Sua idade é ${idade} anos e seu gênero é ${gênero}.</p>`
       res.appendChild(img)
    }
}