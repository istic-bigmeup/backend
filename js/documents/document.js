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
	url: "http://bigmeup.istic.univ-rennes1.fr/api/back/getDocument.php?id=" + missionId,
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
	ok &= (document.getElementById("dateEcheance").value.length > 0) || (action == "refus");
	if(!ok){
		document.getElementById("err_echeance").style.display = "block";
	} else {
		document.getElementById("err_echeance").style.display = "none";
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
																	:document.getElementById("dateEcheance").value);
		
		// On envoie la requête au serveur
		$.ajax({
			url: "http://bigmeup.istic.univ-rennes1.fr/api/back/setDocument.php",
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
			<input 	type		= "button"
					value		= "Valider"
					onClick		= {this.clic}
					className	= "btn btn-success" />
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
			<input 	type		= "button"
					value		= "Refuser"
					onClick		= {this.clic}
					className	= "btn btn-danger" />
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
				<b>Date d'échéance</b>
				<input	type		= "date"
						id			= "dateEcheance"
						placeholder = "jj/mm/aaaa"
						defaultValue= {doc["date_echeance"]}
						className	= "form-control" />
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
 * ======================= L'iframe du document ============
 */
var Image = React.createClass({
	render: function () {
		var srcImg = "http://bigmeup.istic.univ-rennes1.fr/documents/" + doc["url"];
		
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
	render: function () {
		return (
			<div>
				<h1>Statut: {doc["verification"] == "0" ? "Pas encore traitée" : doc["verification"] == "1" ? "Validée" : "Refusée"}</h1>
				<Retour />
				
				<br/><br/>
				
				<DateEcheance />
				
				<br/>
				
				<Image />
				
				<br/><br/>
				
				<Valider />
				<Refuser />
			</div>
		);
	}
});

ReactDOM.render(<Document />, document.getElementById("container"));