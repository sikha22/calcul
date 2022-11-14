//Set media query for animating on larger screens
const animating = (x) => {
    if (x.matches) {  //If media query matches
        //Animate app on start up
        gsap.from('.container', {duration: 2.5, opacity: 0, stagger: 0.5, y: 500}) ;
    }
}
let x = window.matchMedia("(min-width: 768px)")
animating(x)  //call listener function at run time
x.addListener(animating); //Attach listener function on state change


//Toggle between scientific and simple mode stylesheets 
document.addEventListener('DOMContentLoaded', () => {

    const themeStylesheet = document.getElementById('theme') ;
    const modeToggle = document.getElementById('checkbox') ;
    modeToggle.checked != "checked" ;
    const simple = document.querySelector(".simple").style.display = "none" ;

    modeToggle.addEventListener('click', () => {
        // if it's scientific -> go simple
        if(themeStylesheet.href.includes('scientific')){
            themeStylesheet.href = './assets/css/simple.css' ;
            modeToggle.checked = "checked" ;
        
            //hide scientific mode while rendering simple
            document.querySelector(".simple").style.display = "grid" ;
            document.querySelector(".buttons").style.display = "none" ;
            document.querySelector(".buttons-special").style.display = "none" ;           
            document.querySelector("#radDisplay").style.visibility = "hidden" ;
            document.querySelector(".combPer").style.display = "none" ;
            
            //clear screen
            acOrOff("ac") ;
            display.innerHTML = "" ;
            input.value = "" ;

        } 
        else {
            // if it's normal -> go scientific
            themeStylesheet.href = './assets/css/scientific.css' ;
            modeToggle.checked != "checked" ;

            //hide simple mode
            document.querySelector(".simple").style.display = "none" ;
            document.querySelector(".buttons").style.display = "grid" ;
            document.querySelector(".buttons-special").style.display = "grid" ;
            if (document.querySelector("#modes").style.visibility == "visible") {
                document.querySelector("#radDisplay").style.visibility = "visible" ;
            }

            //clear screen
            acOrOff("ac") ;
            display.innerHTML = "" ;
        }
    })
})


//all elements selected from documents are assigned variable names.
let allButtons = document.querySelectorAll(".button") ;
let allBtnSpread = [...allButtons] ;
const button = document.querySelectorAll(".button") ;
const shift = document.getElementById("shift") ;
const stat = document.getElementById("stat") ;
const shiftDisplay = document.getElementById("shiftDisplay") ;
const statDisplay = document.getElementById("statDisplay") ;
const deg = document.querySelector("#deg") ;
const degDisplay = document.querySelector("#degDisplay") ;
const rad = document.querySelector("#rad") ;
const radDisplay = document.querySelector("#radDisplay") ;
let input = document.querySelector("#inputs") ;
let display = document.querySelector("#main-display") ;
let result = document.querySelector("#result") ;
let modes = document.querySelector("#modes") ;
let workArea = document.querySelector("#workArea") ;
let answer = document.querySelector("#answer") ;
let n = document.querySelector("#n") ;
let r = document.querySelector("#r") ;



// Add Css Style Animation for button effects
allBtnSpread.forEach((button, i)=> {
    button.addEventListener('click', ()=> {
       let element = allButtons[i] ;
       element.style.boxShadow ='inset -6px -6px 16px 0 rgba(255, 255, 255, .3), inset 6px 6px 16px 0 rgba(209, 205, 199, .3)' ;

       setTimeout(function(){
        element.style.boxShadow = " 6px 6px 16px 0 rgba(209, 205, 199, .3),-6px -6px 16px 0 rgba(255, 255, 255, .3)"
       }, 0300) ;

    })
})



//shift button to toggle button between functions
const shiftKey = (shiftPress) => {

    if (shiftPress == 1) {
       
        shift.setAttribute("onclick", "shiftKey(0)") ;
        shift.style.color = "rgb(252, 73, 41)";
        shiftDisplay.style.visibility = "visible"

        button[12].innerHTML = `2${"x".sup().fontsize(1.5)}` ;
        button[12].setAttribute("onclick", "eulerOrBaseTwo('0')") ;

        button[13].innerHTML = `10${"x".sup().fontsize(1.5)}`; 
        button[13].setAttribute("onclick", "logOrBaseTen('0')") ;

        button[14].innerHTML = `e${"x".sup().fontsize(1.5)}`; 
        button[14].setAttribute("onclick", "lnOrExp('0')") ;

        button[15].innerHTML =  `sin${"-1".sup().fontsize(1)}` ;
        button[15].setAttribute("onclick", "sin('0')") ;
        button[16].innerHTML =  `cos${"-1".sup().fontsize(1)}`; 
        button[16].setAttribute("onclick", "cos('0')") ;
        button[17].innerHTML =  `tan${"-1".sup().fontsize(1)}`; 
        button[17].setAttribute("onclick", "tan('0')") ;

        button[19].innerHTML = "nPr" ;
        button[19].setAttribute("onclick", "combOrPer()") ;

        button[34].innerHTML = "OFF" ;
        button[34].setAttribute("onclick", "acOrOff('off')") ;

        //clear combination inputs and assign permutation placeholders
        n.value = "";
        r.value = "";

        n.placeholder = "nP";
        r.placeholder = "r";

    } else {
        shift.setAttribute("onclick", "shiftKey(1)") ;
        shift.style.color = "#ffffff" ;
        shiftDisplay.style.visibility = "hidden" ;

        button[12].innerHTML = "e" ;
        button[12].setAttribute("onclick", "eulerOrBaseTwo('1')") ;

        button[13].innerHTML = "log" ;
        button[13].setAttribute("onclick", "logOrBaseTen('1')") ;

        button[14].innerHTML = "ln" ;
        button[14].setAttribute("onclick", "lnOrExp('1')") ;

        button[15].innerHTML = "sin" ;
        button[15].setAttribute("onclick", "sin('1')") ;

        button[16].innerHTML = "cos" ;
        button[16].setAttribute("onclick", "cos('1')") ;

        button[17].innerHTML = "tan" ;
        button[17].setAttribute("onclick", "tan('1')") ;

        button[19].innerHTML = "nCr" ;
        button[19].setAttribute("onclick", "combOrPer()") ;

        button[34].innerHTML = "AC" ;
        button[34].setAttribute("onclick", "acOrOff('ac')") ;

        //assign combination placeholders on input pop when key is pressed
        n.placeholder = "nC" ;
        r.placeholder = "r"
    }
    
}

//toggle stat buttons to change statistical button colors as well as activate them
const statKey = (statPress) => {

    if (statPress == 1) {
        stat.setAttribute("onclick", "statKey(0)") ;
        stat.style.color = "rgb(252, 73, 41)";
        statDisplay.style.visibility = "visible" ;


        for (let i = 24; i < 30; i++) {
            button[i].style.pointerEvents = "all" ;
            button[i].style.color =  "#00ffff" ;
        }

        //toggle Ans button to comma for statistical mode
        button[48].innerHTML = "," ;
        button[48].setAttribute("onclick", "AnsOrComma(0)") ;

        //Return screen from combination to input mode on click
        input.style.display = "block" ;
        n.style.display = "none" ;
        r.style.display = "none" ;

        //clear screen and set up square bracket opener for stat mode.
        clr() ;
        input.value = "[" ;

        //Deactivation function keys other than stat keys
        for (let i = 6; i < 24; i++) {
            button[i].style.pointerEvents = "none" ;
        }
         
    }
    else {
        stat.setAttribute("onclick", "statKey(1)") ;
        stat.style.color = "#ffffff" ;
        statDisplay.style.visibility = "hidden" ;

        for (let i = 24; i < 30; i++) {
            button[i].style.color =  "#ffffff";
            button[i].style.pointerEvents = "none" ;
        }
    
        button[48].innerHTML = "Ans" ;
        button[48].setAttribute("onclick", "AnsOrComma(1)") ;
        
       input.value = "" ;

       for (let i = 6; i < 24; i++) {
        button[i].style.pointerEvents = "all" ;
    }

    }
}


//switch between radian and degree for trigonometric calculations
const degree = (degPress) => {
   
    if (degPress == 1) {
        deg.style.color = "rgb(252, 73, 41)" ;

        degDisplay.style.visibility= "visible" ; 
        radDisplay.style.visibility = "hidden" ;
        rad.style.color = "#ffffff" ;

    }
    else {
        deg.style.color = "#ffffff" ;
        rad.style.color = "rgb(252, 73, 41)" ;
        radDisplay.style.visibility = "visible" ;
        degDisplay.style.visibility = "hidden" ;
    }

    acOrOff("ac") ;
}


const radian = (radPress) => {

    if (radPress == 1) {
        rad.style.color = "rgb(252, 73, 41)" ;

        radDisplay.style.visibility = "visible" ;
        degDisplay.style.visibility = "hidden" ;
        deg.style.color = "#ffffff" ;
    }
    else {
        rad.style.color = "#ffffff" ;
        deg.style.color = "rgb(252, 73, 41)" ;
        degDisplay.style.visibility = "visible" ;
        radDisplay.style.visibility = "hidden" ;
    }
}



//Function CLEAR
const clr = () => {
    display.innerHTML = "" ;
    input.value = "" ;
    workArea.innerHTML = "" ;
    degDisplay.style.visibility = "hidden" ;
    radDisplay.style.visibility = "visible" ;
    size.style.display = "none" ;
    result.style.display = "block" ; 
    input.style.display = "block" ;
    document.querySelector(".combPer").style.display = "none" ;
}


//Function ON
const on = () => {
    //enable click events on shift,stat, deg, and rad buttons
    for (let i = 0; i < button.length; i++) {
        button[i].style.pointerEvents = "all" ;
    }


    result.style.visibility = "visible" ;
    modes.style.visibility = "visible" ;
    radDisplay.style.visibility = "visible" ;
    rad.style.color = "rgb(252, 73, 41)" ;
    deg.style.color = "#ffffff"  ;
    degDisplay.style.visibility = "hidden" ;
    shiftKey(0) ;
    statKey(0) ;
    input.value = "" ;
    input.placeholder = "0" ;
    workArea.innerHTML = "" ;
    display.innerHTML = "" ;


    input.style.display = "block" ;
    n.style.display = "none" ;
    r.style.display = "none" ;
    n.value = "" ;
    r.value = "" ;

    size.style.display = "none" ;
    result.style.display = "block" ;
}



//Function INPUT KEY
const inputKey = (addInput) => {
   
   if ( statDisplay.style.visibility == "visible") {
        
        input.value += `${addInput}` ;
        workArea.innerHTML += `${addInput}`;
    }
    else {
        input.value += addInput ;
        workArea.innerHTML += addInput ;
   }
}



//Function MEAN
const mean = () => {
    //Append closing square bracket to input.value to close array
    (input.value.endsWith("]")) ? input.value += "" : input.value += "]" ;

    //hide variance and SD prompts
    hidePrompt();

    //Style stat function keys on stat key press
    button[24].style.color = "rgb(252, 73, 41)" ;
    for (let i = 25; i < 30; i++) {
        button[i].style.color =  "#00ffff" ;
    }

    //Remove square brackets
    //split string at commas to create array
    //Sum up array data and find mean
    workArea.innerHTML = `${input.value.substring(1, ((input.value.length) - 1))}` ;
    let arrayBox = workArea.innerHTML.split(",") ;
    let sum = arrayBox.map(item => parseInt(item)).reduce((acc, cur) => acc + cur) ;  
    workArea.innerHTML = `${(sum/ arrayBox.length).toFixed(2)}` ;
}



//Function MEDIAN
const median = () => {
    //Append closing square bracket to input.value to close array
    (input.value.endsWith("]")) ? input.value += "" : input.value += "]" ;

    //hide variance and SD prompts
    hidePrompt() ;

    //Style stat function keys on stat key press
    for (let i = 24; i < 30; i++) {
        button[i].style.color =  "#00ffff" ;
        if(i == 25) {
            button[25].style.color = "rgb(252, 73, 41)" ;
            continue ;
        }
    }

    //Remove square brackets
    //split string at commas to create array
    //Sort array and find median based on array length ending up as odd or even.
    workArea.innerHTML = `${input.value.substring(1, ((input.value.length) - 1))}` ;
    let arrayBox = workArea.innerHTML.split(",") ;
    let sorting = arrayBox.map(item => parseInt(item)).sort(function(a, b) {
        return a - b
    })

    if (sorting.length % 2 == 0) {
        workArea.innerHTML = (((sorting[(arrayBox.length/2) - 1]) + (sorting[arrayBox.length/2]))/2).toFixed(2) ;
    } 
    else { 
      workArea.innerHTML = (sorting[Math.ceil((arrayBox.length/2) - 1)]).toFixed(2) ;
     
    }
}



//Function MODE
const mode = () => {
      //Append closing square bracket to input.value to close array
    (input.value.endsWith("]")) ? input.value += "" : input.value += "]" ;

    //hide variance and SD prompts
    hidePrompt() ;

    //Style stat function keys on stat key press
    for (let i = 24; i < 30; i++) {
        button[i].style.color =  "#00ffff" ;
        if(i == 26) {
            button[26].style.color = "rgb(252, 73, 41)" ;
            continue ;
        }
    }

    //Remove square brackets
    //split string at commas to create array
    //Sort Array data in ascending order
    workArea.innerHTML = `${input.value.substring(1, ((input.value.length) - 1))}` ;
    let arrayBox = workArea.innerHTML.split(",") ;
    let sorting = arrayBox.map(item => parseInt(item)).sort(function(a, b) {
        return a - b
    })


    let freq = {} ; 

    for (item of sorting) {
        freq[item] ? freq[item]++ : freq[item] = 1 ;
    }

    let compare = 0 ;
    let mode ;

    for (item in freq) {
        if (freq[item] > compare) {
            compare = freq[item] ;
            mode = item
        }
        else if (freq[item] == compare){
            mode = 0 ;
        }
    }

    workArea.innerHTML = `${mode}` ;
}



//Function RANGE
const range = () => {
      //Append closing square bracket to input.value to close array
    (input.value.endsWith("]")) ? input.value += "" : input.value += "]" ;

     //hide variance and SD prompts
     hidePrompt() ;

     //Style stat function keys on stat key press
     for (let i = 24; i < 30; i++) {
         button[i].style.color =  "#00ffff" ;
         if(i == 27) {
             button[27].style.color = "rgb(252, 73, 41)" ;
             continue ;
         }
     }

     //Remove square brackets
    //split string at commas to create array
    //Sort Array data in ascending order and find range
    workArea.innerHTML = `${input.value.substring(1, ((input.value.length) - 1))}`;
    let arrayBox = workArea.innerHTML.split(",") ;
    let sorted = arrayBox.map(item => parseInt(item)).sort(function(a, b) {
        return a - b
    }) ;

    let range = Math.max(...sorted) - Math.min(...sorted) ;
    workArea.innerHTML = `${range}` ;
}


//Function HIDE PROMPT
const hidePrompt = () => {
    document.getElementById("size").style.display = "none" ;
    result.style.display = "block" ;
}


//Function VARIANCE
const variance = () => {
      //Append closing square bracket to input.value to close array
    (input.value.endsWith("]")) ? input.value += "" : input.value += "]" ;

     //Style stat function keys on stat key press
     for (let i = 24; i < 30; i++) {
         button[i].style.color =  "#00ffff" ;
         if(i == 28) {
             button[28].style.color = "rgb(252, 73, 41)" ;
             continue ;
         }
     }
   
     //prompts pops up for population size mode selection
    let size = document.getElementById("size"); 
    size.style.display = "block";
    result.style.display = "none";

    //Listen to clicks on prompt's buttons
    document.querySelector("#size").addEventListener("click", (event) =>{
        display.innerHTML = "";

         //Remove square brackets
        //split string at commas to create array
        //Sort Array data in ascending order
        workArea.innerHTML = `${input.value.substring(1, ((input.value.length) - 1))}`;
        let arrayBox = workArea.innerHTML.split(",");
        let sorted = arrayBox.map(item => parseInt(item)).sort(function(a, b) {
            return a - b
        })

        //find mean and deviation
        let average = sorted.reduce((acc, cur) => acc + cur/sorted.length , 0) //the array mean is obtained. 
        let deviation = sorted.map(num => (num -average) ** 2) //each element of the array is tsken from its mean and squared
        
        //Calculate variance based on value supplied by population mode selected
        if (event.target.id === "complete") {
            let variance = ((deviation.reduce((acc, cur) => acc + cur, 0))/(sorted.length)).toFixed(1); //the squared array is summed up and divided by number of elements. this returns variance.
            workArea.innerHTML = `${variance}`;

        }
        else if  (event.target.id === "sample") {
            let variance = ((deviation.reduce((acc, cur) => acc + cur, 0))/(sorted.length - 1)).toFixed(1); //the squared array is summed up and divided by number of elements. this returns variance.
            workArea.innerHTML = `${variance}`;
        }
        
         //hide variance and SD prompts after execution
         hidePrompt() ;

    })      
   
}


const standardDev = () => {
     //Append closing square bracket to input.value to close array
    (input.value.endsWith("]")) ? input.value += "" : input.value += "]" ;

     //Style stat function keys on stat key press
     for (let i = 24; i < 30; i++) {
        button[i].style.color =  "#00ffff" ;
        if(i == 29) {
            button[29].style.color = "rgb(252, 73, 41)" ;
            continue ;
        }
    }
  
    //prompts pops up for population size mode selection
    let size = document.getElementById("size"); 
    size.style.display = "block";
    result.style.display = "none";

    //Listen to clicks on prompt's buttons
   document.querySelector("#size").addEventListener("click", (event) =>{
        display.innerHTML = "";

         //Remove square brackets
        //split string at commas to create array
        //Sort Array data in ascending order
        workArea.innerHTML = `${input.value.substring(1, ((input.value.length) - 1))}`;
        let arrayBox = workArea.innerHTML.split(",") ;
        let sorted = arrayBox.map(item => parseInt(item)).sort(function(a, b) {
            return a - b
        }) ;
    
         //find mean and deviation
        let average = sorted.reduce((acc, cur) => acc + cur/sorted.length , 0) ;//the array mean is obtained. 
        let deviation = sorted.map(num => (num -average) ** 2) ;//each element of the array is tsaen from its mean and squared

                //Calculate SD based on value supplied by population mode selected
        if (event.target.id === "complete") {
            let variance = ((deviation.reduce((acc, cur) => acc + cur, 0))/(sorted.length)).toFixed(1) ; //the squared array is summed up and divided by number of elements. this returns variance.
            let standardDeviation =  Math.sqrt(variance).toFixed(2) ;
            workArea.innerHTML = standardDeviation ;
        }
    
        else if (event.target.id === "sample") {
            let variance = ((deviation.reduce((acc, cur) => acc + cur, 0))/(sorted.length - 1)).toFixed(1) ; //the squared array is summed up and divided by number of elements. this returns variance.
            let standardDeviation =  Math.sqrt(variance).toFixed(2) ;
            workArea.innerHTML = standardDeviation ;
        }

          //hide variance and SD prompts after execution
          hidePrompt() ;
    })

}


//Function to supply division and multiplication arithmetic operators 
const mulDiv = (mulDiv) => {
    (mulDiv == "mul") ? input.value += "*" : input.value += "/" ;
    (mulDiv == "mul") ? workArea.innerHTML += "*" : workArea.innerHTML += "/" ;
}

//Function DEL
const del = () => {
    if (input.value.slice(-3) == "Ans") {
        workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-4, -3))) ? 
        workArea.innerHTML.slice(0, -(answer.innerHTML.length + 3)) : workArea.innerHTML.slice(0, -(answer.innerHTML.length)) ;
        input.value = input.value.slice(0, -3) ;
    } 
    else if (display.value == "Error!") {
        ac();
    }
    else {
        switch (workArea.innerHTML.slice(-3)) {
            case "*-1": //reciprocal
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-3, -2))) ? 
            workArea.innerHTML.slice(0, -4) : workArea.innerHTML.slice(0, -4) ;
            input.value = input.value.slice(0, -2) ;
            break ;
            case "**2": //power2
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-2, -1))) ? 
            workArea.innerHTML.slice(0, -3) : workArea.innerHTML.slice(0, -3) ;
            input.value = input.value.slice(0, -1) ;
            break ;
            case "rt(": //sqrt
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-3, -2))) ? 
            workArea.innerHTML.slice(0, -12) : workArea.innerHTML.slice(0, -10) ;
            input.value = input.value.slice(0, -2) ;
            break ;
            case "**3": //power3
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-2, -1))) ? 
            workArea.innerHTML.slice(0, -3) : workArea.innerHTML.slice(0, -3) ;
            input.value = input.value.slice(0, -1) ;
            break ;
            case "h.E": //e
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-2, -1))) ? 
            workArea.innerHTML.slice(0, -7) : workArea.innerHTML.slice(0, -6) ;
            input.value = input.value.slice(0, -1) ;
            break ;
            case "2**": //2^
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-3, -2))) ? 
            workArea.innerHTML.slice(0, -4) : workArea.innerHTML.slice(0, -3) ;
            input.value = input.value.slice(0, -2) ;
            break ;
            case "10(": // log
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-5, -4))) ? 
            workArea.innerHTML.slice(0, -12) : workArea.innerHTML.slice(0, -11) ;
            input.value = input.value.slice(0, -4) ;
            break ;            
            case "0**": //10^
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-4, -3))) ? 
            workArea.innerHTML.slice(0, -5) : workArea.innerHTML.slice(0, -4) ;
            input.value = input.value.slice(0, -3) ;
            break ;
            case "og(": // ln
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-4, -3))) ? 
            workArea.innerHTML.slice(0, -10) : workArea.innerHTML.slice(0, -9) ;
            input.value = input.value.slice(0, -3) ;
            case "E**": //e^
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-3, -2))) ? 
            workArea.innerHTML.slice(0, -9) : workArea.innerHTML.slice(0, -8) ;
            input.value = input.value.slice(0, -2) ;
            break ;
            case "1 *": //(sin cos tan)Rad
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-5, -4))) ? 
            workArea.innerHTML.slice(0, -13) : workArea.innerHTML.slice(0, -12) ;
            input.value = input.value.slice(0, -4) ;
            break ;
            case "in(":
            case "os(":
            case "an(": // (asin acos atan)Rad
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-7, -6))) ? 
            workArea.innerHTML.slice(0, -11) : workArea.innerHTML.slice(0, -10) ;
            input.value = input.value.slice(0, -6) ;
            break ;
            case "80*": //(sin cos tan) Deg
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-5, -4))) ? 
            workArea.innerHTML.slice(0, -24) : workArea.innerHTML.slice(0, -23) ;
            input.value = input.value.slice(0, -4) ;
            break ;
            case "(1*": //(asin acos atan)  Deg
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-7, -6))) ? 
            workArea.innerHTML.slice(0, -29) : workArea.innerHTML.slice(0, -28) ;
            input.value = input.value.slice(0, -6) ;
            break ;
            case "1)*": //(-)*
            case "-1)": //(-)*
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-6, -5))) ? 
            workArea.innerHTML.slice(0, -5) : workArea.innerHTML.slice(0, -5) ;
            input.value = input.value.slice(0, -5) ;
            break ;
            case ".PI": // pi
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-2, -1))) ? 
            workArea.innerHTML.slice(0, -8) : workArea.innerHTML.slice(0, -7) ;
            input.value = input.value.slice(0, -1) ;
            break ;
            case ".01": // %
            case "(0)": // %
            workArea.innerHTML = (/[\d)IE]/.test(input.value.slice(-2, -1))) ? 
            workArea.innerHTML.slice(0, -8) : workArea.innerHTML.slice(0, -3) ;
            input.value = input.value.slice(0, -1) ;
            break ;
            default:
            workArea.innerHTML = workArea.innerHTML.slice(0, -1) ;
            input.value = input.value.slice(0, -1) ;
        }
    }
   
}




//Function AC/OFF
const acOrOff = (key) => {
    if (key == "ac") {
        
    input.value = "" ;
    workArea.innerHTML = "";
    size.style.display = "none";
    result.style.display = "block";

        if (statDisplay.style.visibility = "visible" && stat.style.color == "rgb(252, 73, 41)") {
            input.value = "[";
        }
    
    }
    else {

    //disable click events on all buttons except ON 
    for (let i = 0; i < button.length; i++) {
        button[i].style.pointerEvents = "none";

        if(i == 5) {
            button[5].style.pointerEvents = "all" ;
            continue ;
        }
    }

    result.style.visibility = "hidden";
    modes.style.visibility = "hidden";
    degDisplay.style.visibility = "hidden";
    radDisplay.style.visibility = "hidden";
    shiftDisplay.style.visibility = "hidden" ;
    statDisplay.style.visibility = "hidden" ;


    
    input.placeholder = "";

    rad.style.color = "#ffffff";
    deg.style.color = "#ffffff";
    shift.style.color = "#ffffff";
    stat.style.color = "#ffffff";

    workArea.innerHTML = "" ;
    answer.innerHTML = 0;
    input.value = "";
    display.innerHTML = "";

    size.style.display = "none";

    }
}



//Function FACTORIAL
function factorial(fact) {
    if (Number.isInteger(fact)) {
        if (fact < 2) return 1 ;
        return fact * factorial(fact - 1) ;
    }
}

//Function SQUARE ROOT
const sqrt = () => {
    input.value += "√(" ;
    workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
     `* Math.sqrt(` : `Math.sqrt(` ;
}

//Function RECIPROCAL
const reciprocal = () => {
    input.value += "\u207B\u00B9";
    workArea.innerHTML +=  `**-1` ;

}

//function POWER2
const power2 = () => {
    input.value += "\u00B2";
    workArea.innerHTML += //(/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
     `**2` ;
}

//function POWER3
const power3 = () => {
    input.value += "\u00B3";
    workArea.innerHTML += //(/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
     "**3"  ;
}

//function EULER/BASE2
const eulerOrBaseTwo = (dataIn) => {
    if (dataIn == "1") {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*e" : "e" ;
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math.E" : "Math.E" ;
    } 
    else {
        input.value +=  (/[\d)IE]/.test(input.value.slice(-1))) ? "*2^" : "2^" ;
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "* 2**" : "2**" ;
    }
}

//function LOG/BASE10
const logOrBaseTen = (dataIn) => {

    if (dataIn == 1) {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*log(" : "log(" ;
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math.log10(" : "Math.log10(" ; 
    }
    else {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*10^" : "10^" ;
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*10**" : "10**" ;
    }
}



//function LN/EXP
const lnOrExp = (dataIn) => {

    if (dataIn == 1) {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*ln(" : "ln(" ;
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math.log(" : "Math.log(" ; 
    }
    else {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*e^" : "e^" ;
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math.E**" : "Math.E**" ;
    }
}


//function SIN/ASIN
const sin = (sin) => {
    if (sin == 1 && radDisplay.style.visibility == "visible") {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*sin" + "(" : "sin" + "(" ;
    
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math." + "sin" + "(1 *" : "Math." + "sin" + "(1 *" ;
        }
    else if (sin == 1 && radDisplay.style.visibility == "hidden") {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*sin" + "(" : "sin" + "(" ;


        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math." + "sin" + "(Math.PI / 180*" : "Math." + "sin" + "(Math.PI / 180*" ;
    }
    else if (sin == 0 && degDisplay.style.visibility == "hidden"){
       input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*sin" + "\u207B\u00B9(" : "sin" + "\u207B\u00B9(" ;
     
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math.a" + "sin(" : "Math.a" + "sin("  ;
    }
    else if (sin == 0 && degDisplay.style.visibility == "visible"){
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*sin" + "\u207B\u00B9(" : "sin" + "\u207B\u00B9(" ;

        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        //" * Math.a" + "sin" + "(Math.PI / 180 * " : "Math.a" + "sin" + "(Math.PI / 180 * " ;
        "*180 / Math.PI * Math.a" + "sin" + "(1*" : "180 / Math.PI * Math.a" + "sin" + "(1*" ;
    }
}


//function COS/ACOS
const cos = (cos) => {
    if (cos == 1 && radDisplay.style.visibility == "visible") {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*cos" + "(" : "cos" + "(" ;
    
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math." + "cos" + "(1 *" : "Math." + "cos" + "(1 *" ;
        }
    else if (cos == 1 && radDisplay.style.visibility == "hidden") {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*cos" + "(" : "cos" + "(" ;


        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math." + "cos" + "(Math.PI / 180*" : "Math." + "cos" + "(Math.PI / 180*" ;
    }
    else if (cos == 0 && degDisplay.style.visibility == "hidden"){
       input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*cos" + "\u207B\u00B9(" : "cos" + "\u207B\u00B9(" ;
     
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math.a" + "cos(" : "Math.a" + "cos("  ;
    }
    else if (cos == 0 && degDisplay.style.visibility == "visible"){
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*cos" + "\u207B\u00B9(" : "cos" + "\u207B\u00B9(" ;

        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*180 / Math.PI * Math.a" + "cos" + "(1*" : "180 / Math.PI * Math.a" + "cos" + "(1*" ;
    }
}


//function TAN/ATAN
const tan = (tan) => {
    if (tan == 1 && radDisplay.style.visibility == "visible") {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*tan" + "(" : "tan" + "(" ;
    
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math." + "tan" + "(1 *" : "Math." + "tan" + "(1 *" ;
        }
    else if (tan == 1 && radDisplay.style.visibility == "hidden") {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*tan" + "(" : "tan" + "(" ;


        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math." + "tan" + "(Math.PI / 180*" : "Math." + "tan" + "(Math.PI / 180*" ;
    }
    else if (tan == 0 && degDisplay.style.visibility == "hidden"){
       input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*tan" + "\u207B\u00B9(" : "tan" + "\u207B\u00B9(" ;
     
        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*Math.a" + "tan(" : "Math.a" + "tan("  ;
    }
    else if (tan == 0 && degDisplay.style.visibility == "visible"){
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*tan" + "\u207B\u00B9(" : "tan" + "\u207B\u00B9(" ;

        workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        "*180 / Math.PI * Math.a" + "tan" + "(1*" : "180 / Math.PI * Math.a" + "tan" + "(1*" ;
    }
}


//function SIGN
const sign = () => {
    input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
    "*(-1)" :  "(-1)*" ;
    workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
    "*(-1)" :  "(-1)*" ;
 }

//function OPEN PARENTHESIS
 const opens =() => {
    input.value += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
    "*(" : "(" ;
    workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
    " *(" : "(" ;
    }


//function PI
const pi = () => {
    input.value += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? "*" + "\u03C0" : "\u03C0" ;
    workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
    "*Math.PI" : "Math.PI" ;
}

//function RANDOM
const random = () => {
        input.value = (Math.random()) ;
        workArea.innerHTML = input.value ;
}



//function COMB/PER
const combOrPer = () => {
    input.style.display = "none";
    n.style.display = "inline";
    r.style.display = "inline";
    document.querySelector(".combPer").style.display = "block";
}


//function PERCENT
const percent = () => {
    input.value += "%";
    workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
    "*0.01" :  "(0)" ;
}


//function ANS/COMMA
const AnsOrComma = (key) => {
    if (key == 1) {
    input.value += "Ans" ;
    workArea.innerHTML += (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
    " * " + answer.innerHTML : answer.innerHTML ;
    }
    else {
        input.value +=  (/[\d)IE]/.test(workArea.innerHTML.slice(-1))) ? 
        ", " :  "" ;
    }
}


//function EQUAL
const equal = () => {

    //To evaluate permutation and combination
    if((document.getElementById('n').value) != "" && (document.getElementById('r').value) != "") {
        
        const factorial1 = (n) => {
            return (n != 1) ? n * factorial(n - 1) : 1;
        };

        if(document.getElementById('n').placeholder == "nC") {
    
            const combination = (n, r) => {
                return (n == r) ? 1 : factorial1(n) / (factorial1(r) * factorial1(n - r));
            };
    
            let n = (parseFloat(document.getElementById("n").value)).toFixed(0);
            let r = (parseFloat)(document.getElementById("r").value).toFixed(0);
        
            if (n && r){
                display.innerHTML = answer.innerHTML = combination(n,r);
            }
        }
        if(document.getElementById('n').placeholder == "nP") {
            
            const permutation =(n, r) => {
                return (n == r) ? 1 : factorial1(n) / factorial1(n - r) ;
            };
            
            let n = (parseFloat(document.getElementById('n').value)).toFixed(0) ;
            let r = (parseFloat)(document.getElementById('r').value).toFixed(0) ;
            
            if (n && r){
                display.innerHTML = answer.innerHTML = permutation(n,r);
            }
        }
    }



    //To evaluate statistical functions
    if (document.querySelector("#mean").style.color =="rgb(252, 73, 41)") {
        display.innerHTML = answer.innerHTML = workArea.innerHTML;
        document.querySelector("#mean").style.color = "#00ffff";
    }


    if (document.querySelector("#median").style.color =="rgb(252, 73, 41)") {
        display.innerHTML = answer.innerHTML = workArea.innerHTML;
        document.querySelector("#median").style.color = "#00ffff";
    }

    if (document.querySelector("#mode").style.color =="rgb(252, 73, 41)") {
        display.innerHTML = answer.innerHTML = workArea.innerHTML;
        document.querySelector("#mode").style.color = "#00ffff";
    }

    if (document.querySelector("#range").style.color =="rgb(252, 73, 41)") {
        display.innerHTML = answer.innerHTML = workArea.innerHTML;
        document.querySelector("#range").style.color = "#00ffff";
    }

    if (document.querySelector("#var").style.color =="rgb(252, 73, 41)") {
        display.innerHTML = answer.innerHTML = workArea.innerHTML;
        document.querySelector("#var").style.color = "#00ffff";
    }

    if (document.querySelector("#sd").style.color =="rgb(252, 73, 41)") {
        display.innerHTML = answer.innerHTML = workArea.innerHTML ;
        document.querySelector("#sd").style.color = "#00ffff" ;
    }



    //add a closing parenthesis to every calculation
    for (let i = 0; i < input.value.split("(").length - input.value.split(")").length; i++) {
        workArea.innerHTML += ")" ;
    }

    //If input cannot be evaluated return error to screen
    if (!isFinite(input.value)) {
        display.innerHTML = "Error!" ;
    }

    //workArea evaluation with cognizance to factorial and power
    if (workArea.innerHTML != "") {
        display.innerHTML = answer.innerHTML = eval(workArea.innerHTML
        .replace(/(\d+\.?\d*)\!/g, "factorial($1)")
        .replace(/(\(?[^(]*\)?)\^(\(?.*\)?)/, "Math.pow($1, $2)")
        ) ;
    }
   
    //Display result approximated for accommodation within screen width
    if (document.getElementById('theme').href.includes('scientific') || document.getElementById('theme').href.includes('simple')) {
    if (display.innerHTML.includes("e") && ((display.innerHTML).length >= 14)) {
        display.innerHTML =  answer.innerHTML = (Number(display.innerHTML)).toExponential(7) ;
    }
    else if (display.innerHTML.includes(".") && ((display.innerHTML).length >= 14)) {
        display.innerHTML =  answer.innerHTML = (Number(display.innerHTML)).toFixed(9) ;
    }
    else if ((display.innerHTML).length >= 14) {
        display.innerHTML =  answer.innerHTML = (Number(display.innerHTML.substring(0, 13))) ;
    }
    else {
        display.innerHTML = answer.innerHTML = Number(display.innerHTML)
    }
    }
    
    //Error Display
    if (display.innerHTML === "NaN" || input.value.includes("**")  || input.value.includes("[]")) {
        display.innerHTML = "Error!";
        acOrOff("ac");
    }
}
