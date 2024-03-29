const colors = require('colors');
colors.setTheme({
    error: ['black', 'bgRed'],
    succeed: ['black', 'bgBlue']
});

const printers = {
    errorPrint: (message) => {
        console.log(colors.error(message));
    },
    
    successPrint: (message) => {
        console.log(colors.succeed(message));
    }
}

module.exports = printers;