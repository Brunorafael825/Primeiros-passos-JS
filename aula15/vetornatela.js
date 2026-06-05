let valores = [8, 1, 7, 4, 2]

//console.log(valores) // Imprime o vetor completo

/*console.log(valores[0]) // Imprime o valor da posição 0 do vetor
console.log(valores[1]) // Imprime o valor da posição 1 do vetor
console.log(valores[2]) // Imprime o valor da posição 2 do vetor 
console.log(valores[3]) // Imprime o valor da posição 3 do vetor
console.log(valores[4]) // Imprime o valor da posição 4 do vetor */

/*for(let pos=0; pos < valores.length; pos++) {
    console.log(`A posição ${pos} tem o valor ${valores[pos]}`)
}*/
for(let pos in valores){
    console.log(`A posição ${pos} tem o valor ${valores[pos]}`)
}
