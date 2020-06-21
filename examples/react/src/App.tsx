import React from 'react'
import './App.css'
import vanillaWm from '@vanilla-lab/web-monetization'

// VanillaVW JavaScript plugin initialization
const monetization = vanillaWm({
  // Your client id
  clientId: '835e576c-600e-4348-bc91-9051150ddc4b',
  // Your client secret
  clientSecret: 'vuLQuc4Xtxy8va7EDspIXrIsErrevk4o3ZYupTYerpA=',
  verbose: true
})

function App() {
  const [proof,setProof]=React.useState<any>({})
  const [hasPayed,setHasPayed]=React.useState(false)
  const [isWMLoaded,setIsWmLoaded] = React.useState(false)

  const start = () => {
    /* Verify function is called after 'start' event when RequestId is obtained from browser */
    monetization.verify().then(({
      total, rate, isPaying}) => {
        setProof({total,rate,isPaying})
        setHasPayed(isPaying)
    }).catch((error) => {
      // Handle another API errors
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
      {isWMLoaded && !hasPayed &&  <>Could not verify payment!</>}
      {isWMLoaded && hasPayed && <>
        <h1>Monetization Proof received! 🥰</h1>
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
