var Navbar = React.createClass({
	disconnect: function(){
		var date = new Date();
		date.setTime(date.getTime() - (1*24*60*60*1000));

		// Sets the cookie
		document.cookie = "bmu_connecte=true; expires=" + date + "; path=/";
		document.cookie = "bmu_user_id=0; expires=" + date + "; path=/";
		document.cookie = "bmu_admin=0; expires=" + date + "; path=/";

		// Redirects to profil.html
		document.location = "index.html";
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
					<a className="navbar-brand" href="index.html">BigMeUp</a>
					<ul className="nav navbar-nav">
						<li><a href="https://www.bigmeup.fr">Aller au ShareTribe</a></li>
						<li><a href="../frontend">Aller au frontend</a></li>
						<li><a href="http://bigmeup.istic.univ-rennes1.fr/genghis/genghis.php/" target="_blank">Administrer la base de données</a></li>
						
						{connecte ? <li><a href="documents.html">Documents</a></li> 				: ""}
						{connecte ? <li><a href="utilisateurs.html">Utilisateurs</a></li> 			: ""}
						{connecte ? <li><a href="missions.html">Missions</a></li> 					: ""}
						{connecte ? <li><a href="#" onClick={this.disconnect}>Déconnexion</a></li> 	: ""}
					</ul>
				</div>
			</nav>
		);
	}
});

ReactDOM.render(<Navbar />, document.getElementById("navbar"));