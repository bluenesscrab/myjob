# nodetpl-loader
===

[![Build Status](https://secure.travis-ci.org/pillys/nodetpl-loader.png?branch=master)](https://travis-ci.org/pillys/nodetpl-loader)


nodetpl-plus loader for webpack

About nodetpl-plus see <https://github.com/pillys/nodetpl-plus>


## Usage

```
npm install nodetpl-loader --save
```

## Configration

```
loaders: [{
  test: /\.(jsx?|tpl)$/,
  loader: 'babel',
  ...
}],
preLoaders: [{
  test: /\.tpl?$/,
  loader: 'nodetpl'
}]
```

## Questions?

If you have any questions, please feel free to ask through [New Issue](https://github.com/pillys/nodetpl-loader/issues/new).

### License

  nodetpl-loader is available under the terms of the [MIT](LICENSE) License.
