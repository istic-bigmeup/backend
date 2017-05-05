var Header = React.createClass({
	isAdmin: function(){
		// On prend les cookies
		var cookies = document.cookie.split("; ");
		var cookiesTmp = {};
		for(var i = 0; i < cookies.length; i++){
			var key 	= cookies[i].split("=")[0];
			var value 	= cookies[i].split("=")[1];
			cookiesTmp[key] = value;
		}
		cookies = cookiesTmp;
		
		return cookies["bmu_admin"] != undefined;
	},
	
	render: function () {
		// Si l'utilisateur n'est pas un admin...
		if(!this.isAdmin()){
			// ... On le redirige vers la partie frontend
			window.location.href = "http://administration.bigmeup.fr";
		}
		
		var divClass = "col-md-4 col-lg-4 col-sm-4 col-xs-4";
		
		return (
			<div className="row">
				<div className={divClass}></div>
				
				<div className={divClass}>
					<img src="img/logoBMU_800x800.png" alt="BigMeUp" style={{width: "50%"}}/>
				</div>
				
				<div className={divClass}></div>
			</div>
		);
	}
});

ReactDOM.render(<Header />, document.getElementById("header"));