import { GluegunToolbox } from 'gluegun'

module.exports = {
  name: 'omnirc',
  alias: [],
  description: 'OmniTools for React Projects',
  run: async (toolbox: GluegunToolbox) => {
    toolbox.print.printHelp(toolbox);
  }
}
