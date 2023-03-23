'use strict'

const mapa = document.querySelector('svg')

const getEstados = (event) => {
    const estado = event.target.id.replace('BR-', '')
    preencherDados(estado)
}


const preencherDados = async (sigla) => {
    const header = await preencherHeader(sigla)
    document.getElementById('sigla').innerText = header.sigla
    document.getElementById('title').innerText = header.nome
    document.getElementById('capital').innerText = header.capital
    document.getElementById('regiao').innerText = header.regiao

    const preencherLista = await lista(sigla)

    const cidades = preencherLista.cidades.map((cidades) => {
        const li = document.createElement('li')
        li.textContent = cidades
        return li
    })
    document.getElementById('cidades').replaceChildren(...cidades)

    // const preencherLista = await lista(sigla)
    // preencherLista.cidades.forEach((cidade) => {
    //     const cidades = document.createElement('li')
    //     cidades.textContent = cidade
    //     const list = document.getElementById('cidades')
    //     list.remove(cidades)
    //     list.append(cidades)

    // });


}

const preencherHeader = async (sigla) => {
    const url = `http://localhost:8080/estado/${sigla}`
    const response = await fetch(url)
    const data = await response.json()

    return {
        sigla: data.uf,
        nome: data.descricao,
        capital: data.capital,
        regiao: data.regiao
    }
}



const lista = async (sigla) => {
    const url = `http://localhost:8080/v2/senai/cidades?uf=${sigla}`
    const response = await fetch(url)
    const data = await response.json()

    return {
        cidades: data.cidades
    }
}

mapa.addEventListener('click', getEstados)

console.log(mapa)