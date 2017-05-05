/**
 * ======================= Variables =========================
 */
var docs 	= [];
var usr 	= [];

/**
 * ========================= Traitement ======================
 */
// Demande de toutes les docs
$.ajax({
	url: "http://administration.bigmeup.fr/api/back/getDocuments.php",
	async: false
}).done(function(data){// When done
	// Parses the data from a JSON to an array
	data = JSON.parse(data);
	// Controls the answer of the API
	docs 	= JSON.parse(data["documents"]);
	usr 	= JSON.parse(data["users"]);
	
	// Sorts the users to have a dictionnary : {MongoId => mail}
	var tabUsr_tmp = {};
	for(var i = 0; i < usr.length; i++){
		tabUsr_tmp[usr[i]["_id"]["$id"]] = usr[i]["email"];
	}
	usr = tabUsr_tmp;
});

/**
 * =========================== Fonctions ===================
 */
/**
 * Permet d'avoir le mail lié à l'id @usrId
 */
var getUsrMail = function(usrId){
	return usr[usrId];
};

/**
 * Permet de savoir quoi faire quand on clique sur [Consulter]
 */
var click = function(docId){
	document.location = "document.html#" + docId;
};

/**
 * Format date
 * @param	d	La date YYYY-MM-DD à formater en DD-MM-YYYY
 */
var formatDate = function(d){
	var s = d.split("-");
	return d.length > 0 ? s[2] + "-" + s[1] + "-" + s[0] : "";
}

/**
 * ======================= Elements React =====================
 */
var Documents = React.createClass({
	getLibelle: function(libelle){
		switch(libelle){
			case "cotSoc":
				return "Cotisations sociales";
			
			case "cotFisc":
				return "Cotisations fiscales";
			
			case "kbis":
				return "Kbis";
			
			default:
				return "--";
		}
	},
	
	getEtat: function(etat){
		switch(etat){
			case "0":
				return "À traiter";
			
			case "1":
				return "Validé";
			
			case "2":
				return "Refusé";
			
			case "4":
				return "Annulé";
			
			default:
				return "--";
		}
	},
	
	tab: function(){
		var returnValue = [];
		
		for (var i = 0; i < docs.length; i++) {
			// Initializes a var for the function
			let boundClick = click.bind(this, docs[i]["_id"]["$id"]);
			
			// Adds the generated table row
			returnValue.push(
			<tr key={i}>
				<td>{this.getLibelle(docs[i]["libelle"])}</td>
				<td>{getUsrMail(docs[i]["id_user"])}</td>
				<td>{formatDate(docs[i]["date_upload"])}</td>
				<td>{formatDate(docs[i]["date_enregistrement"])}</td>
				<td>{this.getEtat(docs[i]["verification"])}</td>
				<td><input 	type="button" 
							className="btn btn-default" 
							onClick={boundClick}
							value="Consulter"/></td>
			</tr>);
		}
		
		// Return the table rows
		return returnValue;
	},
	
	render: function () {
		return (
			<div>
				<table id="tab" className="table table-striped">
					<thead>
						<tr>
							<th>Libellé</th>
							<th>Adresse email</th>
							<th>Date d'ajout</th>
							<th>Date de vérification</th>
							<th>Vérification</th>
							<th>Action</th>
						</tr>
					</thead>
					
					<tbody>						
						{this.tab()}
					</tbody>
					
					<tfoot>
						<tr>
							<th>Libellé</th>
							<th>Adresse email</th>
							<th>Date d'ajout</th>
							<th>Date de vérification</th>
							<th>Vérification</th>
							<th>Action</th>
						</tr>
					</tfoot>
					
				</table>
			</div>
		);
	}
});

ReactDOM.render(<Documents />, document.getElementById("container"));

/**
 * ==========================
 * ======= DATATABLE ========
 * ==========================
 */
/**
 * Contrôle de la date
 */
jQuery.extend( jQuery.fn.dataTableExt.oSort, {
	"date-fr-pre": function ( a ) {
		var ukDatea = a.split('-');
		return (ukDatea[2] + ukDatea[1] + ukDatea[0]) * 1;
	},

	"date-fr-asc": function ( a, b ) {
		return ((a < b) ? -1 : ((a > b) ? 1 : 0));
	},

	"date-fr-desc": function ( a, b ) {
		return ((a < b) ? 1 : ((a > b) ? -1 : 0));
	}
} );

/*
 * Affichage du tableau
 */
$(document).ready(function() {
	$('#tab').DataTable({
		"language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/French.json"
        },
		"aoColumns": [
            null,
            null,
            { "sType": "date-fr" },
            { "sType": "date-fr" },
            null,
			null
        ]
	});
});