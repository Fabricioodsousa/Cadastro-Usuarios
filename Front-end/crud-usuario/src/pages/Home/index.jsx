import { useState } from 'react';
import './style.css';

function Home() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [usuarios, setUsuarios] = useState([]);

  async function listarUsuarios() {
    try {
      const res = await fetch('http://localhost:3000/usuarios');
      if (res.ok) {
        const data = await res.json();
        setUsuarios(data);
      } else {
        alert('Erro ao buscar usuários');
      }
    } catch (error) {
      alert('Erro na requisição');
      console.error(error);
    }
  }

  async function cadastrarUsuario() {
    if (!nome || !email || !senha) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (res.ok) {
        alert('Usuário cadastrado com sucesso!');
        setNome('');
        setEmail('');
        setSenha('');
      } else {
        alert('Erro ao cadastrar usuário');
      }
    } catch (error) {
      alert('Erro na requisição');
      console.error(error);
    }
  }

  async function removerUsuario(id) {

    try {
      const res = await fetch(`http://localhost:3000/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Usuário removido com sucesso!');
        listarUsuarios();
      } else {
        alert('Erro ao remover usuário');
      }
    } catch (error) {
      alert('Erro na requisição');
      console.error(error);
    }
  }

  return (
    <div className="container">
      <form onSubmit={e => e.preventDefault()}>
        <h1>Cadastro de Usuários</h1>

        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={e => setNome(e.target.value)}
        />

        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <button type="button" onClick={cadastrarUsuario}>
          Cadastrar
        </button>

        <button type="button" onClick={listarUsuarios}>
          Visualizar Usuários
        </button>
      </form>

      <div className="card-usuarios">
        {usuarios.map(user => (
          <div key={user.id} className="usuario-card">
            <div>
              <p><strong>Nome:</strong> {user.nome}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
            <button onClick={() => removerUsuario(user.id)}>Remover</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
