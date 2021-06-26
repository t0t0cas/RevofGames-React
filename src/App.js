// *****************************************
// App.js
// *****************************************

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// importar componentes
import Tabela from './Tabela';
import Formulario from './Formulario';

/**
 * Função que irá ler os dados (cães) da API
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
       * no carregamento dos dados das Fotografias, da API
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
   * Carrega os dados dos cães da API e adiciona-os ao array 'caes'
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
      // esta não é a forma correta: this.state.fotos = fotosVindosDaAPI;
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
   * @param {*} idJogo - dados do aluno a remover
   */
   removeJogo=(idJogo)=>{
    //recuperar os alunos que estão representados na tabela 
    const {jogos} = this.state
    //alterar essa lista, retirando dela o aluno identificado pelo 'index'
    this.setState({
      //filter é um método do 'state' que permite aplicar um filtro sobre os
      //dados do state 
      jogos:jogos.filter((jogo,i)=>{
        //devolve todos os dados que não forem iguais ao index
        return i !== idJogo
      }),
    });
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
            {/* adição do Formulário que há-de recolher os dados da nova fotografia */}
            <Formulario dadosJogos={jogos}/>

            {/* este componente - Tabela - irá apresentar os dados das 'fotos' no ecrã
                as 'fotos' devem ser lidas na API */}
            <Tabela dadosJogos={jogos} jogo={this.removeJogo} />
          </div>
        )
      default: return null;
    }
  }
}
export default App;