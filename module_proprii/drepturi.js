
/**
 @typedef Drepturi
 @type {Object}
 @property {Symbol} vizualizareUtilizatori Dreptul de a intra pe  pagina cu tabelul de utilizatori.
 @property {Symbol} stergereUtilizatori Dreptul de a sterge un utilizator
 @property {Symbol} cumparareProduse Dreptul de a cumpara
 @property {Symbol} vizualizareGrafice Dreptul de a vizualiza graficele de vanzari
 
 @property {Symbol} modificareProduse Dreptul de a modifica detaliile produselor.
 @property {Symbol} stergereProduse Dreptul de a șterge produse.
 @property {Symbol} vizualizareComenzi Dreptul de a vizualiza comenzile.
 */

 


/**
 * @name module.exports.Drepturi
 * @type Drepturi
 */
const Drepturi = {
	vizualizareUtilizatori: Symbol("vizualizareUtilizatori"),
	stergereUtilizatori: Symbol("stergereUtilizatori"),
	cumparareProduse: Symbol("cumparareProduse"),
	vizualizareGrafice: Symbol("vizualizareGrafice"),
	vizualizareComenzi: Symbol("vizualizareComenzi"),
	modificareProduse: Symbol("modificareProduse"),
	stergereProduse: Symbol("stergereProduse")
}

module.exports=Drepturi;
//require

// termeni si conditii
// cookie-uri