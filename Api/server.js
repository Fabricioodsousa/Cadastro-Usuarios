import express from 'express';
import dotenv from 'dotenv';
import { connection } from './db.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post('/usuarios', async (req, res) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    try {
        const [resultado] = await connection.execute(
            'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );

        res.status(201).json({
            id: resultado.insertId,
            nome,
            email
        });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao criar usuário.' });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const [usuarios] = await connection.execute('SELECT id, nome, email FROM usuarios');
        res.status(200).json(usuarios);
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao listar usuários.' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios.' });
    }

    try {
        const [resultado] = await connection.execute(
            'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?',
            [nome, email, senha, id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao atualizar usuário.' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [resultado] = await connection.execute(
            'DELETE FROM usuarios WHERE id = ?',
            [id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        }

        res.status(200).json({ mensagem: 'Usuário removido com sucesso.' });
    } catch (erro) {
        console.error(erro);
        res.status(500).json({ erro: 'Erro ao remover usuário.' });
    }
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
