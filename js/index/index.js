/**
 * ========================================== COMPOSANTS ====================================
 */

/** 
 * cadre contenant le lien vers l'espace de gestion de la base de données
 */
var BoxAdminBD = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile10">
					<h1><a target="_blank" href="http://administration.bigmeup.fr/genghis/genghis.php/" className="display-2">Administrer la base de données</a></h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers la page de gestion des missions
 */
var BoxMission = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile10">
					<h1><a href="missions.html" className="display-2">Missions</a></h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers la partie utilisateur de l'appli
 */
var BoxPlateformeUtilisateur = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile10">
					<h1><a href="../profil.html" className="display-2">Plateforme utilisateur</a></h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers la page de gestion des utilisateurs
 */
var BoxUtilisateur = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile10">
					<h1><a href="utilisateurs.html" className="display-2">Utilisateurs</a></h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers l'espace annonce du sharetrib
 */
var BoxAnnonce = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile10">
					<h1><a href="https://www.bigmeup.fr" className="display-2">Espaces annonces</a></h1>
				</div>
			</div>
		);
	}
});

/** 
 * cadre contenant le lien vers la page de gestion des documents
 */
var BoxDocument = React.createClass({
	render: function(){
		return (
			<div className="col-lg-4 ">
				<div className="tile tile10">
					<h1><a href="documents.html" className="display-2">Documents</a></h1>
				</div>
			</div>
		);
	}
});

/**
 * ========================================== COMPOSANT PRINCIPAL ====================================
 */
var ExampleApplication = React.createClass({

	render: function () {
		return (
			<div>
                <BoxAnnonce />
				<BoxPlateformeUtilisateur />
				<BoxAdminBD />
				<BoxDocument />
				<BoxUtilisateur />
				<BoxMission />
			</div>
		);
	}
  });

ReactDOM.render(<ExampleApplication />, document.getElementById('container'));