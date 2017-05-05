/**
 * ======================= Variables =========================
 */
var usr 		= [];

/**
 * ========================= Traitement ======================
 */
// Demande de toutes les usr
$.ajax({
	url: "http://administration.bigmeup.fr/api/front/getUsers.php",
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
	window.location = "http://administration.bigmeup.fr/profil.html";
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
				<table id="tab" className="table table-striped">
					<thead>
						<tr>
							<th>Nom</th>
							<th>Prénom</th>
							<th>Adresse email</th>
							<th>Action</th>
						</tr>
					</thead>
				
					<tbody>
						{this.tab()}
					</tbody>
					
					<tfoot>
						<tr>
							<th>Nom</th>
							<th>Prénom</th>
							<th>Adresse email</th>
							<th>Action</th>
						</tr>
					</tfoot>
				</table>
			</div>
		);
	}
});

ReactDOM.render(<Utilisateurs />, document.getElementById("container"));

$(document).ready(function() {
	$('#tab').DataTable({
		"language": {
            "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/French.json"
        }
	});
});