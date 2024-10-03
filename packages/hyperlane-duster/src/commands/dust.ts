import {Args, Command} from '@oclif/core'

export default class Dust extends Command {
  static override args = {
    chainId: Args.integer({ description: 'chainId', required: true}),
    token: Args.string({description: 'token address', required: true}),
  }

  static override description = 'Dust Hyperlane Token Receivers'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {}

  public async run(): Promise<void> {
    const {args} = await this.parse(Dust)
    const { chainId, token } = args;

    this.log(`Dusting ${token} receivers on ${chainId}`)
  }
}
