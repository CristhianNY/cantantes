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
	
	
		  return $firebaseArray(artistasRef);	


		},
		findArtista:function(id){

			return artistasRef.$child(id);
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