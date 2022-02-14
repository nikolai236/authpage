class MainController {
    home = (req, res, next) => {
        res.send(true);
    }
}

module.exports = new MainController;