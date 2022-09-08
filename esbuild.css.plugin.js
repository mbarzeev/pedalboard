const path = require('path');

module.exports = {
    name: 'css',
    setup(build) {
        // Redirect all paths starting with "images/" to "./public/images/"
        build.onResolve({filter: /.\.css$/}, (args) => {
            const path1 = args.resolveDir.replace('/dist/esm', '');
            return {path: path.join(path1, args.path)};
        });
    },
};
