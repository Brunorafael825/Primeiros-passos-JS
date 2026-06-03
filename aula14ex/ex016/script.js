alert('Olá, seja bem-vindo(a)')

function contar() {
    var inicio = Number(document.getElementById('inicio').value)
    var fim = Number(document.getElementById('fim').value)
    var passo = Number(document.getElementById('passo').value)
    var resultado = document.getElementById('resultado')

    while (inicio <= 0 || fim <= 0 || passo <= 0) {
        alert('ERRO! Digite um número maior que zero')
        resultado.innerHTML = 'Impossível contar'
        return
    } if (passo > fim) {
        alert('ERRO! O passo não pode ser maior que o fim')
        resultado.innerHTML = 'Impossível contar'
        return
    } else if (inicio > fim) {
        alert('ERRO! O início não pode ser maior que o fim')
        resultado.innerHTML = 'Impossível contar'
        return
    }

    resultado.innerHTML = `Contando: <br>`
    for (var c = inicio; c <= fim; c += passo) {
        resultado.innerHTML += `${c} \u{1F449}`
    }
    resultado.innerHTML += `\u{1F3C1}`
}
