# 📝 Lista de Requisitos da aplicação 

# Cadastro de Usuário

## Requisito Funcional

- Deve ser possível cadastrar um novo usuário.

- Deve ser retonado um token caso o cadastro seja com sucesso.

- Deve ser possível receber uma imagem de avatar.

## Requisito não funcional

- A armazenamento do avatar deve ser feito apenas pela caminho da imagem que irá ficar efetivamente salva na AWS.

- O token deverá ser um Bearer Token com JWT.

- O token do usuário deve expirar em 1 dia.

## Regras de negócio 

- Não deve ser possível cadastrar um usuário com email já existente.

# Iniciar Sessão  de Usuário

## Requisito Funcional

- Deve ser possível que o usuário inicie uma sessão utilizando email e senha.

- Deve ser possível que o usuário resete sua senha em caso de esquecimento.

## Requisito não funcional

- Iniciar a sessão de um usuário deverá retornar um token que irá expirar em 30 dias.

- Para resetar a senha em caso de esquecimento o processo deve ser feito através do envio de um email de confirmação para reset da senha.

## Regras de negócio 

- Não deve ser possível efetuar a recuperação de senha para emails não existentes.

# Cadastro de budget

## Requisito Funcional

- Deve ser possível cadastrar um novo budget.

## Regras de negócio 

- Sempre que um novo budget de um usuário for criado deve-se preencher o campo is_active para "true" e verificar se existe algum budget do mesmo usuário com o valor "true", caso encontre, deve-se altera-lo para "false" e sua data fim para a data atual.

# Listagem de budget

## Requisito Funcional

- Deve ser possível listar todos os budgets ja criados pelo usuário.

## Regras de negócio 

- No budget em que is_active possui o valor "true" deve se adicionar a data atual como valor do campo data final.
################################################################################
# Cadastro de Spending Categories

## Requisito Funcional

- Deve ser possívél subir massivamente uma lista de categorias.

- Deve ser possível subir individualmente as categorias.

- Deve ser possível excluir uma categoria.

## Regras de negócio

- As operações de Spending Categories não podem ser feitas por usuários normais, apenas admins.

# Listagem de Spending Categories

## Requisito Funcional

- Deve ser possível listar todas as Spending Categories cadastradas.

- Deve ser possível remover uma ou várias User Spending Categories do usuário.
#################################################################################
# Cadastro e Remoção de User Spending Categories

## Requisito Funcional

- Deve ser possível criar uma ou várias User Spending Category para o usuário.

- Deve ser possível deletar uma ou várias User Spending Category do usuário.

## Regras de negócio

- A rota irá receber um json com uma lista de todas as User Spending Categories desejadas, deve se após o recebimento comparar as categorias ja cadastradas com as solicitadas pelo json, [x] As categorias presentes nos 2 não vem sofrer nenhuma alteração, [x] As categorias presentes no json mas ainda não cadastradas devem ser adicionadas, [x] As categorias Cadastradas que não estão presentes no json deve ser deletadas.

# Listagem de User Spending Categories

## Requisito Funcional

- Deve ser possível listar todas as User Spending Categories do usuário.



