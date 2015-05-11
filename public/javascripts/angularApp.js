var app = angular.module('flapperNews', ['ui.router']);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){

		$stateProvider
			.state('home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'MainController'
			})
			.state('posts', {
				url: '/posts/{id}',
				templateUrl: '/posts.html',
				controller: 'PostsController'
			});
		
		$urlRouterProvider.otherwise('home');
}]);


app.factory('posts', [function(){
	var o = {
		posts: []
	};
	return o;
}])

var MainController = function($scope, posts){
	$scope.test = "It's working.";
	$scope.posts = posts.posts;

	$scope.addPost = function(){
		$scope.posts.push({
			title: $scope.title, 
			link: $scope.link,
			upvotes: 0,
			comments: [
				{author: 'Joe', body: 'Cool post bro', upvotes: 0},
				{author: 'Bob', body: 'Nah thats aweful', upvotes: 0}
			]
		});

		$scope.title = '';
		$scope.link = '';
	};

	$scope.incrementUpvotes = function(post){
		post.upvotes += 1;
	};
};

var PostsController = function($scope, $stateParams, posts){
	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function(){
		$scope.post.comments.push({
			body: $scope.body,
			author: 'user',
			upvotes: 0
		});
		$scope.body = '';
	}

	$scope.incrementUpvotes = function(comment){
		comment.upvotes += 1;
	};
};

app.controller('MainController', ['$scope', 'posts', MainController]);
app.controller('PostsController', ['$scope', '$stateParams', 'posts', PostsController ]);