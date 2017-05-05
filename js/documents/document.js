/**
 * ======================= Variables =========================
 */
var doc = [];

/**
 * ========================= Traitement ======================
 */
// Demande du doc
var missionId = window.location.href.split("#");
missionId = missionId[1];

$.ajax({
	url: "http://administration.bigmeup.fr/api/back/getDocument.php?id=" + missionId,
	async: false
}).done(function(data){// When done
	// Parses the data from a JSON to an array
	doc = JSON.parse(data);
	doc = doc[0];
});

/**
 * =========================== Fonctions ===================
 */
/**
 * S'exécute quand on clique sur un des boutons
 */
var clicBouton = function(action){
	var ok = true;
	// On contrôle si la date est bien mise
	switch(action){
		case "refus":
			ok &= (document.getElementById("raisonRefus").value.length > 0);
			if(!ok){
				document.getElementById("err_refus").style.display = "block";
			} else {
				document.getElementById("err_refus").style.display = "none";
			}
		break;
		
		case "valider":
			ok &= (document.getElementById("dateEcheance").value.length > 0);
			if(!ok){
				document.getElementById("err_echeance").style.display = "block";
			} else {
				document.getElementById("err_echeance").style.display = "none";
			}
		break;
	}
	
	// Si tous les champs du formulaire sont remplis
	if(ok){
		// Déclaration des données à envoyer
		var datas 	 = action + "=" + missionId;
		
		// On prend la date d'aujourd'hui
		var dte = new Date();
		var y = dte.getFullYear();
		var m = dte.getMonth() + 1;
		var d = dte.getDate();
		var today = y + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
		
		datas 		+= "&date_echeance=" +  (action == "refus" ? 	today
																	: document.getElementById("dateEcheance").value);
		
		datas 		+= "&raison_refus="  +	(action == "refus" ?	document.getElementById("raisonRefus").value
																	: "");
		
		// On envoie la requête au serveur
		$.ajax({
			url: "http://administration.bigmeup.fr/api/back/setDocument.php",
			type: "POST",
			data: datas
		}).done(function(data){// When done
			// Parses the data from a JSON to an array
			data = JSON.parse(data);
			
			if(data["answer"] == "true"){
				window.location = "documents.html";
			} else {
				alert("Problème dans l'ajout de la mission");
			}
		});
	}
};

/**
 * ======================= Elements React =====================
 */
/**
 * ======================= Le bouton de retour ============
 */
var Retour = React.createClass({
	clic: function (){
		window.location = "documents.html";
	},
	
	render: function () {
		return (
			<input 	type		= "button"
					value		= "Retour"
					onClick		= {this.clic}
					className	= "btn btn-default" />
		);
	}
});

/**
 * ======================= Le bouton de validation ============
 */
var Valider = React.createClass({
	clic: function (){
		clicBouton("valider");
	},
	
	render: function () {
		return (
			<span className="input-group-btn">
				<input 	type		= "button"
						value		= "Valider"
						onClick		= {this.clic}
						className	= "btn btn-success" />
			</span>
		);
	}
});

/**
 * ======================= Le bouton de refus ============
 */
var Refuser = React.createClass({
	clic: function (){
		clicBouton("refus");
	},
	
	render: function () {
		return (
			<span className="input-group-btn">
				<input 	type		= "button"
						value		= "Refuser"
						onClick		= {this.clic}
						className	= "btn btn-danger" />
			</span>
		);
	}
});

/**
 * ======================= Le champ de la date d'échéance ============
 */
var DateEcheance = React.createClass({
	render: function () {
		return (
			<div>
				<input	type		= "date"
						id			= "dateEcheance"
						placeholder = "jj/mm/aaaa"
						defaultValue= {doc["date_echeance"]}
						className	= "form-control datepicker" />
				<p 	id="err_echeance" 
					className="text-warning"
					style={{display: "none"}}>
					Veuillez indiquer la date d'échéance
				</p>
			</div>
		);
	}
});

/**
 * ======================= Le champ de la raison du refus ============
 */
var RaisonRefus = React.createClass({
	render: function () {
		return (
			<div>
				<input	type		= "text"
						id			= "raisonRefus"
						placeholder = "Raison du refus"
						defaultValue= {doc["raison_refus"]}
						className	= "form-control" />
				<p 	id="err_refus" 
					className="text-warning"
					style={{display: "none"}}>
					Veuillez indiquer la raison de refus
				</p>
			</div>
		);
	}
});

/**
 * ======================= L'iframe du document ============
 */
var Image = React.createClass({
	render: function () {
		var srcImg = "http://administration.bigmeup.fr/documents/" + doc["url"];
		
		return (
			<div>
				<b>Document</b>
				<iframe	src={srcImg}
						style={{width:"100%", height:"500px"}}>
				</iframe>
			</div>
		);
	}
});

/**
 * ====================== L'affichage du document ===================
 */
var Document = React.createClass({
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
	
	render: function () {
		return (
			<div>
				<h1>{this.getLibelle(doc["libelle"])}: {this.getEtat(doc["verification"])}</h1>
				<Retour />
				
				<br/><br/>
				
				<Image />
				
				<br/><br/>
				
				<b>Date d'échéance</b>
				<div className="input-group">
					<DateEcheance />
					<Valider />
				</div>
				
				<br/>
				
				<b>Raison du refus</b>
				<div className="input-group">
					<RaisonRefus />
					<Refuser />
				</div>
				
				<br/><br/>
			</div>
		);
	}
});

ReactDOM.render(<Document />, document.getElementById("container"));

/**
 * Pour avoir le datepicker
 */
$(function () {
	$('.datepicker').datepicker({
		altField: "#datepicker",
		closeText: 'Fermer',
		prevText: 'Précédent',
		nextText: 'Suivant',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
		monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
		dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
		dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
		dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		weekHeader: 'Sem.',
		dateFormat: 'yy-mm-dd'
	});
});