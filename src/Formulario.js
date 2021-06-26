//Formulario.js
//este ficheiro irá conter o código para representar o formulário no ecrã
//********************************* */

import React from 'react'

/**
 * mostrar os dados dos cães
 * e escolher um deles 
 */
const EscolheJogo=(props)=>{
    //itera todos os cães, da lista de cães, e produz as 'options' necessárias à <select></select>
    const opcoes = props.listaJogos.map((opcao) => {
        return (
            <option key={opcao.idJogo} 
                    value={opcao.idJogo}>{opcao.idJogo}</option>
        )
    })
    // valor devolvido pela função 'CorpoTabela'
    return (<select>{opcoes}</select>)
}

/**
 * Formulário para adicionar (fazer upload) de uma Fotografia
 */
class Formulario extends React.Component{

    constructor(props){
        super(props);

        //variáveis para guardar os dados introduzidos pelo utilizador, no formulário
        this.state = {
            nomeDoJogo:"",
            FotodoJogo:"",
            idDoJogo:""
        } 
    }


    /**
     * handler para manipular os dados escritos
     * pelo utilizador nas textboxs do formulário
     * @param {*} evento - contém os dados escritos pelo utilizador
     */
    handlerAdicao =(evento)=>{
        //ler os dados contidos no 'evento'
        //e atribuí-los às variáveis name e value
        //name - Nome do objeto que foi manipulado
        //value - o conteúdo da textbox 
        const{name, value}=evento.target;

        //atribuir os dados lidos à 'state'
        this.setState({
            [name]: value
        })
    }



    /**
     * Função que irá exportar os dados para fora do Formulário
     */
    submitForm = () =>{
        //atriuir ao parâmetro de 'saída' - dados recolhidos' -
        this.props.dadosRecolhidos(this.state);
        this.setState(this.novoAluno)
    }

    render(){

        // estamos a ler os dados que são recebidos pelo componente
        // <=> this.props.dadosAlunos
        const { dadosJogos } = this.props;

        return(
            //o 'return' só consegue devolver um objeto
            <form>
                Jogo: <input type="text" 
                                   value={this.state.nomeDaFoto} 
                                   onChange={this.handlerFotoChange}/> <br />
                Foto do Jogo: <input type="file" 
                                     value={this.state.imagemFoto} 
                                     onChange={this.handlerDataChange}/> <br />
                Id do Jogo: <EscolheJogo listaJogos={dadosJogos} /><br />
                            <input type="submit" value="Adicionar Jogo"/>
              
            </form>
        )
    }
}

export default Formulario;