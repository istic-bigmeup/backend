/**
 * ======================= Variables =========================
 */
var usr 		= [];

/**
 * ========================= Traitement ======================
 */
// Demande de toutes les usr
$.ajax({
	url: "http://bigmeup.istic.univ-rennes1.fr/api/front/getUsers.php",
	async: false
}).done(function(data){// When done
	// Parses the data from a JSON to an array
	usr = JSON.parse(data);
});

/**
 * ============================ Fonctions =================
 */
/**
 * Permet de faire une action lors du clic sur le bouton [Consulter]
 */
var click = function(usrId){	
	// On met la date de fin
	var date = new Date();
	date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));
	// On met le cookie
	document.cookie 	= "bmu_adm_usr_id=" + usrId + "; expires=" + date + "; path=/";
	// On redirige
	window.location = "http://bigmeup.istic.univ-rennes1.fr/frontend/profil.html";
}

/**
 * ======================= Elements React =====================
 */
var Utilisateurs = React.createClass({
	tab: function(){
		var returnValue = [];
		
		for (var i = 0; i < usr.length; i++) {
			// Initializes a var for the function
			let boundClick = click.bind(this, usr[i]["_id"]["$id"]);
			
			// Adds the generated table row
			returnValue.push(
			<tr key={i}>
				<td>{usr[i]["nom"]}</td>
				<td>{usr[i]["prenom"]}</td>
				<td>{usr[i]["email"]}</td>
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
							<th>Nom</th>
							<th>Prénom</th>
							<th>Adresse email</th>
							<th>Action</th>
						</tr>
						
						{this.tab()}
					</tbody>
				</table>
			</div>
		);
	}
});

ReactDOM.render(<Utilisateurs />, document.getElementById("container"));