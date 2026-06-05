let num = [5, 8, 2, 9, 3]
num.push(1) // Adiciona um valor ao final do vetor
num.sort() // Coloca os valores em ordem crescente
console.log(num) 
console.log(`O vetor tem ${num.length} posições.`) 
console.log(`O primeiro valor do vetor é ${num[0]}`)

let pos= num.indexOf(8) // Retorna a posição do valor 8 no vetor
if (pos == -1) {
    console.log('O valor não foi encontrado!')
} else {
    console.log(`O valor 8 está na posição ${pos}`)
}
