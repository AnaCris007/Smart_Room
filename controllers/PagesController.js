const PagesController = {
    paginaLogin: (req, res) => {
        res.render('Login');
    },

    paginaCadastro: (req, res) => {
        res.render('Cadastro');
    },

    paginaReservas: (req, res) => {
        res.render('Reservas');
    },
};

module.exports = PagesController;
