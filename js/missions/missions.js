/**
 * ======================= Variables =========================
 */
var missions 	= [];
var usr 		= [];

/**
 * ======================= Fonctions =========================
 */
/**
 * Permet de prendre le mail de l'utilisateur avec l'id @ID
 */
var getUsrMail = function(id){
	return usr[id] != undefined ? usr[id] : "--";
};

/**
 * Permet de dire ce qu'on fait au clic
 */
var click = function(idMission){
	var date = new Date();
	date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000));

	// Sets the cookies
	document.cookie = "bmu_mission_id=" + idMission + "; expires=" + date + "; path=/";
	document.cookie = "bmu_vient_admin=true; expires=" + date + "; path=/";

	// Redirects to profil.html
	document.location = "../frontend/creationMission.html";
};

/**
 * ========================= Traitement ======================
 */
// Demande de toutes les missions
$.ajax({
	url: "http://bigmeup.istic.univ-rennes1.fr/api/back/getMissions.php",
	async: false
}).done(function(data){// When done
	// Parses the data from a JSON to an array
	data = JSON.parse(data);

	// Controls the answer of the API
	missions 	= JSON.parse(data["missions"]);
	usr 		= JSON.parse(data["users"]);
	
	// Sorts the users to have a dictionnary : {MongoId => mail}
	var tabUsr_tmp = {};
	for(var i = 0; i < usr.length; i++){
		tabUsr_tmp[usr[i]["_id"]["$id"]] = usr[i]["email"];
	}
	usr = tabUsr_tmp;
});

var Missions = React.createClass({
	tab: function(){
		var returnValue = [];
		
		for (var i = 0; i < missions.length; i++) {
			// Initializes a var for the function
			let boundClick = click.bind(this, missions[i]["_id"]["$id"]);
			
			// Adds the generated table row
			returnValue.push(
			<tr key={i}>
				<td>{getUsrMail(missions[i]["id_prestataire"])}</td>
				<td>{getUsrMail(missions[i]["id_client"])}</td>
				<td>{missions[i]["objet"]}</td>
				<td>{missions[i]["status"]}</td>
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
							<th>Prestataire</th>
							<th>Client</th>
							<th>Objet</th>
							<th>Etat</th>
							<th>Action</th>
						</tr>
						
						{this.tab()}
					</tbody>
				</table>
			</div>
		);
	}
});

ReactDOM.render(<Missions />, document.getElementById("container"));