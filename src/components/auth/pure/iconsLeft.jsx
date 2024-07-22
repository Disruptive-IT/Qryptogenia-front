import morado from '../../../assets/imgs/triangulo1.png'
import azul from '../../../assets/imgs/triangulo2.png'
import CAzul from '../../../assets/imgs/circulo1.png'
import CMorado from '../../../assets/imgs/circulo2.png'
import Logo from "../../../assets/imgs/logoForms.png"

export const IconsLeft =()=>{
    const styles={
        1:{width:"39px", position:'absolute', left:"300px", top:"40px"},
        2:{width:"100px", position:'absolute', left:"250px", top:"180px"},
        3:{width:"40px", position:'absolute', left:"200px", top:"240px"},
        4:{width:"78px", position:'absolute', left:"120px", top:"35px"},
        5:{width:"128px", position:'absolute', left:"80px", top:"300px"},
        6:{width:"28px", position:'absolute', left:"380px", top:"305px"},
        7:{width:"68px", position:'absolute', left:"30px", top:"135px"},
        8:{width:"20px", position:'absolute', left:"10px", top:"305px"},
        9:{width:"15px", position:'absolute', left:"90px", top:"15px"},
        10:{width:"25px", position:'absolute', left:"240px", top:"325px"},
        11:{width:"25px", position:'absolute', left:"220px", top:"135px"},
        12:{width:"25px", position:'absolute', left:"17px", top:"95px"},
        13:{width:"25px", position:'absolute', left:"170px", top:"450px"},
        

    }
    return(
        <div className='iconitos'>
           <img className='rigth' src={azul} style={styles[1]}/>
           <img className='rigth' src={azul} style={styles[5]}/>
           <img className='left' src={azul} style={styles[6]}/>
           <img className='rigth' src={azul} style={styles[7]}/>
           <img className='left' src={morado} style={styles[2]}/> 
           <img className='rigth' src={morado} style={styles[3]}/> 
           <img className='left' src={morado} style={styles[4]}/>
           <img src={CAzul} style={styles[13]}/>
           <img src={CAzul} style={styles[8]}/>
           <img src={CAzul} style={styles[9]}/>
           <img src={CMorado} style={styles[10]}/>
           <img src={CMorado} style={styles[11]}/>
           <img src={CMorado} style={styles[12]}/> 
        </div>
    )
}