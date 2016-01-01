var app = angular.module('cantantes.services.creador', []);

app.service("Creador", function (    $stateParams,
									 $q,
									 $firebaseArray,
									 $ionicScrollDelegate,
									 FIREBASE_URL,
                                     UserService
								) {

	
	var self = {
		'page': 0,
		'page_size': 20,
		'isLoading': false,
		'isSaving': false,
		'hasMore': true,
		'results': [],
		'refresh': function () {
			self.page = 0;
			self.isLoading = false;
			self.isSaving = false;
			self.hasMore = true;
			self.results = [];
			return self.load();
		},
		'next': function () {
			self.page += 1;
			return self.load();
		},
		'load': function () {
			self.isLoading = true;
			var d = $q.defer();

			var Grupo = Parse.Object.extend("Grupo");
			var mealQuery = new Parse.Query(Grupo);
			mealQuery.descending('created');
			//mealQuery.equalTo("owner",AuthService.user);
			mealQuery.skip(self.page * self.page_size);
			mealQuery.limit(self.page_size);

			mealQuery.find({

				success : function (results){
					angular.forEach(results,function (item){
						var grupo = new Grupo(item);
						self.results.push(grupo)

					});
					console.debug(self.results);

					if(results.lenght == 0){
						self.hasMore = false;
					}
					d.resolve();
				}
			});
			return d.promise;
		},
		'crear': function (data) {
				var datos = {
		Artistas: [],
		Artista: '',
		loading: true,
		showInfo: false
	};
			self.isSaving = true;
			var d = $q.defer();
			alert(datos.Artista)
			if(datos.Artista){
			datos.artistas.$add({
				showId : "true",
				text : "alguna vaina",
				username: "algun texto username",
				userId: "id",
				profilePic :"foto",
				timestamp : new Date().getTime()

			});
		    datos.artista = '';
			$ionicScrollDelegate.$getByHandle('showpage').scrollBottom(true);
		}else{

			alert("aeeerro");
		}


	

		
			return d.promise;
		}

	};

	return self;
});