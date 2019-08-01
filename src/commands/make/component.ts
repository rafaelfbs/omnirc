import { join, basename, dirname } from 'path'
import { GluegunToolbox } from 'gluegun'
import { WithGetParam } from '../../extensions/getParam'
import { WithFindNpmProject } from '../../extensions/findNpmProject'
import { kebab, pascal, camel } from 'case'

module.exports = {
  name: 'component',
  alias: ['c'],
  description: 'Creates a new component',
  run: async (toolbox: GluegunToolbox & WithGetParam & WithFindNpmProject) => {
    const { getParam, findNpmProject, print, template } = toolbox

    const name = await getParam({
      type: 'arg',
      index: 0,
      name: 'componentName'
    })

    let packageDir = await getParam({
      type: 'option',
      name: 'package-dir',
      ask: false,
      validator: () => true
    })

    if (!packageDir) {
      packageDir = findNpmProject()
      if (!packageDir) {
        print.error('Package directory not found!')
      }
    }

    const componentName = basename(name)
    const domainPath = dirname(name)

    print.debug({ name, packageDir, componentName, domainPath })

    const templateProps = {
      name,
      componentName: {
        kebab: kebab(componentName),
        pascal: pascal(componentName),
        camel: camel(componentName)
      },
      domainPath,
      packageDir
    }

    template.generate({
      template: 'component-default/component.tsx.ejs',
      target: `${join(
        packageDir,
        'src',
        domainPath,
        `${kebab(componentName)}`
      )}.component.tsx`,
      props: templateProps
    })

    template.generate({
      template: 'component-default/component.spec.tsx.ejs',
      target: `${join(
        packageDir,
        'src',
        domainPath,
        `${kebab(componentName)}`
      )}.component.spec.tsx`,
      props: templateProps
    })

    template.generate({
      template: 'component-default/component.stories.tsx.ejs',
      target: `${join(
        packageDir,
        'src',
        domainPath,
        `${kebab(componentName)}`
      )}.component.stories.tsx`,
      props: templateProps
    })

    template.generate({
      template: 'component-default/store.ts.ejs',
      target: `${join(
        packageDir,
        'src',
        domainPath,
        `${kebab(componentName)}`
      )}.store.tsx`,
      props: templateProps
    })
  }
}
