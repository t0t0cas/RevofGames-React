//Formulario.js
//este ficheiro irá conter o código para representar o formulário no ecrã
//********************************* */

import React from 'react'



/**
 * Formulário para adicionar (fazer upload) de um jogo
 */
class Formulario extends React.Component{

    constructor(props){
        super(props);

        //variáveis para guardar os dados introduzidos pelo utilizador, no formulário
        this.state = {
            nomeDoJogo: "",
            FotodoJogo:null,
            DescJogo:"",
            notaJogo:""
        } 
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Jogo
     * @param {*} evento - dados adicionados pelo utilizador 
     * 
     */
    handlerJogoChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Nome do Jogo Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            nomeDoJogo: evento.target.value
        });
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre o nome do Jogo
     * @param {*} evento - dados adicionados pelo utilizador  
     *          
    */
     handlerDescricaoChange = (evento) =>{
        //validar os valores introduzidos na TextBox (Impede que o utilizador insira números)
        if(/\d/.test(evento.target.value)){
            evento.target.setCustomValidity("Descrição do Jogo Inválido");
            return;
        }else {
            evento.target.setCustomValidity("");
        }

        //guardar os dados recolhidos
        this.setState({
            DescJogo: evento.target.value
        });
    }

    /**
     * processar os dados fornecidos pelo utilizador sobre a nota do Jogo
     * @param {*} evento - dados adicionados pelo utilizador   
     *          
    */
     handlerNotaChange = (evento) =>{     
        //guardar os dados recolhidos
        this.setState({
            notaJogo: evento.target.value
        });
    }

    /**
     * processar os dados fornecidos pelo utilizador no upload da foto do jogo
     * @param {} evento - dados adicionados pelo utilizador
     */
    handlerFotoChange = (evento) => {
        //guardar os dados recolhidos 
        this.setState({
            FotodoJogo: evento.target.files[0]
        });
    }

    /**
     * handler para processar os dados fornecidos pelo Formulário
     * @param {*} evento 
     */
    handlerSubmitForm = (evento) =>{
        //impedir o formulário de autoenviar os dados para o servidor
        //essa tarefa cabe ao componente App.js
        evento.preventDefault();
        
        //prepração dos dados para serem enviados para a App.js
        //podemos já enviar os dados prontos para serem adicionados à API
        let dadosFormulario = {
            Nome: this.state.nomeDoJogo,
            UpFotografia: this.state.FotodoJogo,
            Descricao: this.state.DescJogo,
            Nota: this.state.notaJogo
        };

        //concretizar a exportação dos dados para a App.js
        this.props.outDadosJogos(dadosFormulario);
    }

    render(){
        return(
            //o 'return' só consegue devolver um objeto
            <form onSubmit={this.handlerSubmitForm} encType="multipart/form-data">
                Jogo: <input type="text"
                             value={this.state.nomeDoJogo}
                             onChange={this.handlerJogoChange}/> <br />
                Foto do Jogo: <input type="file"  
                                     onChange={this.handlerFotoChange}/> <br />
                Nota do Jogo: <input type="number"
                                     min="1"
                                     max="100"
                                     placeholder="1 a 100"
                                     value={this.state.notaJogo}
                                     onChange={this.handlerNotaChange}/> <br />  
                Descricao: <input type="text"
                             value={this.state.DescJogo}
                             onChange={this.handlerDescricaoChange}/> <br />
                <input type="submit" value="Adicionar Jogo" className="btn btn-outline-primary" />           
            </form>
        )
    }
}

export default Formulario;