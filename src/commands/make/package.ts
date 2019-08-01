import { join } from 'path'
import { GluegunToolbox } from 'gluegun'
import { WithGetParam } from '../../extensions/getParam'
import { WithFindProjectDir } from '../../extensions/findProjectDir'

module.exports = {
  name: 'package',
  alias: ['p'],
  description: 'Creates a new package',
  run: async (toolbox: GluegunToolbox & WithGetParam & WithFindProjectDir) => {
    const {
      getParam,
      findProjectDir,
      print,
      filesystem: fs,
      meta,
      template
    } = toolbox

    const name = await getParam({
      type: 'arg',
      index: 0,
      name: 'package'
    })

    const scope = await getParam({
      type: 'option',
      name: 'scope',
      ask: false,
      validator: () => true
    })

    let packageDir = await getParam({
      type: 'option',
      name: 'package-dir',
      ask: false,
      validator: () => true
    })

    if (!packageDir) {
      const projectDir = findProjectDir()
      if (!projectDir) {
        print.error('Project directory not found!')
      }

      packageDir = `${projectDir}/packages/${name}`
    }

    const filesDir = join(meta.src as string, 'templates', 'package-default')
    const templateProps = {
      name,
      scope,
      packageName: scope ? `${scope}/${name}` : name
    }

    fs.copy(filesDir, packageDir, { overwrite: true })

    template.generate({
      template: 'package-default/README.md',
      target: `${packageDir}/README.md`,
      props: templateProps
    })

    template.generate({
      template: 'package-default/package.json',
      target: `${packageDir}/package.json`,
      props: templateProps
    })
  }
}
