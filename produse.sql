DROP TYPE IF EXISTS categ_produse;
DROP TYPE IF EXISTS subcategorie_produse;
DROP TYPE IF EXISTS tip_sport;

CREATE TYPE categ_produse AS ENUM('barbati', 'femei', 'copii');
CREATE TYPE subcategorie_produse AS ENUM('îmbrăcăminte', 'încălțăminte', 'accesorii');
CREATE TYPE tip_sport AS ENUM('tenis', 'tenis de masa', 'fotbal', 'volei', 'trainning');


CREATE TABLE IF NOT EXISTS produse 
(
   id serial PRIMARY KEY,
   nume VARCHAR(50) UNIQUE NOT NULL,
   descriere TEXT,
   pret NUMERIC(8,2) NOT NULL,
   nivel_de_practicare VARCHAR(20) NULL,
--    pt j    
   tip_produs subcategorie_produse DEFAULT 'accesorii',
   greutate INT  CHECK (greutate>=0),
   categorie categ_produse DEFAULT 'barbati',
   -- vector de siruri [], int [] vector de intu-ri
   vector_culori VARCHAR[],
   rezistent_la_apa BOOLEAN NOT NULL DEFAULT FALSE,
   imagine VARCHAR(300),
   data_adaugare TIMESTAMP DEFAULT current_timestamp
);