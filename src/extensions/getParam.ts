import { GluegunToolbox } from 'gluegun'

type QuestionTypeUnion = Parameters<GluegunToolbox['prompt']['ask']>[0]
type QuestionType = Exclude<QuestionTypeUnion, Array<any>>

export interface GetParamConfig {
  type: 'arg' | 'option'
  index?: number
  name: string
  ask?: QuestionType | false
  validator?: (value: string, config: GetParamConfig) => boolean
  errorMessage?: (value: string, config: GetParamConfig) => string
}

export interface WithGetParam {
  getParam(config: GetParamConfig): Promise<string>
}

function defaultValidator(value: string, _: GetParamConfig) {
  return value && value.length
}

function defaultErrorMessage(_: string, config: GetParamConfig) {
  return `The param ${config.name} is invalid`
}

function defaultAskOptions(config: GetParamConfig) {
  return {
    type: 'input',
    name: config.name,
    message: `${config.name}:`
  }
}

function arg(toolbox: GluegunToolbox, config: GetParamConfig) {
  return toolbox.parameters.array[config.index]
}

function option(toolbox: GluegunToolbox, config: GetParamConfig) {
  return toolbox.parameters.options[config.name]
}

async function ask(toolbox: GluegunToolbox, config: GetParamConfig) {
  const result = await toolbox.prompt.ask(
    config.ask || defaultAskOptions(config)
  )
  return result[config.name]
}

function value(toolbox: GluegunToolbox, config: GetParamConfig) {
  switch (config.type) {
    case 'arg':
      return arg(toolbox, config)
    case 'option':
      return option(toolbox, config)
    default:
      throw new Error(`Unknown type ${config.type}`)
  }
}

async function valueOrAsk(toolbox: GluegunToolbox, config: GetParamConfig) {
  const result = await value(toolbox, config)
  if (!result && config.ask !== false) {
    return await ask(toolbox, config)
  }

  return result
}

function invariant(check: boolean, message: string) {
  if (!check) {
    throw new Error(message)
  }
}

module.exports = (toolbox: GluegunToolbox) => {
  toolbox.getParam = async function getParam(config: GetParamConfig) {
    invariant(
      config.type !== 'arg' || typeof config.index === 'number',
      'index must be a number'
    )
    const validator = config.validator || defaultValidator
    const getErrorMessage = config.errorMessage || defaultErrorMessage

    const value = await valueOrAsk(toolbox, config)
    if (!validator(value, config)) {
      return Promise.reject(getErrorMessage(value, config))
    }

    return Promise.resolve(value)
  }
}
