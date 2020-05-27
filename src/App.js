import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'POJETO',
      url: "argh",
      techs: ['tics','tocs']
    })

    const newRepo = response.data

    setRepos([...repos, newRepo])
  }

  async function handleRemoveRepository(id) { 
    
    await api.delete(`repositories/${id}`)

    const newRepos = repos.filter(repo => !repo.id.includes(id))

    setRepos([...newRepos])

  }

  const [repos, setRepos] = useState([])

  useEffect(() => {
    api.get('repositories').then(res => setRepos(res.data))
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repos.map(repo => 
            <li key={repo.id}>
              {repo.title}       
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
