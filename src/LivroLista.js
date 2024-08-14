import React, { useState, useEffect } from 'react';
import { ControleLivro } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

function LinhaLivro({ livro, excluir }) {
    const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);
    
    return (
        <tr>
            <td>
                <div>
                    <strong>{livro.titulo}</strong>
                    <br />
                    <button 
                        className="btn btn-danger btn-sm mt-2"
                        onClick={() => excluir(livro.codigo)}
                    >
                        Excluir
                    </button>
                </div>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
}

export default function LivroLista() {
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        setLivros(controleLivro.obterLivros());
        setCarregado(true);
    }, [carregado]);

    const excluir = (codigo) => {
        controleLivro.excluir(codigo);
        setCarregado(false);
    };

    return (
        <main className="container">
            <h1 className="text-center my-4">Catálogo de Livros</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro 
                            key={livro.codigo}
                            livro={livro}
                            excluir={excluir} 
                        />
                    ))}
                </tbody>
            </table>
        </main>
    );
}
