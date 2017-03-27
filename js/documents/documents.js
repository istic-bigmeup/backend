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
	url: "http://bigmeup.istic.univ-rennes1.fr/api/back/getDocuments.php",
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
 * ======================= Elements React =====================
 */
var Documents = React.createClass({
	tab: function(){
		var returnValue = [];
		
		for (var i = 0; i < docs.length; i++) {
			// Initializes a var for the function
			let boundClick = click.bind(this, docs[i]["_id"]["$id"]);
			
			// Adds the generated table row
			returnValue.push(
			<tr key={i}>
				<td>{docs[i]["libelle"]}</td>
				<td>{getUsrMail(docs[i]["id_user"])}</td>
				<td>{docs[i]["date_enregistrement"]}</td>
				<td>{docs[i]["verification"] == "0" ? "Non" : (docs[i]["verification"] == "-1" ? "Refusé" : "Oui")}</td>
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
				<table className="table table-striped">
					<tbody>
						<tr>
							<th>Libellé</th>
							<th>Adresse email</th>
							<th>Date d'enregistrement</th>
							<th>Vérification</th>
							<th>Action</th>
						</tr>
						
						{this.tab()}
					</tbody>
				</table>
			</div>
		);
	}
});

ReactDOM.render(<Documents />, document.getElementById("container"));