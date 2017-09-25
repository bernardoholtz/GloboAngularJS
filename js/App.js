
var app = angular.module('globoApp', []),
commits = [],
page = 1,
pageProj = 1,
ultimo,
projetos =[],
bPesquisar = true;
app.controller('CtrlGlobo',function($scope,$http){
    
    $scope.status = "none";
	$scope.cor = "white";
	$scope.lista = "Carregando Lista de Projetos...";
	$scope.carregar = function() {
		bAvancar = true;
		var tmr = setInterval(function(){
			if (bAvancar){
				bAvancar = false;
				   $http({
					  method: 'GET',
					  url: 'https://api.github.com/users/globocom/repos?page=' + pageProj + '&per_page=100&access_token=d9a17ef979c53cb9321a1f3ae60983ca50c5880a'
				   }).then(function (data){
						  pageProj += 1;
						  bAvancar = false;
						  projetos = projetos.concat(data.data)
						  if(data.data.length ==0){
							 $scope.projetos = projetos;
							 $scope.lista = "Lista de Projetos";
							 clearInterval(tmr);
						
						  }
						  bAvancar = true;	
				   },function (error){
			
						console.log('Error: ' + error);
				   });
			}
		
		}, 400);
		   
	
		   
    
    
    
   };
   
 
	$scope.mostrarDetalhes = function(projeto,index){
			
	
		   angular.element('#' + index).addClass('sel');
		   angular.element('#' + ultimo).removeClass('sel');
           ultimo = index;		   
		   $scope.titulo="Lista de Commits";	
		   $http({
			  method: 'GET',
			  url: 'https://api.github.com/repos/globocom/' + projeto + '?&access_token=d9a17ef979c53cb9321a1f3ae60983ca50c5880a'
		   }).then(function (data){
			      $scope.proj_nome = data.data.name;			
				  $scope.proj_stars = data.data.stargazers_count;			
				  $scope.proj_forks = data.data.forks_count;			
				  
		   },function (error){
				//alert('Error: ' + error);
		   });
		   
	
		   $http({
			  method: 'GET',
			  url: 'https://api.github.com/repos/globocom/' +  projeto +'/commits?page=1&per_page=20&access_token=d9a17ef979c53cb9321a1f3ae60983ca50c5880a'
		   }).then(function (data){
			      $scope.commits = data.data;
				  commits = data.data;
				  if ($scope.commits.length >= 20) {
					  $scope.status = "block";
				  }else{
					  $scope.status = "none";
				  }
		   },function (error){
			    $scope.commits = [];
				$scope.status = "none";
				$scope.titulo="Não há Commits";	
				//alert('Error: ' + error);
		   });
		   
		   
	};
	
	$scope.mostrarMais = function(projeto){
		 page += 1;
		 $http({
			  method: 'GET',
			  url: 'https://api.github.com/repos/globocom/' +  projeto +'/commits?page=' + page +'&per_page=20&access_token=d9a17ef979c53cb9321a1f3ae60983ca50c5880a'
		   }).then(function (data){
			      $scope.commits = commits.concat(data.data);
				  if (data.data.length >= 20) {
					  $scope.status = "block";
				  }else{
					  $scope.status = "none";
				  }			
				  
		   },function (error){
				alert('Error: ' + error);
		   });
	
	};

	
    

}); 

