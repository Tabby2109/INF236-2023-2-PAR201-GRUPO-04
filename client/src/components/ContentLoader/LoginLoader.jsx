import React from "react"
// import ContentLoader from "react-content-loader"

const LoginLoader = (props) => {
  return (
    <div className="background-color vh-100 d-flex flex-column align-items-center pt-5">
      <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <h5>Espere un momento.</h5>
    </div>
   

    
  )
}
  


export default LoginLoader;