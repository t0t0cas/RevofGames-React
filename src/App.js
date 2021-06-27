// *****************************************
// App.js
// *****************************************

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// importar componentes
import Tabela from './Tabela';
import Formulario from './Formulario';

/**
 * Função que irá ler os dados (jogos) da API
 */
async function getJogos() {

  // ler os dados da API
  // https://create-react-app.dev/docs/proxying-api-requests-in-development/
  let resposta = await fetch("api/JogosAPI");

  if (!resposta.ok) {
    // não foi recebido o código 200 do HTTP
    console.error("Não conseguimos ler os dados da API. Código: " + resposta.status);
  }
  return await resposta.json();
}

/**
 * invoca a API e envia os dados do novo Jogo
 * @param {} dadosNovoJogo 
 */
async function adicionaJogo(dadosNovoJogo){
  let formData = new FormData();
  formData.append("Jogo", dadosNovoJogo.Jogo);
  formData.append("UpFotografia", dadosNovoJogo.UpFotografia);

  let resposta = await fetch("api/JogosAPI", {
    method: "POST",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if(!resposta.ok){
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo jogo. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();
}


async function removeJogo(dadosjogoremover){
  let formData = new FormData();
  formData.append("IdJogo", dadosjogoremover.IdJogo);

  let resposta = await fetch("api/JogosAPI/" + dadosjogoremover.idJogo , {
    method: "DELETE",
    body: formData
  });

  //verifica se os dados não foram enviados para a API mostra a mensagem de erro juntamente com o estado da resposta
  if(!resposta.ok){
    console.error(resposta);
    throw new Error('Não foi possível enviar os dados do novo jogo. Código= ' + resposta.status);
  }

  //Devolver os dados a seres usados na componente
  return await resposta.json();

}



/**
 * Componente principal do meu projeto
 */
class App extends React.Component {
  /**
   * Construtor da classe -> tem sempre este nome
   */
  constructor(props) {
    super(props); // <--- esta É SEMPRE a primeira instrução

    this.state = {
      /**
       * array que irá conter os dados dos Jogos, vindas da API
       */
      jogos: [],
      /**
       * variável para conter o 'estado' da app, 
       * no carregamento dos dados dos Jogos, da API
       * @type{"carregando dados" | "sucesso" | "erro"}
       */
      loadState:"",
      /**
       * guarda a mensagem de erro, se algo correr mal
       */
      errorMessage:null
    }
  }

  /**
   * Quando o objeto é criado, executa o código aqui escrito
   * Vamos usá-lo para carregar os dados da API
   */
  componentDidMount() {
    this.LoadJogos();
  }

  /**
   * Carrega os dados dos jogos da API e adiciona-os ao array 'jogos'
   */
   async LoadJogos() {
    /* Tarefas:
     *   1. Ler os dados da API (fetch)
         2. atualizar os dados na var. state
     */
    try {
      // 1.
      this.setState({loadState:"carregando dados"});
      let JogosVindosDaAPI = await getJogos();

      // 2.
      // esta não é a forma correta: this.state.jogos = JogosVindosDaAPI;
      this.setState({
        jogos: JogosVindosDaAPI,
        loadState:"sucesso"
      });
    } catch (erro) {
      this.setState({
        loadState:"erro",
        errorMessage:erro.toString()
      });
      console.error("Erro na leitura dos jogos da API", erro);
    }
  }

  /**
   * método que sabe identificar o 'jogo' que deverá ser retirado da tabela
   * @param {*} idJogo - dados do jogo a remover
   */
   handlerRemoveForm = async (idJogo)=>{
    /**
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     */
     /**
     * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
     */
      try{
        //Ponto 2
        await removeJogo(idJogo);
  
        //Ponto 3
        await this.LoadJogos();
      } catch(erro){
        this.setState({
          errorMessage: erro.toString()
        });
        console.error("Erro ao submeter os dados do novo Jogo; ", erro)
      }
    // //recuperar os jogos que estão representados na tabela 
    // const {jogos} = this.state
    // //alterar essa lista, retirando dela o jogo identificado pelo 'index'
    // this.setState({
    //   //filter é um método do 'state' que permite aplicar um filtro sobre os
    //   //dados do state 
    //   jogos:jogos.filter((jogo,i)=>{
    //     //devolve todos os dados que não forem iguais ao index
    //     return i !== idJogo
    //   }),
    // });
  }

  handlerDadosForm = async (dadosdoFormulario) => {
    /**
     * Tarefas:
     * 1 - preparar os dados para serem enviados para a API
     * 2 - enviar os dados para a API
     * 3 - efetuar o reload da tabela 
     */
    
    /**
     * 1 - já se encontra feito através do parâmetro de entrada -dadosdoFormulario- que já contém os daods formatados
     */
    try{
      //Ponto 2
      await adicionaJogo(dadosdoFormulario);

      //Ponto 3
      await this.LoadJogos();
    } catch(erro){
      this.setState({
        errorMessage: erro.toString()
      });
      console.error("Erro ao submeter os dados do novo Jogo; ", erro)
    }

  }

  render() {
    //recuperar os dados do 'state' para usar dentro deste método
    const { jogos } = this.state;
    
    //determinar o comportamento do 'componente', 
    //em função do seu estado
    switch(this.state.loadState){
      case "carregando dados": 
        return <p>A carregar os dados. Aguarde, por favor.</p>
      case "erro":
        return <p>Ocorreu um erro: {this.state.errorMessage +'.' ??"Não sabemos qual"}</p>
      case "sucesso":
        return (
          <div className="container">
            {/* adição do Formulário que há-de recolher os dados do novo jogo */}
            <Formulario outDadosJogos={this.handlerDadosForm}/>

            {/* este componente - Tabela - irá apresentar os dados dos jogos no ecrã
               os jogos devem ser lidas na API */}
            <Tabela dadosJogos={jogos} jogo={this.handlerRemoveForm} />
          </div>
        )
      default: return null;
    }
  }
}
export default App;