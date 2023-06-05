Como utilizar a api

1- Rotas user

Primeiro podemos criar um usuário utilizando a rota localhost:3000/user/register

Temos que passar o objeto com os seguitens valores

    {
        "username":"string"
        "email:"string"
        "password:"string"
    }

O valor em password vai ser criptografado!

Em seguida fazemos o login passando os mesmos valores

localhost:3000/user/login

Se passarmos um valor de email que não existe no banco de dados irá gerar um erro
E se passarmos uma senha diferente da que foi cadastrada no banco também irá gerar um erro.

Ao fazermos o login irá ser gerado um token em nosso header da requisição, com esse token é onde verificamos se nosso usuário está logado e se é admin, caso ele sejá admin ele pode estar adicionando novas perguntas ao quiz e atualizar o ranking dos jogadores.

Temos que passar o token que recebemos na requisição para fazer o cadastro do quiz e ranking
Exemplo:

Quando eu fazer login irei no header os seguintes valores

Validate-Token - "é aqui o token -> afodoghosghofa"

Tem que passar esses dois valores no header quando for cadastrar algo no banco

2 - Rotas Quiz

localhost:3000/quiz/

Entrando em /quiz podemos ver todas as perguntas em json

localhost:3000/quiz/register

Apenas admin consegue estar adicionando valor

Podemos estar adicionando novas perguntas ao quiz

    {
        question:"string"
        options:"Array de string ["string", "string"]"
        correct_answer:"number"
    }

3 - Rotas ranking

localhost:3000/ranking/showRanking

Mostra json de todos os valores do ranking que estão no banco de dados

localhost:3000/ranking/registerRanking

Podemos estar adicionando os valores do ranking

    {
         username:"string"
         score:"number"
         response_time:"string"
    }

É Preciso ser admin para fazer alterações