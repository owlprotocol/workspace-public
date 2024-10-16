import { Command, Flags} from '@oclif/core'
import { dustTokenRecipientsForChain } from "@owlprotocol/contracts-hyperlane"
import { Address, Chain, Hex, createWalletClient, http, webSocket } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { getChainId } from 'viem/actions'
import * as chains from "viem/chains"

export default class Dust extends Command {
  static override args = {}

  static override description = 'Dust Hyperlane Token Receivers'

  static override examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static override flags = {
    amount: Flags.string({description: 'amount to dust in wei', required: true}),
    chainId: Flags.integer({ description: 'chainId', required: true }),
    rpc: Flags.string({ description: "custom rpc" }),
    privateKey: Flags.string({description: 'private key', required: true}),
    token: Flags.string({description: 'token address', required: true}),
  }

  public async run(): Promise<void> {
    const { flags} = await this.parse(Dust)
    const { amount, chainId, privateKey, token } = flags as { amount: string, chainId: number, privateKey: Hex, token: Address};

    let rpc = flags.rpc;
    let chain = (Object.values(chains) as Chain[]).find((c) => c.id === chainId)

    if (!rpc) {
        // Try to get default rpc from viem
        if (!chain) {
            throw new Error(`Could not find chain with id ${chainId} in viem/chains package, please provide --rpc`);
        }

        rpc = chain.rpcUrls.default.webSocket ? chain.rpcUrls.default.webSocket[0] : chain.rpcUrls.default.http[0]
    }

    if (!chain) {
        // Set chain as localhost but with chainId
        chain = {...chains.localhost, id: chainId }
    }

    const transport = rpc.startsWith("ws") ? webSocket(rpc) : http(rpc);
    const account = privateKeyToAccount(privateKey)
    const walletClient = createWalletClient({ account, chain, transport })

    const rpcChainId = await getChainId(walletClient)
    if (rpcChainId != chainId) {
        throw new Error(`Invalid rpc ${rpc} eth_chainId ${rpcChainId} != ${chainId}`)
    }

    // Get chain
    dustTokenRecipientsForChain(walletClient, {
        amount: BigInt(amount),
        tokens: [{ address: token as Address }],
    })

    this.log(`Dusting ${token} receivers on ${chainId}`)
  }
}
