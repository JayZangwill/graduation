const fs = require('fs'),
    os = require('os'),
    express = require('express'),
    app = express(),
    compression = require('compression'),
    childProcess = require('child_process'),
    history = require('connect-history-api-fallback'),
    staticFileMiddleware = express.static(__dirname);
let html = fs.readFileSync('index.html').toString();

// index.html的style引入
if (!/<link rel=\"stylesheet\" href=\"dist\/css\/main\.min\.css\">/.test(html)) {
    html = html.replace(/<title>(\w+)<\/title>/, '<title>$1</title>\n\t<link rel="stylesheet" href="dist/css/common.min.css">\n\t<link rel="stylesheet" href="dist/css/main.min.css">');
    fs.writeFileSync('index.html', html);
}

app.use(compression());
// 配合vue-router
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);
app.listen(80, () => {
    let ifaces = os.networkInterfaces(),
        ip;
    for (let item in ifaces) {
        ip = Object.values(ifaces[item])[1].address;
        break;
    }
    childProcess.exec(ip ? `start http://${ip}` : 'start http://localhost');
    console.log('server is running!');
});