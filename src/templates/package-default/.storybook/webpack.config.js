module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: 'awesome-typescript-loader'
      },
      {
        loader: 'react-docgen-typescript-loader'
      }
    ]
  })

  config.resolve.extensions.push('.ts', '.tsx')

  return config
}
