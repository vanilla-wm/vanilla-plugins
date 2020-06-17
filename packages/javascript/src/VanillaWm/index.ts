import request from '../api/request'
import verifyQuery from '../queries/verify'
import logger from '../utils/logger'

declare let document: {
  monetization: any
}

type ConstructorType = {
  clientId: string
  clientSecret: string
  requestId?: string
  verbose?: boolean
}

class VanillaWm {
  private static VANILLA_API_URL = 'https://wm.vanilla.so/graphql'

  // private
  private clientId: string

  private readonly verbose: boolean

  private clientSecret: string

  private startEvents: (() => void)[] = []

  private requestId: string

  // public
  verify: (
    requestId?: string
  ) => Promise<{
    total: number
    rate: number
    isPaying: boolean
  }> = (requestId = this.requestId) => {
    return new Promise((resolve, reject) =>
      request(verifyQuery(requestId), {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        VANILLA_API_URL: VanillaWm.VANILLA_API_URL,
      })
        .then(({ data: { proof } }) => {
          if (this.verbose) logger.info(proof)

          resolve({ ...proof, isPaying: proof.total !== 0 })
        })
        .catch((error) => {
          if (this.verbose) logger.error(error)

          reject(error)
        })
    )
  }

  private start = () => {
    if (this.requestId) {
      this.startEvents.forEach((fn) => fn())
    }
  }

  private getRequestId = ({ detail }) => {
    this.requestId = detail.requestId
    // Cleanup
    document.monetization.removeEventListener(
      'monetizationprogress',
      this.getRequestId
    )
    // Dispatch ready
    this.start()
  }

  public on = (eventType: string, fn: () => void) => {
    if (eventType === 'start') {
      this.startEvents.push(fn)
      this.start()
    }
  }

  public off = (eventType: string, fnToRemove: () => void) => {
    if (eventType === 'start') {
      this.startEvents = this.startEvents.filter(
        (fn) => fn.toString() !== fnToRemove.toString()
      )
    }
  }

  constructor({
    clientId,
    clientSecret,
    requestId,
    verbose = false,
  }: ConstructorType) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.requestId = requestId
    this.verbose = verbose

    if (!requestId && typeof window !== 'undefined' && document.monetization) {
      document.monetization.addEventListener(
        'monetizationprogress',
        this.getRequestId
      )
    }
  }
}

const initialize = ({
  clientId,
  clientSecret,
  ...restProps
}: ConstructorType) => new VanillaWm({ clientId, clientSecret, ...restProps })

export default initialize
