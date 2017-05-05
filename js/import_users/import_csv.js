/**
 * ========================================== COMPOSANTS ====================================
 */

/** 
 * Message de type alert indiquant le succès de l'opération
 */
var AlertBoxSuccess = React.createClass({
    render: function(){
        return (
            <div className={"alert alert-success alert-dismissible " + this.props.visibility} id="alertBoxSucces" role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Succès !</strong> Les utilisateurs ont bien été enregistrés.
            </div>            
        )
    }
});

/** 
 * Message de type alert indiquant le l'échec de l'opération
 */
var AlertBoxError = React.createClass({
    render: function(){
        return (
            <div className={"alert alert-danger alert-dismissible " + this.props.visibility} id="alertBoxError" role="alert">
                <button type="submit" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>Attention !</strong> Modification non effectuée. Veuillez reéssayer ou contacter l'administrateur.
            </div>            
        )
    }
});

/**
 * ========================================== COMPOSANT PRINCIPAL ====================================
 */

var Uploader = React.createClass({
    getInitialState : function() {
        return{
            alertSuccess : {
                visibility: "hide"
            },
            alertError : {
                visibility: "hide"
            }
        }
    },

    //Soumet le fichier et affiche par la suite le message adéquat
    uploadFile: function (e) {
        var fd = new FormData(); 
        fd.append('file', this.refs.file.files[0]);

        var that = this; //afin de pouvoir l'utiliser dans une fonction particulière

        $.ajax({
            url: 'http://administration.bigmeup.fr/api/back/importCSV.php',
            data: fd,
            processData: false,
            contentType: false,
            type: 'POST',
            success: function(data){
				// Parses the data from a JSON to an array
				data = JSON.parse(data);

				if(data["answer"] == "true"){
                    //affiche le message de succès
                    that.setState({
                        alertSuccess : {
                            visibility: "show"
                        }
                    });
                }
                else{
                    //affiche message d'erreur
                    that.setState({
                        alertError : {
                            visibility: "show"
                        }
                    });
                }             
            },
            error: function(error, status){
                //affiche message d'erreur
                that.setState({
                    alertError : {
                        visibility: "show"
                    }
                });
            } 
        });
        e.preventDefault()
    },

    //Affiche le nom du fichier chargé
    showFileName: function(e){
        var myFile = $('#file').prop('files')[0];
        $("#fileLabel").text(myFile.name);
        $("#btnSubmit").removeClass("hide");
    },

    render: function () {
        return (
            <div>
                <AlertBoxError visibility={this.state.alertError.visibility} />
                <AlertBoxSuccess visibility={this.state.alertSuccess.visibility} />
                <form encType="multipart/form-data" role="form" onSubmit={this.uploadFile} >
                    <label id="fileLabel" className="btn btn-default btn-file" htmlFor="file">
                        Parcourir... <input type="file" ref="file" id="file" style={{ display: "none" }} onChange={this.showFileName} />
                    </label>
                    <input type="button" id="btnSubmit" className="btn btn-info hide" value="Charger" onClick={this.uploadFile} />
                </form>
            </div>
        );
    }
});

ReactDOM.render(<Uploader />, document.getElementById("container"));