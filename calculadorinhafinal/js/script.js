// Evento para carregar as "tipos-consumidores" e configurar o formulário de "tipos"
document.addEventListener("DOMContentLoaded", function () {
    fetchTipos();
    document.getElementById('tipoFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveTipo();
    });
});

// Evento para carregar as "unidades-consumidoras" e configurar o formulário de "unidades"
document.addEventListener("DOMContentLoaded", function () {
    fetchUnidadeConsumidoras();
    document.getElementById('unidadeFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveUnidadeConsumidora();
    });
});

// Evento para carregar as "dependencias" e configurar o formulário de "dependências"
document.addEventListener("DOMContentLoaded", function () {
    fetchDependencias();
    document.getElementById('dependenciaFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveDependencia();
    });
});

// Evento para carregar os "tipos de dispositivos" e configurar o formulário de "tipos de dispositivos"
document.addEventListener("DOMContentLoaded", function () {
    fetchTiposDispositivos();
    document.getElementById('tipoDispositivoFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveTipoDispositivo();
    });
});

// Evento para carregar os "dispositivos" e configurar o formulário de "dispositivos"
document.addEventListener("DOMContentLoaded", function () {
    fetchDispositivos();
    document.getElementById('dispositivoFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveDispositivo();
    });
});

// Evento para carregar as "bandeiras" e configurar o formulário de "bandeiras"
document.addEventListener("DOMContentLoaded", function () {
    fetchBandeiras();
    document.getElementById('bandeiraFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveBandeira();
    });
});


function fetchTipos() {
    fetch('http://localhost:8000/tipos-consumidores')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const list = document.getElementById('tiposList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            data.tipos_consumidores.forEach(tipo => {
                list.innerHTML += `
                    <li class="list-group-item m-2 p-2 border-bottom">
                        <div class="row d-flex justify-content-between">
                            <div class="col"> <strong>${tipo.nome}</strong> - R$ ${tipo.valor_kwh.toFixed(2)}/kWh</div>
                            <div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${tipo.id}, '${tipo.nome}', ${tipo.valor_kwh})">Editar</button></div>
                            <div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteTipo(${tipo.id})">Deletar</button></div>
                        </div>
                    </li>`;
            });
            list.innerHTML += '</ul>';
        });
}

function showAddForm() {
    document.getElementById('tipoForm').classList.remove('d-none');
    document.getElementById('tipoId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('valor_kwh').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Tipo de Consumidor';
}

function showEditForm(id, nome, valor_kwh) {
    document.getElementById('tipoForm').classList.remove('d-none');
    document.getElementById('tipoId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('valor_kwh').value = valor_kwh;
    document.getElementById('formTitle').innerText = 'Editar Tipo de Consumidor';
}

function saveTipo() {
    const id = document.getElementById('tipoId').value;
    const nome = document.getElementById('nome').value;
    const valor_kwh = parseFloat(document.getElementById('valor_kwh').value);
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/tipos-consumidores/${id}` : 'http://localhost:8000/tipos-consumidores';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, valor_kwh: valor_kwh })
    })
        .then(response => response.json())
        .then(() => {
            fetchTipos();
            document.getElementById('tipoForm').classList.add('d-none');
        });
}

function deleteTipo(id) {
    fetch(`http://localhost:8000/tipos-consumidores/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchTipos());
}
document.addEventListener("DOMContentLoaded", function () {
    fetchUnidadeConsumidoras(); // Função inicial para carregar as unidades consumidoras

    document.getElementById('unidadeFormElement').addEventListener('submit', function (event) {
        event.preventDefault();
        saveUnidadeConsumidora();
    });
});


function fetchUnidadeConsumidoras() {
    fetch('http://localhost:8000/unidades-consumidoras')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const list = document.getElementById('unidadesList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            data.unidades_consumidoras.forEach(unidade => {
                list.innerHTML += `
                    <li class="list-group-item m-2 p-2 border-bottom">
                        <div class="row d-flex justify-content-between">
                            <div class="col"> <strong>${unidade.nome}</strong> - R$ ${unidade.valor_kwh.toFixed(2)}/kWh</div>
                            <div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditUnidadeForm(${unidade.id}, '${unidade.nome}', ${unidade.valor_kwh})">Editar</button></div>
                            <div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteUnidade(${unidade.id})">Deletar</button></div>
                        </div>
                    </li>`;
            });
            list.innerHTML += '</ul>';
        });
}

function showAddUnidadeForm() {
    document.getElementById('unidadeForm').classList.remove('d-none');
    document.getElementById('unidadeId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('valor_kwh').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Unidade Consumidora';
}

function showEditUnidadeForm(id, nome, valor_kwh) {
    document.getElementById('unidadeForm').classList.remove('d-none');
    document.getElementById('unidadeId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('valor_kwh').value = valor_kwh;
    document.getElementById('formTitle').innerText = 'Editar Unidade Consumidora';
}

function saveUnidadeConsumidora() {
    const id = document.getElementById('unidadeId').value;
    const nome = document.getElementById('nome').value;
    const valor_kwh = parseFloat(document.getElementById('valor_kwh').value);
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/unidade-consumidoras/${id}` : 'http://localhost:8000/unidade-consumidoras';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome, valor_kwh: valor_kwh })
    })
        .then(response => response.json())
        .then(() => {
            fetchUnidadeConsumidoras();
            document.getElementById('unidadeForm').classList.add('d-none');
        });
}

function deleteUnidade(id) {
    fetch(`http://localhost:8000/unidades-consumidoras/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchUnidadeConsumidoras());
}

// Repetir funções para 'dependencias', 'tipos-dispositivos', 'dispositivos' e 'bandeiras'

function fetchDependencias() {
    fetch('http://localhost:8000/dependencias')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const list = document.getElementById('dependenciasList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            data.dependencias.forEach(dep => {
                list.innerHTML += `
                    <li class="list-group-item m-2 p-2 border-bottom">
                        <div class="row d-flex justify-content-between">
                            <div class="col"> <strong>${dep.nome}</strong></div>
                            <div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditDependenciaForm(${dep.id}, '${dep.nome}')">Editar</button></div>
                            <div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteDependencia(${dep.id})">Deletar</button></div>
                        </div>
                    </li>`;
            });
            list.innerHTML += '</ul>';
        });
}

function showAddDependenciaForm() {
    document.getElementById('dependenciaForm').classList.remove('d-none');
    document.getElementById('dependenciaId').value = '';
    document.getElementById('dependenciaNome').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Dependência';
}

function showEditDependenciaForm(id, nome) {
    document.getElementById('dependenciaForm').classList.remove('d-none');
    document.getElementById('dependenciaId').value = id;
    document.getElementById('dependenciaNome').value = nome;
    document.getElementById('formTitle').innerText = 'Editar Dependência';
}

function saveDependencia() {
    const id = document.getElementById('dependenciaId').value;
    const nome = document.getElementById('dependenciaNome').value;
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/dependencias/${id}` : 'http://localhost:8000/dependencias';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome })
    })
        .then(response => response.json())
        .then(() => {
            fetchDependencias();
            document.getElementById('dependenciaForm').classList.add('d-none');
        });
}

function deleteDependencia(id) {
    fetch(`http://localhost:8000/dependencias/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchDependencias());
}

// Repetir para 'tipos-dispositivos', 'dispositivos' e 'bandeiras'

function fetchTiposDispositivos() {
    fetch('http://localhost:8000/tipos-dispositivos')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const list = document.getElementById('tiposDispositivosList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            data.tipos_dispositivos.forEach(tipo => {
                list.innerHTML += `
                    <li class="list-group-item m-2 p-2 border-bottom">
                        <div class="row d-flex justify-content-between">
                            <div class="col"> <strong>${tipo.nome}</strong></div>
                            <div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditTipoDispositivoForm(${tipo.id}, '${tipo.nome}')">Editar</button></div>
                            <div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteTipoDispositivo(${tipo.id})">Deletar</button></div>
                        </div>
                    </li>`;
            });
            list.innerHTML += '</ul>';
        });
}

function showAddTipoDispositivoForm() {
    document.getElementById('tipoDispositivoForm').classList.remove('d-none');
    document.getElementById('tipoDispositivoId').value = '';
    document.getElementById('tipoDispositivoNome').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Tipo de Dispositivo';
}

function showEditTipoDispositivoForm(id, nome) {
    document.getElementById('tipoDispositivoForm').classList.remove('d-none');
    document.getElementById('tipoDispositivoId').value = id;
    document.getElementById('tipoDispositivoNome').value = nome;
    document.getElementById('formTitle').innerText = 'Editar Tipo de Dispositivo';
}

function saveTipoDispositivo() {
    const id = document.getElementById('tipoDispositivoId').value;
    const nome = document.getElementById('tipoDispositivoNome').value;
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/tipos-dispositivos/${id}` : 'http://localhost:8000/tipos-dispositivos';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome })
    })
        .then(response => response.json())
        .then(() => {
            fetchTiposDispositivos();
            document.getElementById('tipoDispositivoForm').classList.add('d-none');
        });
}

function deleteTipoDispositivo(id) {
    fetch(`http://localhost:8000/tipos-dispositivos/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchTiposDispositivos());
}

// Repetir para 'dispositivos'

function fetchDispositivos() {
    fetch('http://localhost:8000/dispositivos')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const list = document.getElementById('dispositivosList');
            list.innerHTML = '<ul class="list-group border border-danger">';
            data.dispositivos.forEach(dispositivo => {
                list.innerHTML += `
                    <li class="list-group-item m-2 p-2 border-bottom">
                        <div class="row d-flex justify-content-between">
                            <div class="col"> <strong>${dispositivo.nome}</strong></div>
                            <div class="col"> <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditDispositivoForm(${dispositivo.id}, '${dispositivo.nome}')">Editar</button></div>
                            <div class="col"> <button class="btn btn-danger btn-sm float-end" onclick="deleteDispositivo(${dispositivo.id})">Deletar</button></div>
                        </div>
                    </li>`;
            });
            list.innerHTML += '</ul>';
        });
}

function showAddDispositivoForm() {
    document.getElementById('dispositivoForm').classList.remove('d-none');
    document.getElementById('dispositivoId').value = '';
    document.getElementById('dispositivoNome').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Dispositivo';
}

function showEditDispositivoForm(id, nome) {
    document.getElementById('dispositivoForm').classList.remove('d-none');
    document.getElementById('dispositivoId').value = id;
    document.getElementById('dispositivoNome').value = nome;
    document.getElementById('formTitle').innerText = 'Editar Dispositivo';
}

function saveDispositivo() {
    const id = document.getElementById('dispositivoId').value;
    const nome = document.getElementById('dispositivoNome').value;
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/dispositivos/${id}` : 'http://localhost:8000/dispositivos';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome: nome })
    })
        .then(response => response.json())
        .then(() => {
            fetchDispositivos();
            document.getElementById('dispositivoForm').classList.add('d-none');
        });
}

function deleteDispositivo(id) {
    fetch(`http://localhost:8000/dispositivos/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchDispositivos());
}

