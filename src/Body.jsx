import React, { useContext } from 'react'
import './Body.css'
import { Context } from './context'

function Body() {
  const { onsent, recentprompt, showresult, loading, resultdata, setinput, input } = useContext(Context);
  return (
    <>
      <div className="body">
{showresult ? 
 <div className='result' >
  <div className="result-title">
  <p>{recentprompt}</p>
  <img src="./src/assets/user.webp" alt="User-Img" />
  </div>
  <div className="result-data">
    <img src="./src/assets/itachi.jpg" alt="itachi-img" />
    {loading ?
    <div className="loader">
    <hr />
    <hr />
    </div> :
    <p dangerouslySetInnerHTML={{__html:resultdata}}></p>
     }
  </div>
 </div> :
        <div className="head-part">
          <img src="./src/assets/itachi.jpg" alt="itachi-img" />
          <h4>Hello Frnd</h4>
          <h5>Iam Itachi Uchiha From hidden leaf</h5>
          <p>How can i Help You Today ? </p>
        </div>
}
        <div className="foot-part">
          <input type="text" onChange={(e)=>setinput(e.target.value)} value={input} placeholder='Enter Prompt Here' />
          <i onClick={()=>onsent()} class="bi bi-arrow-up-circle"></i>
        </div>

      </div>

    </>
  )
}

export default Body