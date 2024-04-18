import morado from '../../../assets/imgs/triangulo1.png'
import azul from '../../../assets/imgs/triangulo2.png'
import CAzul from '../../../assets/imgs/circulo1.png'
import CMorado from '../../../assets/imgs/circulo2.png'

export const IconsRight =()=>{
    const styles={
        1:{width:"39px", position:'absolute', right:"300px", top:"40px"},
        2:{width:"100px", position:'absolute', right:"250px", top:"180px"},
        3:{width:"40px", position:'absolute', right:"200px", top:"240px"},
        4:{width:"78px", position:'absolute', right:"120px", top:"35px"},
        5:{width:"128px", position:'absolute', right:"80px", top:"300px"},
        6:{width:"28px", position:'absolute', right:"380px", top:"305px"},
        7:{width:"68px", position:'absolute', right:"30px", top:"135px"},
        8:{width:"20px", position:'absolute', right:"10px", top:"305px"},
        9:{width:"15px", position:'absolute', right:"90px", top:"15px"},
        10:{width:"25px", position:'absolute', right:"240px", top:"325px"},
        11:{width:"25px", position:'absolute', right:"220px", top:"135px"},
        12:{width:"25px", position:'absolute', right:"17px", top:"95px"},
        13:{width:"25px", position:'absolute', right:"170px", top:"450px"},
    }

    return(
        <div className='iconitos'>
           <img className='rigth' src={azul} style={styles[5]}/>
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