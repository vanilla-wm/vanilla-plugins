import React from 'react'
import './App.css'
import vanillaWm from '@vanilla-wm/plugin-javascript'

// Vanilla-VW plugin initialization
const monetization = vanillaWm({
  clientId: '835e576c-600e-4348-bc91-9051150ddc4b',
  clientSecret: 'vuLQuc4Xtxy8va7EDspIXrIsErrevk4o3ZYupTYerpA=',
  verbose: true
})

function App() {
  const [proof,setProof]=React.useState<any>({})
  const [hasPayed,setHasPayed]=React.useState(false)
  const [isWMLoaded,setIsWmLoaded] = React.useState(false)

  const start = () => {
    /* Verify function called after 'start' event (RequestId is defined) */
    monetization.verify().then(({
      total, rate, isPaying}) => {
        setProof({total,rate,isPaying})
      setHasPayed(isPaying)
    }).catch((error) => {
      console.log(error)
    }).finally(()=>{
      setIsWmLoaded(true)
    })
  }

  React.useEffect(()=>{
    monetization.on('start', start)
  },[])

  const {total= null,rate = null} = proof

  return (
    <div className="App">
      {!isWMLoaded && <>Loading Web Monetization...</>}
      {isWMLoaded && !hasPayed &&  <>User not paying...</>}
      {isWMLoaded && hasPayed && <>
        <h1>Monetization Proof</h1>
        <div>
          Total: {total}
        </div>
        <div>
          Rate: {rate}
        </div>
      </>
      }
    </div>
  )
}

export default App
