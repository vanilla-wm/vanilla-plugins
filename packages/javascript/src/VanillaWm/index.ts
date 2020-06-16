declare var document: any



type ConstructorType = {
    clientId: string;
    clientSecret: string;
    requestId?: string;
}

class  VanillaWm {
    //private
    private clientId: string;
    private clientSecret: string;
    private requestId: string;
    private VANILLA_API_URL: "https://wm.vanilla.so/graphql"
    private fetched_at: string;

    // public
    get isPaying(){

    }

    get total(){

    }

    get rate(){

    }

    constructor({ clientId, clientSecret,requestId}:ConstructorType) {
        this.clientId = clientId
        this.clientSecret= clientSecret
        this.requestId = requestId

        if (!requestId && typeof window !== 'undefined' && document.monetization) {
            document.monetization.addEventListener('monetizationprogress', ({detail}) => {
                    this.requestId = detail.requestId})
        }
    }


}

const initialize = ({clientId,clientSecret})=> new VanillaWm({ clientId, clientSecret})

export default initialize
