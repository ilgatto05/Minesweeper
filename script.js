
//import {crearGrilla} from "./div-test-button"
class Casilla{
    constructor(id, ingreso){
      this.bomba=false;
      this.flagged=false;
      this.bombsAround=0;
      this.isBlank=false;
      this.id=convertirIdACoordenadas(id, ingreso);
    }
  }
  
  
  
  function crearMyArray(ingreso){
      let arrayLocal=[];
      let arrayGlobal=[];
  for(let i=0;i<=(numeroElegido*numeroElegido);i++){
    let casilla=new Casilla;
    casilla.id=i;
    if(arrayLocal.length===ingreso){
        arrayGlobal.push(arrayLocal);
        i--;
        arrayLocal=[];
    }
    else{
        arrayLocal.push(casilla);
    }
  }
  return arrayGlobal;
  }
  
  
  function crearBomba(ingresoUsuario){//genera array con porcentaje de bombas relacionado
      let cantidadBombas=Math.floor((Math.pow(ingresoUsuario, 2)*16)/100);// con el tamaño matriz
      let arrayBombas=[];//16 es porcentaje
      let bombaActual;
      for(let i=0; i<cantidadBombas; i++){
          bombaActual=Math.floor(Math.random()*Math.pow(ingresoUsuario, 2));//numero aleatorio
          if(arrayBombas.includes(bombaActual)){//con coordenada en base a ingresousuario
              i--;
              continue;
          }
          arrayBombas.push(convertirIdACoordenadas(bombaActual, ingresoUsuario))//array de arrays
      }
      //console.log(arrayBombas)
      colocarBomba(arrayBombas)
  }
  
  function convertirIdACoordenadas(Id, ingresoUsuario){
      let fila=Math.floor(Id/ingresoUsuario);
      let columna=Id%ingresoUsuario;
      return [fila, columna];
  }
  
  function colocarBomba(array){//toma los array incluidos en array crearBomba y los coloca en myarray 
      array.forEach(element=>{
          //console.log(element)
          (myArray[element[0]][element[1]]).bomba=true
      })
  }
  
  function chequearCasillasValidas(IdCasilla, ingreso){
      /*let coordFila=IdCasilla[0]
      let coordColumna=IdCasilla[1]*/
      let coordFila=convertirIdACoordenadas(IdCasilla, ingreso)[0];
      let coordColumna=convertirIdACoordenadas(IdCasilla, ingreso)[1];
      let arrayCasillasAdycentes=[[coordFila-1, coordColumna-1], [coordFila-1, coordColumna], 
      [coordFila-1, coordColumna+1], [coordFila, coordColumna-1], [coordFila, coordColumna+1],
      [coordFila+1, coordColumna-1], [coordFila+1, coordColumna], [coordFila+1, coordColumna+1]];
      let arrayCasillasValidas=[]; 
     
      arrayCasillasAdycentes.forEach(element=>{
          if(((element[0]>(-1)&&element[0]<ingreso)&&(element[1]!==(-1)&&element[1]<ingreso))&&!(arrayCasillasValidas.includes(element))){
                  arrayCasillasValidas.push(element)
          }
      })
      
      return arrayCasillasValidas;
  }
  
  function contarBombas(coord, ingreso){//chequea si hay bomba en la casilla actual, sino hay cuenta bombas
      //console.log(myArray[coord[0]][coord[1]])
      if((myArray[coord[0]][coord[1]]).bomba===true){//en casillas adyacentes
          return true
      }
      else{
          let joined=coord[0]*ingreso+coord[1]
          let arrayCasillasValidas=chequearCasillasValidas(joined, ingreso);
          /*let arrayUnido=[]
          arrayCasillasValidas.forEach(element=>{
            arrayUnido.push(element.join(''))
            
          })*/
          let contador=0;
          arrayCasillasValidas.forEach(element=>{
            //element=parseInt(element)
              if(myArray[element[0]][element[1]].bomba===true){
                  //console.log(myArray[element[0]][element[1]])
                  contador++
              }
          })
          //console.log(arrayUnido)
          return contador;
      }
  }
  
  function chequearTodasLasCasillas(ingreso, array){
      for(let i=0; i<(myArray.length*myArray.length);i++){
          let coordenada=convertirIdACoordenadas(i, ingreso)
        if(myArray[coordenada[0]][coordenada[1]].bomba===true){
            myArray[coordenada[0]][coordenada[1]].isBlank=false;
          continue
        }
        else if(contarBombas(coordenada, ingreso)===0){
            myArray[coordenada[0]][coordenada[1]].isBlank=true//la funcion esta siendo chequeada 2 veces ¡¡¡SOLUCIONAR!!!
            array.push(myArray[coordenada[0]][coordenada[1]])
        }
        else{
          myArray[coordenada[0]][coordenada[1]].bombsAround=contarBombas(coordenada, ingreso)
        }
      }
  }
  
  function chequearCasillasClick(Id, ingreso, arrayComprobados){
      let coordenada=convertirIdACoordenadas(Id, ingreso)
      if((myArray[coordenada[0]][coordenada[1]]).isBlank===true){
          //let identificador=Id.join('')
          document.getElementById(`${Id}`).setAttribute('style', 'background-color: red;')
          let array1=chequearCasillasValidas(Id, ingreso)
          for(let i=0; i<array1.length; i++){
              //contador++
              let element=array1[i]
              let joined=element[0]*ingreso+element[1]
              if((myArray[element[0]][element[1]]).isBlank===true && !(arrayComprobados.includes(joined))){
                  arrayComprobados.push(joined)//usar id's
                  console.log(arrayComprobados)
                  chequearCasillasClick(joined, ingreso, arrayComprobados)
              }
              else if(myArray[element[0]][element[1]].bombsAround>0){
                  let joined=element[0]*ingreso+element[1]
                  document.getElementById(`${joined}`).setAttribute('style', 'background-color: red;')
                  document.getElementById(`${joined}`).textContent=`${myArray[element[0]][element[1]].bombsAround}`
              }
            }
      }else if(myArray[coordenada[0]][coordenada[1]].bomba===true){
        document.getElementById(`${Id}`).setAttribute('style', 'background-color: black;')
          alert('La cagaste')    
      }
      else{
          document.getElementById(`${Id}`).textContent=`${myArray[coordenada[0]][coordenada[1]].bombsAround}`
      }
  }
  
  function ingresarNumero() {
      let num;
      do{
          num=prompt("ingrese")
      }while((num<10 || num>30)&&num)
      return parseInt(num)
  }

  /*codigo div test*/

 

function avoidDefault2(ingreso){
    for(let i=0; i<(ingreso*ingreso);i++){
let noContext = document.getElementById(i);
noContext.addEventListener("contextmenu", e=>{
    e.preventDefault();
})};}

  function changeColor(id){
    let elem=document.getElementById(id);//agregar funcion para volver al color anterior
    if(getComputedStyle(elem).getPropertyValue('background-color')==='rgb(239, 239, 239)'){
        elem.style.backgroundColor='green';
    }else{
        elem.style.backgroundColor='#efefef';
    }
    
}
//let ingreso=parseInt(prompt("algo"));
function crearGrilla(ingreso){
let ancho=(ingreso)*23;
document.getElementById("div1").setAttribute("style", `width:${ancho}px; height:${ancho}px`)
for(let i=0; i<ingreso*ingreso;i++){
    if(i>0 && i%ingreso===0){
        div1.appendChild(document.createElement("br"))
    }
    let pnuevo=document.createElement("button");
    pnuevo.setAttribute("class", "button1");
    pnuevo.setAttribute("id", `${i}`)
    //pnuevo.setAttribute('onclick', `changeColor(${i})`)
    pnuevo.setAttribute('oncontextmenu', `changeColor(${i})`)
    div1.appendChild(pnuevo);
}}
function avoidDefault2(ingreso){
    for(let i=0; i<(ingreso*ingreso);i++){
let noContext = document.getElementById(i);
noContext.addEventListener("contextmenu", e=>{
    e.preventDefault();
})};}

/*fin codigo test div */
  
  let myArray=[]
  let arrayElementosComprobados=[];
  
  let numeroElegido;
  numeroElegido=ingresarNumero();
  
  myArray = crearMyArray(numeroElegido);
  
  crearBomba(numeroElegido);
  let arrayBlank=[]
  chequearTodasLasCasillas(numeroElegido, arrayBlank)
  console.log(arrayBlank)
  crearGrilla(numeroElegido)
  avoidDefault2(numeroElegido)
  let botones=document.querySelectorAll('.button1')
  for(let i=0; i<numeroElegido*numeroElegido; i++){
      botones[i].addEventListener("click", function(){
          let identificador=parseInt(this.id)
          chequearCasillasClick(identificador, numeroElegido, arrayElementosComprobados)
      })
  }
  
 //botones[0].addEventListener("click", chequearCasillasVacias(parseInt(this.id), numeroElegido))
 //botones[0].addEventListener("click", function(){
   // console.log(((this.id)))
  //})
