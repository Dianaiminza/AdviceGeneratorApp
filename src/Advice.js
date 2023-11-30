import React from 'react'

 const Advice = (props) => {
    const[advice,setAdvice]=React.useState()
    React.useEffect(()=>{
        fetch(`https://api.adviceslip.com/advice${props.Id}`)
        .then(response =>response.json())
        .then(adviceResponse=>setAdvice(adviceResponse))

    },[props.Id]);
    if(!advice){
        return <p>Please input advice Id</p>
    }
    return (
        <p>
          {advice.value}  
        </p>
    )
}
export default Advice;