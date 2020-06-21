import request from '../api/request'
import verifyQuery from '../api/queries/verify'
import logger from '../utils/logger'
import VanillaWMPlugin, { ConstructorType } from '../VanillaWMPlugin'

declare let document: {
  monetization: {
    addEventListener: any
    removeEventListener: any
  }
}

type VerifyType = (
  requestId?: string
) => Promise<{
  total: number
  rate: number
  isPaying: boolean
}>

type EventType = 'start'

class VanillaWM extends VanillaWMPlugin<EventType> {
  // private
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

  // public
  public verify: VerifyType = (requestId = this.requestId) => {
    const handleReject = ({ error, reject }) => {
      if (this.verbose) logger.error(error)

      reject(error)
    }

    const handleResolve = ({ data, resolve }) => {
      if (this.verbose) logger.info(data)

      resolve(data)
    }

    return new Promise((resolve, reject) => {
      if (!this.requestId) {
        return resolve({ total: 0, rate: 0, isPaying: false })
      }
      return request(verifyQuery(requestId), {
        clientId: this.clientId,
        clientSecret: this.clientSecret,
        VANILLA_API_URL: VanillaWM.VANILLA_API_URL,
      })
        .then(({ data: { proof } }) => {
          return handleResolve({
            // User is paying if total is > 0
            data: { ...proof, isPaying: proof.total !== 0 },
            resolve,
          })
        })
        .catch((error) => handleReject({ error, reject }))
    })
  }

  public on = (eventType: EventType, listener: () => void) => {
    if (eventType === 'start') {
      this.startEvents.push(listener)
      this.start()
    }
  }

  public off = (eventType: EventType, listener: () => void) => {
    if (eventType === 'start') {
      this.startEvents = this.startEvents.filter(
        (fn) => fn.toString() !== listener.toString()
      )
    }
  }

  constructor(props: ConstructorType) {
    super(props)

    const { requestId } = props

    if (!requestId && typeof window !== 'undefined' && document.monetization) {
      document.monetization.addEventListener(
        'monetizationprogress',
        this.getRequestId
      )
    }
  }
}

export default VanillaWM
