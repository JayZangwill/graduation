const fs = require('fs'),
    express = require('express'),
    app = express(),
    compression = require('compression'),
    history = require('connect-history-api-fallback'),
    staticFileMiddleware = express.static(__dirname);
let html = fs.readFileSync('index.html').toString();
if (!/<link rel=\"stylesheet\" href=\"dist\/css\/main.css\">/.test(html)) {
    html = html.replace(/<title>(\w+)<\/title>/, '<title>$1</title>\n\t<link rel="stylesheet" href="dist/css/common.css">\n\t<link rel="stylesheet" href="dist/css/main.css">');
    fs.writeFileSync('index.html', html);
}

app.use(compression());
app.use(staticFileMiddleware);
app.use(history({
    disableDotRule: true,
    verbose: true
}));
app.use(staticFileMiddleware);
app.listen(80, () => console.log('server is running!'));