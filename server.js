const fs = require('fs'),
    express = require('express'),
    app = express(),
    compression = require('compression'),
    childProcess = require('child_process'),
    history = require('connect-history-api-fallback'),
    staticFileMiddleware = express.static(__dirname);
let html = fs.readFileSync('index.html').toString();

// index.html的style引入
if (!/<link rel=\"stylesheet\" href=\"dist\/css\/main.css\">/.test(html)) {
    html = html.replace(/<title>(\w+)<\/title>/, '<title>$1</title>\n\t<link rel="stylesheet" href="dist/css/common.css">\n\t<link rel="stylesheet" href="dist/css/main.css">');
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
	childProcess.exec('start http://localhost');
	console.log('server is running!');
});