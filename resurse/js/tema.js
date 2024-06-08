window.addEventListener("DOMContentLoaded", function()
{
  localStorage.removeItem('optiune');
    // Aplică tema salvată în localStorage la încărcarea paginii
    // if (localStorage.getItem("tema")) 
    // {
    //     document.body.classList.add("dark");
    // } else {
    //     document.body.classList.remove("dark");
    // }

    // Adaugă evenimentul de clic pentru butonul de schimbare a temei
    document.getElementById("schimba-tema").addEventListener("click", function() 
    {
        // Verifică dacă tema întunecată este deja activată
        if (document.body.classList.contains("dark")) {
            // Dacă da, elimină clasa 'dark' și șterge tema din localStorage
            document.body.classList.remove("dark");
            //this.glyph
            localStorage.removeItem("tema");
        } else {
            // Dacă nu, adaugă clasa 'dark' și salvează tema în localStorage
            document.body.classList.add("dark");
            localStorage.setItem("tema", "dark");
        }
    });
    
    
    const themeSelect = document.getElementById('theme-select');
  
    // Verifică și aplică tema selectată din localStorage
    const optiune = localStorage.getItem('optiune');
    
    if (optiune) 
    {

      themeSelect.value = optiune;
      
      if (optiune !== 'default') 
      {
        document.body.classList.add(`${optiune}-theme`);

      }
    }
    
    themeSelect.addEventListener('change', function() 
    {
      const optiune = themeSelect.value;
      
      // Elimină toate temele
      document.body.classList.remove('light-theme', 'dark-theme', 'blue-theme', 'green-theme');
      
      if (optiune !== 'default') {
        // Adaugă tema selectată
        document.body.classList.add(`${optiune}-theme`);
      }
      
      // Salvează tema selectată în localStorage
      localStorage.setItem('optiune', optiune);
    });
    
});

