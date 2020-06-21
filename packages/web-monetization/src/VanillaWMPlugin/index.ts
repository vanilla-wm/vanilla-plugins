export type ConstructorType = {
  clientId: string
  clientSecret: string
  requestId?: string
  verbose?: boolean
}

export default abstract class VanillaWMPlugin<EventType> {
  protected static VANILLA_API_URL = 'https://wm.vanilla.so/graphql'

  protected clientId: string

  protected readonly verbose: boolean

  protected clientSecret: string

  protected startEvents: (() => void)[] = []

  protected requestId: string

  protected constructor({
    clientId,
    clientSecret,
    requestId,
    verbose = false,
  }: ConstructorType) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.requestId = requestId
    this.verbose = verbose
  }
}
