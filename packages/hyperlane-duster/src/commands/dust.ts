import { Command, Flags} from '@oclif/core'
import { dustTokenRecipientsForChain } from "@owlprotocol/contracts-hyperlane"
import { Address, Chain, Hex, createPublicClient, createWalletClient, http, webSocket } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import * as chains from "viem/chains"

export default class Dust extends Command {
  static override args = {}

  static override description = 'Dust Hyperlane Token Receivers'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    amount: Flags.string({description: 'amount to dust in wei', required: true}),
    chainId: Flags.integer({ description: 'chainId', required: true}),
    privateKey: Flags.string({description: 'private key', required: true}),
    token: Flags.string({description: 'token address', required: true}),
  }

  public async run(): Promise<void> {
    const { flags} = await this.parse(Dust)
    const { amount, chainId, privateKey, token } = flags as { amount: string, chainId: number, privateKey: Hex, token: Address};

    const chain = (Object.values(chains) as Chain[]).find((c) => c.id === chainId)

    if (!chain) {
        throw new Error(`Could not find chain with id ${chainId}`);
    }

    const transport = chain.rpcUrls.default.webSocket ? webSocket(chain.rpcUrls.default.webSocket[0]) : http(chain.rpcUrls.default.http[0]);
    const publicClient = createPublicClient({ chain, transport })

    const account = privateKeyToAccount(privateKey)
    const walletClient = createWalletClient({ account, chain, transport })

    // Get chain
    dustTokenRecipientsForChain({
        amount: BigInt(amount),
        publicClient,
        tokens: [{ address: token as Address }],
        walletClient
    })

    this.log(`Dusting ${token} receivers on ${chainId}`)
  }
}
