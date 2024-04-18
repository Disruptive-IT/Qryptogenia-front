import google from "../../../assets/imgs/google.png"
import "./btns.css"


export const GoogleButton = ({action,text}) =>{

    return(

        <div style={{width:'100%',display:"flex", justifyContent:"center"}}>
            <button className="googleBtn"  onClick={action}><img style={{width:'30px'}} src={google} alt="" />{text}</button>
        </div>
    )
}