var app = angular.module('cantantes.services.creador', []);

app.service("Creador", function ($q,$ionicPopup ) {
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
			self.isSaving = true;
			var d = $q.defer();

		//var Grupo = Parse.Object.extend("Grupo");
		//var user = AuthService.user;
		//var file = data.picture ? new Parse.File("photo.jpg",{base64:data.picture}) : null;
		//var	grupo = new Grupo();
	//	meal.set("owner",user);
		//meal.set("picture",file);
		//alert(data.nombre);
		//alert(data.telefono);
		//alert(data.whatsapp);
		//alert(data.email);
		//alert(data.url);
		//alert(data.categoria);
		//alert(data.descripcion);
		//grupo.set("nombre",data.nombre);
		//grupo.set("telefono",data.telefono);
		//grupo.set("whatsapp",data.whatsapp);
		//grupo.set("email",data.email);
		//grupo.set("url",data.url);
		//grupo.set("categoria",data.categoria);
		//grupo.set("descripcion",data.descripcion);
		//grupo.set("created",new Date());

		grupo.save(null,{

			success:function (grupo){
				console.log("Grupo creado");
				self.results.unshift(grupo);
				d.resolve(grupo);

			},error : function(item, error){
				$ionicPopup.alert(
				{
					title:"Error saving ",
					subtitle:error.message
				});
				d.reject(error);

			}
		});
			return d.promise;
		}

	};

	return self;
});