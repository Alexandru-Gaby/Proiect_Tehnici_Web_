window.addEventListener ("load", function(){

    document.getElementById("inp-pret").onchange = function()
    {
        document.getElementById("infoRange").innerHTML = `(${this.value})`
    }

    
    document.getElementById("filtrare").onclick = function(){
    var inpNume = document.getElementById("inp-nume").value.toLowerCase().trim()
    
    

    var radioCalorii=document.getElementsByName("gr_rad")
    let inpCalorii;

    for(let rad of radioCalorii){
        if(rad.checked)
        {
            inpCalorii=rad.value;
           break;     
        }
    }
    let minCalorii,maxCalorii
    
    if(inpCalorii != "toate")
    {
        vCal = inpCalorii.split(":")
        minCalorii = parseint(vcal[0])
        maxCalorii = parseint(vcal[1])
    }
    
     var inpPret = parseInt(document.getElementById(inp-pret).value)

     var inpCateg= document.getElementById("inp-categorie").value.toLowerCase().trim()

    var produse = document.getElementsByClassName("produs")
    for(let produs of produse)
    {
        
        let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim()

        let cond1 = valNume.startsWith(inpNume)

        //  let valCalorii = parseInt(produs.getElementsByClassName)

        let cond2 = true;
        let cond3 = (valPret > inpPret)

        var valCategorie= produs.getElementsByClassName("val-categorie")[0].innerHTML.toLowerCase()

        if(cond1 && cond2 && cond3)
        {
            produs.style.display="block";
        }
        else{
            produs.style.display = "none";

        }
    }
}
    }

)