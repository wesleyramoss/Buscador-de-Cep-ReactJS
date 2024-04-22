import './styles.css'

import { useState } from 'react'

import minhaApi from './services/minhaApi'

function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({})

async  function handleSearch(){
    if(input === ''){
      alert('Preenchimento Obrigátorio')
      return;
    } 

    try{
      const response = await minhaApi.get(`${input}/json`)
      setCep(response.data)
      setInput('')
    }
    catch{
      alert('Erro ao encontrar !')
      setInput('')
    }

  }

  return (
    <div className="container">
      <h1 className="title"> Buscador de Cep</h1>
      <div className="inputContainer">

        <input
          type="text"
          placeholder="Qual o seu Cep ?"
          value={input}
          onChange={e => setInput(e.target.value)}
         />
         <button onClick={handleSearch}>
          Procurar
         </button>
      </div>

      {Object.keys(cep).length > 0 && (
            <main className="main">
                <h2>Cep: {cep.cep}</h2>
                <span>{cep.logradouro}</span>
                <span>Complemento: {cep.complemento}</span>
                <span>{cep.bairro}</span>
                <span>{cep.localidade} - {cep.uf}</span>
            </main>
      ) }
    </div>
  )

}

export default App
