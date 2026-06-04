function gerarTabuada() {
    const numeroInput = document.getElementById('numero');
    const numero = Number(numeroInput.value);
    const tabuadaLista = document.getElementById('tabuada');

    tabuadaLista.innerHTML = '';

    if (Number.isNaN(numero)) {
        const item = document.createElement('li');
        item.textContent = 'Digite um número válido para gerar a tabuada.';
        tabuadaLista.appendChild(item);
        return;
    }

    for (let i = 1; i <= 10; i += 1) {
        const item = document.createElement('li');
        item.textContent = `${numero} x ${i} = ${numero * i}`;
        tabuadaLista.appendChild(item);
    }
}

alert('Olá, seja bem-vindo(a)');