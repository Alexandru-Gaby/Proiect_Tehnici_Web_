// function formatData(data) {
//     const options = { day: 'numeric', weekday: 'long', month: 'long', year: 'numeric' };
//     const date = new Date(data);
//     return date.toLocaleDateString('ro-RO', options);
// }
{/* <td><time datetime="<%- prod.data_adaugare %>"><%- formatData(prod.data_adaugare) %></time></td> */}



window.addEventListener("load", function()
{
    function validateInputs() 
    {
        // Verifică inputul de tip text
        var inputValue = document.getElementById("inp-nume").value.trim();
        if (inputValue.length > 0 && !/^[a-zA-Z\s]*$/.test(inputValue)) {
            alert("Numele produsului trebuie să conțină doar litere și spații!");
            return false;
        }
    
        // Verifică inputul de tip radio
        var radioButtons = document.querySelectorAll('input[name="gr_rad"]');
        var radioChecked = false;
        for (var i = 0; i < radioButtons.length-1; i++) {
            if (radioButtons[i].checked) {
                radioChecked = true;
                break;
            }
        }
        if (!radioChecked) {
            alert("Selectați o opțiune pentru greutate!");
            return false;
        }

    
        // Returnează true dacă toate inputurile sunt valide
        return true;
    }


    document.getElementById("filtrare").onclick=function()
    {
        if (validateInputs()) 
        {
            let inpNume = document.getElementById("inp-nume").value.toLowerCase().trim()
            // valNume = document.getElementsByClassName("val-nume")
            

            let vRadio = document.getElementsByName("gr_rad");
            // console.log(vRadio);
            
            let inpGreutate;

            for(let rad of vRadio)
            { 
                if (rad.checked) 
                {
                    inpGreutate=rad.value;
                    break;
                }
            }
            let minGreutate,maxGreutate
            if(inpGreutate!="toate")
            {
                let aux = inpGreutate.split(":")
                minGreutate=parseInt(aux[0])
                maxGreutate=parseInt(aux[1])
            }

        
            let inpPret = parseInt(document.getElementById("inp-pret").value);


            let inpCategorie = document.getElementById("inp-categorie").value.toLowerCase().trim()

            

            let produse = document.getElementsByClassName("produs")
            for(let produs of produse)
            {
                let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim()
                let cond1 = valNume.startsWith(inpNume)
                
                
                let valGreutate = parseInt(produs.getElementsByClassName("val-greutate")[0].innerHTML);
                // console.log(valGreutate);
                let cond2 = (inpGreutate=="toate" || (minGreutate <= valGreutate && valGreutate < maxGreutate)) 


                //categoria produsului
                let valCategorie = produs.getElementsByClassName("val-categorie")[0].innerHTML.toLowerCase()
                let cond4 = (inpCategorie=="toate" || inpCategorie==valCategorie)


                //pretul din fiecare produs
                let valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML)
                let cond3 = (valPret > inpPret)

                if(cond1 && cond2 && cond3 && cond4)
                {
                    produs.style.display="block";
                }else
                {
                    produs.style.display="none";
                }
            }
        }
    }
// ----------------------------------------------------------------------------------------------------
        const textareaCuvinteCheie = document.getElementById('textarea-descriere');

        textareaCuvinteCheie.addEventListener('input', function() 
        {
            const inputValue = textareaCuvinteCheie.value.trim();
            const invalidFeedback = document.querySelector('#textarea-descriere + .invalid-feedback');

            // Verifică dacă inputul este valid și setează corespunzător clasele CSS
            if (inputValue === ''){
                textareaCuvinteCheie.classList.add('is-invalid');
                invalidFeedback.style.display = 'block';
                } else {
                textareaCuvinteCheie.classList.remove('is-invalid');
                invalidFeedback.style.display = 'none';
                }
        });

        // Selectează toate butoanele de tip checkbox și radio
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const radios = document.querySelectorAll('input[type="radio"]');

        // Adaugă evenimente pentru fiecare buton pentru a modifica stilurile când sunt selectate/deselectate
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
            } else {
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline-primary');
            }
            });
        });

        radios.forEach(radio => {
            radio.addEventListener('change', function() {
            if (this.checked) {
                this.classList.remove('btn-outline-primary');
                this.classList.add('btn-primary');
            } else {
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline-primary');
            }
            });
        });
// ----------------------------------------------------------------------------------------------------
    // let iduriProduse=localStorage.getItem("cos_virtual");
    // iduriProduse=iduriProduse?iduriProduse.split(","):[];      //["3","1","10","4","2"]

    // for(let idp of iduriProduse)
    // {
    //     let ch = document.querySelector(`[value='${idp}'].select-cos`);
    //     if(ch)
    //     {
    //         ch.checked=true;
    //     }
    //     else{
    //         console.log("id cos virtual inexistent:", idp);
    //     }
    // }





    // ----------- adaugare date in cosul virtual (din localStorage)
    let checkboxuri= document.getElementsByClassName("select-cos");
    for(let ch of checkboxuri)
    {
        ch.onchange=function()
        {
            let iduriProduse=localStorage.getItem("cos_virtual");
            iduriProduse=iduriProduse?iduriProduse.split(","):[];

            if( this.checked)
            {
                iduriProduse.push(this.value)
            }
            else
            {
                let poz= iduriProduse.indexOf(this.value);
                if(poz != -1)
                {
                    iduriProduse.slice(poz,1);
                }
            }

            localStorage.setItem("cos_virtual", iduriProduse.join(","))
        }
        
    }
    
    
    
    document.getElementById("inp-pret").onchange = function()
    {
        document.getElementById("infoRange").innerHTML = `(${this.value})`
    }
    //range release
    
    //document.getElementById("buton-filtrare").addEventListener("click",function() {})
    
//-------------------------resetare------------------------
    document.getElementById("resetare").onclick= function()
    {
        const confirmare= confirm("Sigur doriti sa resetati filtrele?");
                
        document.getElementById("inp-nume").value="";
        document.getElementById("inp-pret").value=document.getElementById("inp-pret").min;
        document.getElementById("inp-categorie").value="toate";
        document.getElementById("i_rad4").checked=true;
        var produse=document.getElementsByClassName("produs");
        document.getElementById("infoRange").innerHTML="(0)";
        for (let prod of produse)
        {
            prod.style.display="block";
        }
    }
    

    // ----------------------------sortare---------------------------
    this.document.getElementById("sortCrescNume").onclick=function()
    {
        sortProducts(1);
    }

    this.document.getElementById("sortDescrescNume").onclick=function()
    {
        sortProducts(-1);
    }

    // document.getElementById("sortCrescNume").onclick=function()
    function sortProducts(order)
    {
        var produse = document.getElementsByClassName("produs");
        var v_produse=Array.from(produse)
        
        v_produse.sort(function(a,b)
        {

            let pret_a=parseInt(a.getElementsByClassName("val-pret")[0].innerHTML)
            let pret_b=parseInt(b.getElementsByClassName("val-pret")[0].innerHTML)
           
            if(pret_a == pret_b)
            {
                let nr_culori_a = a.getElementsByClassName("val-culori")[0].innerHTML.split(', ').length;
                let nr_culori_b = b.getElementsByClassName("val-culori")[0].innerHTML.split(', ').length;
                return nr_culori_a - nr_culori_b;
            }
            return (pret_a-pret_b) * order;
        });
        console.log(v_produse)
        for(let prod of v_produse)
        {
            prod.parentNode.appendChild(prod)
        }
    }
    
    
    
    // buton la click
   //--------------------suma produselor-------------------
    window.onkeydown=function(e)
    {
        if (e.key=="c" && e.altKey)
        {
            var suma=0;
            var produse=document.getElementsByClassName("produs");
            for (let produs of produse)
            {
                var stil=getComputedStyle(produs)
                if (stil.display!="none")
                {
                    suma+=parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML)
                }
            }
            console.log(suma);
            
            if(!document.getElementById("par_suma"))
            {
                let p=document.createElement("p")
                p.innerHTML=`<b>${suma}</b>`;
                p.id="par_suma"
                let container=document.getElementById("produse")
                container.insertBefore(p,container.children[0])
                // inserez paragraful inaintea primului fiu din container
                setTimeout(function()
                {
                    let par = document.getElementById("par_suma");
                    if(par)
                        par.remove();
                },2000)
            }
        }

    }
    
}
)


