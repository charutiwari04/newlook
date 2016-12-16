angular
	.module('templeApp', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		$urlRouterProvider.otherwise('/');
		$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl as main'
		})
		.state('events', {
			url: '/events',
			templateUrl: 'views/events.html',
			controller: 'EventsCtrl as event'
		})
		.state('booking', {
			url: '/booking',
			templateUrl: 'views/booking.html',
			controller: 'BookCtrl as book'
		})
		.state('sponsor', {
			url: '/sponsor',
			templateUrl: 'views/sponsor.html',
			controller: 'SponsorCtrl as sponsor'
		})
		.state('youth', {
			url: '/youth',
			templateUrl: 'views/youth.html',
			controller: 'YouthCtrl as youth'
		})
		.state('calendar', {
			url: '/calendar',
			templateUrl: 'views/calendar.html',
			controller: 'CalendarCtrl as calendar'
		})
		.state('photos', {
			url: '/photos',
			templateUrl: 'views/photos.html',
			controller: 'PhotosCtrl as photos'
		})
		.state('contact', {
			url: '/contact',
			templateUrl: 'views/contact.html',
			controller: 'ContactCtrl as contact'
		});
  }]);
  