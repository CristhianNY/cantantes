var app = angular.module('cantantes.services.db', []);


app.factory('db', function($q,
									 $firebaseArray,
									 $ionicScrollDelegate,
									 FIREBASE_URL,
                                     UserService) {
    var ref = new Firebase(FIREBASE_URL);
	var artistasRef = new Firebase(FIREBASE_URL + "/artistas")

	var lengthArtistas = function(){
		return artistasRef.$getIndex().length;
	}
	return {

		list:function(){
		var itemsRef = new Firebase("https://cookie7.firebaseio.com/artistas");
			
 		//alert($firebaseArray(itemsRef));
	
	console.log($firebaseArray(artistasRef));
		  return $firebaseArray(artistasRef);	


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
		}






	}
});