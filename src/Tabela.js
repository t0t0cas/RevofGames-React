// Tabela.js
// ****************************************************** 

import React from 'react'

// função que devolve o Cabeçalho da tabela
function CabecalhoTabela() {
    return (
        <thead>
            <tr>
                <th>Nome do Jogo</th>
                <th>Imagem do Jogo</th>
                <th>Id do Jogo</th>
                <th>Apagar Jogo</th>
            </tr>
        </thead>
    )
}

// definição da função que devolve o Corpo da tabela
// faz exatamente o mesmo da linha 7
const CorpoTabela = (props) => {
    // esta função 'interna' irá ler e processar todos
    // os objetos definidos dentro do array 'dadosDosJogos'
    const rows = props.dadosDosJogos.map((row, idJogo) => {
        return (
            <tr key={idJogo}>
                <td>{row.nomeJogo}</td>
                <td><img src={'fotosjogos/' + row.imagemFoto}
                    alt={'foto do ' + row.nomeJogo}
                    height="150" />
                </td>
                <td>{row.idJogo}</td>
                <td><button className="btn btn-outline-danger" onClick={()=>props.jogoaRemover(idJogo)}>Apagar Jogo</button></td>
            </tr>
        )
    })

    // valor devolvido pela função 'CorpoTabela'
    return (<tbody>{rows}</tbody>)
}

// componente que junta os dois sub-componentes, 
// formando um novo 'componente'
class Tabela extends React.Component {
    render() {

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosAlunos
        const { dadosJogos, jogo } = this.props

        return (
            <table className="table table-striped">
                <CabecalhoTabela />
                {/* o parâmetro 'dadosJogos' irá receber
                    os dados que vêm da componente 'mãe' */}
                <CorpoTabela dadosDosJogos={dadosJogos} jogoaRemover={jogo}/>
            </table>
        )
    }
}


export default Tabela