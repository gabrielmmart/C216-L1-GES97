const restify = require('restify');

// Iniciar o servidor
var server = restify.createServer({
    name: 'Gerenciamento de Professores',
});

// Configurar o servidor para aceitar JSON
server.use(restify.plugins.bodyParser());

// Array para armazenar os professores
let professores = [];

// Endpoint para inserir um novo professor
server.post('/api/v1/professor/inserir', (req, res, next) => {
    const { nome, disciplina, email } = req.body;

    // Simulação de inserção no banco de dados
    const novoProfessor = {
        id: professores.length + 1,
        nome,
        disciplina,
        email
    };

    professores.push(novoProfessor);

    res.send(201, novoProfessor);
    return next();
});

// Endpoint para listar todos os professores
server.get('/api/v1/professor/listar', (req, res, next) => {
    res.send(professores);
    return next();
});

// Endpoint para atualizar um professor existente
server.post('/api/v1/professor/atualizar', (req, res, next) => {
    const { id, nome, disciplina, email } = req.body;

    const professorIndex = professores.findIndex(professor => professor.id === id);
    if (professorIndex === -1) {
        res.send(404, { message: 'Professor não encontrado' });
    } else {
        professores[professorIndex] = { id, nome, disciplina, email };
        res.send(200, professores[professorIndex]);
    }

    return next();
});

// Endpoint para excluir um professor pelo ID
server.post('/api/v1/professor/excluir', (req, res, next) => {
    const { id } = req.body;

    const professorIndex = professores.findIndex(professor => professor.id === id);
    if (professorIndex === -1) {
        res.send(404, { message: 'Professor não encontrado' });
    } else {
        professores.splice(professorIndex, 1);
        res.send(200, { message: 'Professor excluído com sucesso', excluidos: 1 });
    }

    return next();
});

// Iniciar o servidor
var port = process.env.PORT || 5000;
server.listen(port, function() {
    console.log('Servidor iniciado', server.name, 'na URL http://localhost:' + port);
});
