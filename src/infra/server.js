const { app } = require('./app')
const { startConnection } = require('../infra/contas/mongoDB')

const port = process.env.SERVER_PORT || 3000

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});


startConnection()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`)
        })
    })
    .catch(err => {
        console.error('Failed to start application due to database error')
        process.exit(1)
    })