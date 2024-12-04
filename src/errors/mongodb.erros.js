const notFoundError = (res) => {
    return res.status(404).send("Essa tarefa não foi encontrada");
};

const ObjectIdCastIdError = (res) => {
    return res.status(500).send("O id passado não é um id válido");
};

module.exports = { notFoundError, ObjectIdCastIdError };
