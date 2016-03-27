var app = angular.module('cantantes.services.db', []);


app.factory('db', function($q,
									 $firebaseArray,
									 $ionicScrollDelegate,
									 FIREBASE_URL,
                                     UserService) {
    //var ref = new Firebase(FIREBASE_URL);
	var artistasRef = new Firebase(FIREBASE_URL + "/artistas")



	var lengthArtistas = function(){
		return artistasRef.$getIndex().length;
	}
	return {

		list:function(pais, departamento,genero){

		
			var ids =[];
		 var deferred = $q.defer();

	var ref = new Firebase("https://cookie7.firebaseio.com/artistas");



ref.orderByChild("categoria").equalTo(genero+departamento+pais).on("child_added", function(snapshot) {
	ids.push(snapshot.key());
	

	//console.log(ids);
  //console.log(snapshot.key());

  var id = snapshot.key();

console.log(id);



	
	//guardar en un array los id y mandarlos como promesa
		 
   deferred.resolve(ids);
},function(error){



	 deferred.reject(error);
});

if(ids.length >0){

}else{
	 deferred.reject(ids);
}

   return deferred.promise;
		 


		},
		findArtista:function(id){

			/*var query = new Firebase('https://cookie7.firebaseio.com/artistas/'+id).once('value', function(snap) {
  			console.log('datposs', snap.val());
  			})
			var resultado = JSON.stringify(query);
			return $firebaseArray(resultado);*/
			
				var itemsRef = new Firebase("https://cookie7.firebaseio.com/artistas");

				var query = itemsRef.orderByChild("idUser").equalTo(id);

				console.log($firebaseArray(query));
			return $firebaseArray(query);
		},

		saveArtista:function(artista){

			if(typeof artista.id =="undefined"){
				var index = lengthArtistas();
				artista.id = index+1;
				artistasRef.add(artista);
			}else{


				artistasRef.$update(artista);
			}
		},
		deleteArtista:function(id){

			artistasRef.$remove(id);
		},
		getComentarios: function(id){

				var itemsRef = new Firebase("https://cookie7.firebaseio.com/comentarios"+id+"/");

			return $firebaseArray(itemsRef);
		},
		agregarComentarios:function(comentario){

			artistasRef.$add({"comentario":comentario});

		},
		guardarUsuario:function(id,nombre,email,imagenPerfil,token){


		},
		editarComentario:function(id){


		},

		deleteComentario:function(id){

		},

		getUser:function(id){
			var itemsRef = new Firebase("https://cookie7.firebaseio.com/user/"+id+"/");

			return itemsRef;

		},
		getLikes:function(id){
		/*var ref = new Firebase("https://cookie7.firebaseio.com/likes"+id+"/");

				console.log("https://cookie7.firebaseio.com/likes/"+id+"/");

				return ref;*/
            var itemsRef = new Firebase("https://cookie7.firebaseio.com/likes"+id+"/");

			return itemsRef;

		},
		getIds:function(){
		var itemsRef = new Firebase("https://cookie7.firebaseio.com/ids/-KBQmIt5SUBwftMnmr4t/id");

		return $firebaseArray(itemsRef);
		},
		getFotoDePerfil:function(id){

				//var itemsRef = new Firebase("https://cookie7.firebaseio.com/users/10153449494886715/");

				//var query = itemsRef.orderByChild("userId").equalTo("10153449494886715");


				var ref = new Firebase("https://cookie7.firebaseio.com/user/"+id);

				

				return ref;


		}






	}
});