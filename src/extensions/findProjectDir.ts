import { join, dirname, parse } from 'path'
import { GluegunToolbox, GluegunFilesystem } from 'gluegun'

export interface WithFindProjectDir {
  findProjectDir(): string
}

const isLernaDir = (fs: GluegunFilesystem, path: string) => {
  return fs.exists(join(path, 'lerna.json')) === 'file'
}

const walkDir = (
  fs: GluegunFilesystem,
  valid: (path: string) => boolean,
  path: string
) => {
  if (valid(path)) return path
  if (parse(path).root === path) return null
  return walkDir(fs, valid, dirname(path))
}

module.exports = (toolbox: GluegunToolbox) => {
  const { filesystem: fs } = toolbox

  toolbox.findProjectDir = () =>
    walkDir(fs, _ => isLernaDir(fs, _), process.cwd())
}
