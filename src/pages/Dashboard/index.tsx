import React, { useState, useEffect, FormEvent } from 'react';
import { FiChevronRight, FiTrash } from 'react-icons/fi';
import { Link } from 'react-router-dom'
import api from '../../services/api'
import logoImg from '../../assets/logo.svg'
import { Title, Form, Repositories, Error } from "./styles"

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('')
    const [inputError, setInputError] = useState('')
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storageRepositories = localStorage.getItem('@githubExplorer:repositories')

        if (storageRepositories) {
            return JSON.parse(storageRepositories)
        } else {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('@githubExplorer:repositories', JSON.stringify(repositories))
    }, [repositories])

    async function handleAddRepository(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        if (!newRepo) {
            setInputError('Digite o autor/nome do repositório')
            return;
        }


        try {
            const response = await api.get(`repos/${newRepo}`)
            const repository = response.data
            setRepositories([...repositories, repository])
            setNewRepo('')
            setInputError('')
        } catch (err) {
            setInputError('Erro na busca por esse repositório')
        }
    }

    function handleRemoveRepository(name: string) {
        const filterRepositories = repositories.filter(repository => repository.full_name !== name)
        setRepositories(filterRepositories)
    }
    return (
        <>
            <img src={logoImg} alt="" />
            <Title>Explore repositórios no Github.</Title>

            <Form hasError={!!inputError} onSubmit={handleAddRepository}>
                <input
                    value={newRepo}
                    onChange={e => setNewRepo(e.target.value)}
                    type="text"
                    placeholder="Digite o nome do repositório"
                />
                <button type="submit">Pesquisar</button>
            </Form>

            {inputError && <Error>{inputError}</Error>}

            {repositories.map(repository => (
                <>
                    <Repositories>
                        <Link key={repository.full_name} href="teste" to={`/repositories/${repository.full_name}`}>
                            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
                            <div>
                                <strong>{repository.full_name}</strong>
                                <p>{repository.description}</p>
                            </div>

                            <FiChevronRight size={20} />
                        </Link>
                        <button onClick={() => handleRemoveRepository(repository.full_name)}>
                            <FiTrash size={20} />
                        </button>
                    </Repositories>
                </>
            ))}

        </>
    )
}

export default Dashboard