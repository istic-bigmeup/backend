// On prend les cookies
var cookies = document.cookie.split("; ");
var cookiesTmp = {};
for(var i = 0; i < cookies.length; i++){
	var key 	= cookies[i].split("=")[0];
	var value 	= cookies[i].split("=")[1];
	cookiesTmp[key] = value;
}
cookies = cookiesTmp;

var Menu = React.createClass({
	disconnect: function(){
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));

		// Sets the cookie
		document.cookie = "bmu_connecte=true; expires=" + date + "; path=/";
		document.cookie = "bmu_user_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin=0; expires=" + date + "; path=/";

		// Redirects to profil.html
		document.location = "../index.html";
	},
	render: function () {
		var cookiesTmp = document.cookie.split("; ");
		var cookies = [];
		for(var i = 0; i < cookiesTmp.length; i++){
			var key 	= cookiesTmp[i].split("=")[0];
			var value 	= cookiesTmp[i].split("=")[1];
			cookies[key] = value;
		}
		var connecte = false || (cookies["bmu_connecte"] != undefined ? (cookies["bmu_admin"] == "true") : false);
		
		return (
			<nav className="navbar navbar-default">
				<div className="navbar-collapse">
					<ul className="nav navbar-nav">
						<li><a href="index.html">Accueil</a></li>
						<li><a href="https://www.bigmeup.fr" target="_blank">Espace annonces</a></li>
						<li><a href="..">Plateforme utilisateur</a></li>
						<li><a href="http://administration.bigmeup.fr/genghis/genghis.php/" target="_blank">Administrer la base de données</a></li>
						
						{connecte ? <li><a href="documents.html">Documents</a></li> 					: ""}
						{connecte ? <li><a href="utilisateurs.html">Utilisateurs</a></li> 				: ""}
						{connecte ? <li><a href="missions.html">Missions</a></li> 						: ""}
						{connecte ? <li><a href="import_users.html">Importer des utilisateurs</a></li>	: ""}
						{connecte ? <li><a href="#" onClick={this.disconnect}>Déconnexion</a></li> 		: ""}
					</ul>
				</div>
			</nav>
		);
	}
});

var Message = React.createClass({
	getClassName: function(){
		var res = "alert alert-";
		
		switch(cookies["type_message_navbar"]){
			case "success":
				res += "success";
			break;
				
			case "info":
				res += "info";
			break;
			
			case "warning":
				res += "warning";
			break;
			
			case "danger":
				res += "danger";
			break;
		}
		
		res += " alert-dismissable fade in";
		return res;
	},
	
	getTitle: function(){
		var tmp = cookies["type_message_navbar"];
		
		// On vide le cookie
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));
		document.cookie = "type_message_navbar=true; expires=" + date + "; path=/";
		
		switch(tmp){
			case "success":
				return "Succès: ";
				
			case "info":
				return "Information: ";
			
			case "warning":
				return "Attention: ";
			
			case "danger":
				return "Erreur: ";
		}
	},
	
	getText: function(){
		var tmp = cookies["texte_message_navbar"];
		
		// On vide le cookie
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));
		document.cookie = "texte_message_navbar=true; expires=" + date + "; path=/";
		
		return tmp;
	},
	
	render: function () {
		var bool = (cookies["type_message_navbar"] != undefined) && (cookies["texte_message_navbar"] != undefined);
		
		if(bool){
			return (
						<div className={this.getClassName()}>
							<a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
							<strong>{this.getTitle()}</strong> {this.getText()}
						</div>
					);
		} else {
			return (<div></div>);
		}
	}
});

var Navbar = React.createClass({
	disconnect: function(){
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));

		// Sets the cookie
		document.cookie = "bmu_connecte=true; expires=" + date + "; path=/";
		document.cookie = "bmu_user_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin=0; expires=" + date + "; path=/";

		// Redirects to profil.html
		document.location = "../index.html";
	},
	render: function () {
		var cookiesTmp = document.cookie.split("; ");
		var cookies = [];
		for(var i = 0; i < cookiesTmp.length; i++){
			var key 	= cookiesTmp[i].split("=")[0];
			var value 	= cookiesTmp[i].split("=")[1];
			cookies[key] = value;
		}
		var connecte = false || (cookies["bmu_connecte"] != undefined ? (cookies["bmu_admin"] == "true") : false);
		
		return (
			<div>
				<Menu />
				<Message />
			</div>
		);
	}
});

ReactDOM.render(<Navbar />, document.getElementById("navbar"));