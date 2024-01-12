function cadastrar() {
    const tipo = document.getElementById('tipo').value;
    const dataInput = document.getElementById('data');
    const horarioInput = document.getElementById('horario'); // Novo campo para Missão
    const turnoInput = document.getElementById('turno'); // Novo campo para Serviço
    const descricaoInput = document.getElementById('descricao'); // Novo campo para Missão

    // Obtendo o valor do campo de data como string (YYYY-MM-DD)
    const dataString = dataInput.value;

    // Dividindo a data em ano, mês e dia
    const [ano, mes, dia] = dataString.split('-');

    // Construindo a data no formato desejado (Dia/Mês/Ano)
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const listaCadastros = document.getElementById('lista-cadastros');

    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <span class="data">${dataFormatada}</span>
        <span class="tipo">${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</span>
        ${tipo === 'missao' ? `<span class="horario">Horário: ${horarioInput.value}</span>` : ''}
        ${tipo === 'servico' ? `<span class="turno">Turno: ${turnoInput.value.charAt(0).toUpperCase() + turnoInput.value.slice(1)}</span>` : ''}
        ${tipo === 'missao' ? `<span class="descricao">Descrição: ${descricaoInput.value}</span>` : ''}
    `;

    listaCadastros.appendChild(listItem);
}

function copiarTexto() {
    const listaCadastros = document.getElementById('lista-cadastros');
    const modal = document.getElementById('modal');
    const modalTexto = document.getElementById('modal-texto');
    const audioCopiado = document.getElementById('audio-copiado');

    // Criar um elemento de área de texto temporário para armazenar o texto a ser copiado
    const tempTextArea = document.createElement('textarea');
    tempTextArea.value = obterTextoListaCadastros(listaCadastros);
    
    // Adicionar o elemento de área de texto temporário à página
    document.body.appendChild(tempTextArea);
    
    // Selecionar o texto na área de texto temporário
    tempTextArea.select();
    
    // Executar o comando de cópia
    document.execCommand('copy');
    
    // Remover o elemento de área de texto temporário da página
    document.body.removeChild(tempTextArea);

    // Exibir o modal com a mensagem e o som
    modalTexto.textContent = 'Texto copiado com sucesso!';
    modal.style.display = 'block';
    audioCopiado.play();

    // Fechar o modal automaticamente após 2 segundos (ou ajuste conforme necessário)
    setTimeout(fecharModal, 8000);
}

function fecharModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}

function obterTextoListaCadastros(listaCadastros) {
    // Obter o texto dentro da lista de cadastros
    return Array.from(listaCadastros.children).map(item => item.innerText).join('\n');
}

// Adicionando eventos aos botões
document.getElementById('cadastrar-btn').addEventListener('click', cadastrar);
document.getElementById('copiar-btn').addEventListener('click', copiarTexto);


function realizarLogin() {
    // Obter os valores dos campos de entrada
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validar as credenciais (exemplo: usuário: usuario, senha: senha123)
    if (username === 'admin' && password === 'admin') {
        // Redirecionar para a página de dashboard após o login bem-sucedido
        window.location.href = 'dashboard.html';
    } else {
        // Exibir uma mensagem de erro (substitua isso por um mecanismo mais seguro em um ambiente de produção)
        alert('Credenciais inválidas. Tente novamente.');
    }
}
function obterTextoListaCadastros(listaCadastros) {
    // Inicializar uma string para armazenar o texto formatado
    let textoFormatado = '';

    // Percorrer os elementos da lista de cadastros
    Array.from(listaCadastros.children).forEach(item => {
        const tipo = item.querySelector('.tipo').innerText.toLowerCase();
        const data = item.querySelector('.data').innerText;
        let horario = '';

        if (tipo === 'missao') {
            const horarioElement = item.querySelector('.horario');
            if (horarioElement) {
                horario = `Horário: ${horarioElement.innerText.replace('Horário: ', '')}`;
            }

            const descricaoElement = item.querySelector('.descricao');
            if (descricaoElement) {
                const descricao = descricaoElement.innerText.trim();
                textoFormatado += `Missão\n${data}\n${horario}\n${descricao}\n\n`;
            }
        } else if (tipo === 'servico') {
            const turnoElement = item.querySelector('.turno');
            if (turnoElement) {
                const turno = `Turno: ${turnoElement.innerText.replace('Turno: ', '')}`;
                textoFormatado += `Serviço - ${turno}\n${data}\n\n`;
            }
        } else if (tipo === 'reserva') {
            textoFormatado += `Reserva\n${data}\n\n`;
        }
    });

    return textoFormatado.trim(); // Remover espaços em branco extras no final
}

