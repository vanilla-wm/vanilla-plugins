export default (requestId) => `
{
    proof(requestId: "${requestId}") {
        total  
        rate
    }
}`
