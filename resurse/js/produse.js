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
        // console.log(radioButtons);
        var radioChecked = false;
        for (var i = 0; i < radioButtons.length; i++) 
        {
            
            if (radioButtons[i].checked) 
            {
                radioChecked = true;
                break;
            }
        }
        if (!radioChecked) {
            alert("Selectați o opțiune pentru greutate!");
            return false;
        }
      
        // var impermeabilChecked = document.getElementById("chk-impermeabil").checked;
        // localStorage.setItem("chk-impermeabil", impermeabilChecked);

        // Returnează true dacă toate inputurile sunt valide
        return true;
    }


    document.getElementById("filtrare").onclick=function()
    {
        if (validateInputs()) 
        {
            let inpNume = document.getElementById("inp-nume").value.toLowerCase().trim()
            // console.log(inpNume)
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
            //rezistent-la-apa
            let inpImpermeabil = document.getElementById("chk-impermeabil").checked;
            //textarea
            let keywords = document.getElementById("textarea-descriere").value.toLowerCase().trim().split(",").map(keyword => keyword.trim());
            
            //sport selectat datalist
            let sport = document.getElementById("sel-tip-sport").value.toLowerCase().trim();

           

            for(let produs of produse)
            {
                let valNume = produs.getElementsByClassName("val-nume")[0].innerHTML.toLowerCase().trim()
                let cond1 = valNume.startsWith(inpNume)
                
                // pret_min = produs.pret[0]
                // console.log(produs.pret)
                let valGreutate = parseInt(produs.getElementsByClassName("val-greutate")[0].innerHTML);

                let cond2 = (inpGreutate=="toate" || (minGreutate <= valGreutate && valGreutate < maxGreutate)) 


                //categoria produsului
                let valCategorie = produs.getElementsByClassName("val-categorie")[0].innerHTML.toLowerCase()
                let cond3 = (inpCategorie=="toate" || inpCategorie==valCategorie)


                //pretul din fiecare produs
                let valPret = parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML)
                let cond4 = (valPret > inpPret)
                
                //rezistent-la-apa
                let valImpermeabilElement = produs.querySelector(".val-impermeabil");
                let cond5 = !inpImpermeabil || (inpImpermeabil && valImpermeabilElement && valImpermeabilElement.textContent.trim() === 'Da');

                // textarea
                let valDescriere = produs.getElementsByClassName("val-descriere")[0].innerHTML.toLowerCase();
                let cond6 = keywords.some(keyword => valDescriere.includes(keyword));

                //tip_sport
                let valSportElement = produs.querySelector(".tip_sport").textContent.toLowerCase().trim();
                let cond7 = (sport === "toate" || sport === valSportElement);
                
               

                if(cond1 && cond2 && cond3 && cond4 && cond5 && cond6 && cond7)
                {
                   
                    produs.style.display="block";
                }else
                {
                    produs.style.display="none";
                }
                
            }

            
        }
    }

        // Selectează toate butoanele de tip checkbox și radio
        // const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const radios = document.querySelectorAll('input[type="radio"]');

       
// ----------------------------------------------------------------------------------------------------





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
    
      
    // document.getElementById("chk-impermeabil").addEventListener("change", function() {
    //     document.getElementById("filtrare").click();
    // });

    
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
        document.getElementById("chk-impermeabil").checked = false;
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
        console.log(produse);
        var v_produse=Array.from(produse);
        
        v_produse.sort(function(a,b)
        {

            let pret_a=parseFloat(a.getElementsByClassName("val-pret")[0].innerHTML)
            let pret_b=parseFloat(b.getElementsByClassName("val-pret")[0].innerHTML)
           
            if(pret_a == pret_b)
            {
                let nr_culori_a = a.getElementsByClassName("val-culori")[0].innerHTML.split(', ').length;
                let nr_culori_b = b.getElementsByClassName("val-culori")[0].innerHTML.split(', ').length;
                return nr_culori_a - nr_culori_b;
            }
            return (pret_a-pret_b) * order;
        });
        // console.log(v_produse);
        
        for(let prod of v_produse)
        {
            prod.parentNode.appendChild(prod)
        }
    }
    
   
   //--------------------suma produselor-------------------
  // Ascultă evenimentul de clic pe buton
document.getElementById('calculeazaSuma').addEventListener('click', function() 
{
    var suma = 0;
    var produse = document.getElementsByClassName("produs");

    
    for (let produs of produse) {
        var stil = getComputedStyle(produs);
        if (stil.display != "none") {
            suma += parseFloat(produs.getElementsByClassName("val-pret")[0].innerHTML);
        }
    }

    
    // console.log(suma);

    
    if (!document.getElementById("par_suma"))
    {
        let p = document.createElement("p");
        p.innerHTML = `<b>${suma}</b>`;
        p.id = "par_suma";
        let container = document.getElementById("produse");
        container.insertBefore(p, container.children[0]); 

        
        setTimeout(function() {
            let par = document.getElementById("par_suma");
            if (par) {
                par.remove();
            }
        }, 2000);
    }
});


    // Paginare 
    document.querySelectorAll(".pagina").forEach(button => {
        button.addEventListener("click", function() {
            const pagina = this.getAttribute("data-pagina");
            window.location.href = `/produse?page=${pagina}&limit=12`;
        });
    });

   // ---------------------------------Etapa 6b------------------------------
    
    const produse = document.getElementsByClassName("produs");
    
    function filtreazaProduse() {
        const descriereCautata = document.getElementById('textarea-descriere').value.toLowerCase();

        for (let prod of produse) {
            const descriere = prod.querySelector('.val-descriere').innerText.toLowerCase();

            if (descriere.includes(descriereCautata)) {
                prod.style.display = 'block';
            } else {
                prod.style.display = 'none';
            }
        }
    }

    document.getElementById('submitBtn').addEventListener('click', filtreazaProduse);


  


    // bonus etapa 6 diacritice
    // cautare produs dupa nume  
    function normalizeText(text) {
        const diacriticsMap = {
            'ă': 'a', 'â': 'a', 'î': 'i', 'ș': 's', 'ţ': 't', 'ț': 't', 'Ă': 'A', 'Â': 'A', 'Î': 'I', 'Ș': 'S', 'Ţ': 'T', 'Ț': 'T'
        };
        return text.replace(/[ăâîșțĂÂÎȘȚ]/g, match => diacriticsMap[match]);
    }

    document.getElementById("inp-nume").addEventListener("input", function() {
        const searchQuery = normalizeText(this.value.toLowerCase());
        const produse = document.querySelectorAll(".produs");
    
        produse.forEach(produs => {
            const numeProdus = normalizeText(produs.querySelector(".val-nume").textContent.toLowerCase());
    
            if (numeProdus.includes(searchQuery)) {
                produs.style.display = "block";
            } else {
                produs.style.display = "none";
            }
        });
    });



    
    // Deschidere modal
    document.querySelectorAll('.open-modal-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = button.getAttribute('data-index');
            document.getElementById(`modal-${id}`).style.display = 'block';
        });
    });

    // Închidere modal
    document.querySelectorAll('.close').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = button.getAttribute('data-id');
            document.getElementById(`modal-${id}`).style.display = 'none';
        });
    });

    // Închidere modal când se dă click în afara lui
    window.onclick = (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    };

    
    
  
    // fetch('/preturi')
    // .then(response => response.json())
    // .then(data => {
    //     const { pretMinim, pretMaxim } = data;
        
    //     document.getElementById('inp-pret').setAttribute('min', pretMinim);
    //     document.getElementById('inp-pret').setAttribute('max', pretMaxim);
    //     document.getElementById('infoRange').innerText = `(${pretMinim} - ${pretMaxim})`;
    // })
    // .catch(error => console.error('Eroare:', error));

    
    
    
}
)





