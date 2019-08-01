import { join, dirname, parse } from 'path'
import { GluegunToolbox, GluegunFilesystem } from 'gluegun'

export interface WithFindNpmProject {
  findNpmProject(): string
}

const isNpmProjectDir = (fs: GluegunFilesystem, path: string) => {
  return fs.exists(join(path, 'package.json')) === 'file'
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

  toolbox.findNpmProject = () =>
    walkDir(fs, _ => isNpmProjectDir(fs, _), process.cwd())
}
