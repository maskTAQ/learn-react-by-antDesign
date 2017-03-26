var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack= require("webpack");
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/dev/"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [ ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        loaders: [
        {
            test: /\.tsx?$/,
            loader: ['babel-loader','awesome-typescript-loader']
        },
       {
    test: /\.css/,
    loader: ExtractTextPlugin.extract('css-loader')
},
        {test: /\.less$/, loader: ExtractTextPlugin.extract('css-loader!less-loader')}
        ]


    },
    devServer: {
        inline: true,//实时刷新
        port:8080
    },
    plugins:  [
     new ExtractTextPlugin("[name].css"),  
],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
};