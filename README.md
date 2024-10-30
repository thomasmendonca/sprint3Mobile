🚀 Como subir o projeto no Expo 

## 📋 Passo a passo para rodar o projeto

Este tutorial orienta como subir o projeto utilizando o Expo e garantir que a API esteja funcionando corretamente.

### 1. 🛠️ Instalar o Expo CLI

Para rodar o projeto, você precisará do Expo. Instale-o globalmente na sua máquina com o seguinte comando:

```bash
npm install -g expo-cli
```


### 2. 📂 Clonar o projeto

Faça o clone do projeto para a sua máquina local:

```bash
git clone https://github.com/thomasmendonca/sprint3Mobile
cd sprint3Mobile
```


### 3. 📦 Instalar dependências

Instale as dependências do projeto utilizando o comando:
``` bash
npm install
```


### 4. ⚙️ Rodar a API

Antes de rodar o projeto no Expo, você precisa rodar a API para que a aplicação possa consumir os dados. Siga os passos:

1. Acesse a API em [https://github.com/thomasmendonca/apirestaurants].
2. Instale as dependências necessárias:
   
`bash
   npm install`

3. Inicie o servidor da API:
   
```bash
   node index.js
```

   A API será iniciada na porta 5000 (ou outra que esteja definida no código)

### 5. 🌐 Obter o IP local da máquina


Para fazer o projeto funcionar corretamente, é necessário substituir o IP local da máquina onde está rodando a API. Esse IP deve ser utilizado nas funções fetchRestaurants() e fetchFilterOptions() do código das páginas Login.tsx e PlantSelect.tsx .
- ** PlantSelect.tsx **
``` Typescript
   async function fetchRestaurants() {
        try {
            let url = 'http://192.168.0.11:5000/restaurants'; // Substitua 192.168.X.X pelo IP local da sua máquina
            if (activeEnvironment) {
                url += `?type=${activeEnvironment}`;
            }
            const response = await fetch(url);
            const data = await response.json();
            let filteredData = data;
            if (selectedDistance !== null) {
                filteredData = data.filter((restaurant: RestaurantProps) => restaurant.distance <= selectedDistance);
            }
            setRestaurants(filteredData);
        } catch (error) {
            console.error('Failed to load restaurants:', error);
        }
    }
```
- ** Login.tsx **
``` Typescript
const handleLogin = async () => {
        try {
            const response = await fetch('http://192.168.0.11:5000/login', { // Substitua 192.168.X.X pelo IP local da sua máquina
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.status === 401) {
                Alert.alert('Erro', 'Credenciais inválidas. Por favor, verifique seu nome de usuário e senha.');
            } else if (response.status === 500) {
                Alert.alert('Erro', 'Erro no servidor. Tente novamente mais tarde.');
            } else if (response.ok) {
                navigation.navigate('UserIdentification');
            } else {
                Alert.alert('Erro', 'Algo deu errado, tente novamente. Código de status: ' + response.status);
            }
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet.');
        }
    };
```

#### 🔍 Como obter o IP local:
- **Windows**: Execute o comando ipconfig no terminal. Procure por "Endereço IPv4".
- **Mac/Linux**: Execute o comando ifconfig no terminal. Procure pelo endereço IP associado à interface de rede (normalmente começa com 192.168).
- Após encontrar o IP, substitua 192.168.0.11 pelo seu IP local no código.

### 6. ▶️ Rodar o projeto Expo

Para rodar o projeto no Expo, use o comando:

```bash
npx expo start
```

Será aberta uma página no seu navegador com um QR Code. Você pode escanear esse QR Code utilizando o aplicativo Expo Go (disponível na App Store ou Google Play) para rodar o projeto no seu dispositivo físico.

### 7. 📶 Observação sobre o IP local

Certifique-se de que o dispositivo que está rodando o Expo e a máquina que está rodando a API estejam na **mesma rede**. Caso contrário, não será possível acessar os dados da API no aplicativo.

## 🎯 Correção e Avaliação do Projeto

Este projeto atende aos requisitos do barema de correção conforme descrito abaixo:

### 1. 🔗 Escolher entre uma API RESTfull, Firebase Realtime Database ou Firebase Firestore para obtenção e gestão dos dados. (50pts)

Foi escolhida uma **API RESTful** para realizar a obtenção e gestão dos dados dos restaurantes. A API foi construída utilizando **Node.js** e **Express**, fornecendo endpoints para listar, criar, atualizar e deletar restaurantes.

### 2. ✅ Validação de cenários de erro, com feedback claro e informativo para o usuário. (25pts)

- **Validação e tratamento de erros** foram implementados nas funções fetchRestaurants() e fetchFilterOptions(), utilizando blocos try...catch.
- Quando um erro ocorre, uma mensagem é exibida no console, e a interface do usuário apresenta um estado amigável quando não há dados disponíveis. Por exemplo, se a API não puder ser acessada, o usuário verá uma mensagem indicando que não há restaurantes disponíveis e terá a opção de "Tentar Novamente".

### 3. 🌊 Manter a aplicação fluída, evitando travamentos ou interrupções. (15pts)

- Utilizou-se o **KeyboardAvoidingView** para garantir que o teclado não cubra elementos importantes da interface, mantendo a navegação fluída.
- Além disso, a função keyboardShouldPersistTaps="always" foi adicionada à FlatList para garantir que os elementos sejam clicáveis mesmo com o teclado aberto, evitando bloqueios na interação do usuário.

### 4. 🔄 Incluir uma opção de "Tentar Novamente" em casos de erro, proporcionando uma experiência mais fluída aos usuários. (10pts)

- No componente ListEmptyComponent, foi incluído um botão de "Tentar Novamente", permitindo que o usuário faça uma nova tentativa de carregar os dados dos restaurantes caso ocorra algum erro na comunicação com a API. Isso garante uma experiência mais fluída e menos frustrante.

## 📌 Considerações Finais

Certifique-se de seguir cada um dos passos descritos acima para garantir que o projeto funcione conforme esperado. Caso tenha dúvidas ou encontre problemas, verifique se a API está rodando e se o IP local foi configurado corretamente. Esses são pontos críticos para a integração do aplicativo com a API RESTful.

Boa sorte e divirta-se desenvolvendo! 🚀😊
