(function(){

'use strict';

var dental = angular.module('dental', ['ui.router', 'ngIdle', 'tooltipInput', 'tooltipDropdown']);

dental.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('session.form.dental', {
			url: '/dental_complaint',
			templateUrl: 'views/dental_complaint.html',
			controller: 'dentalController',
			resolve: {
				$translatePartialLoader: '$translatePartialCacheLoader',
				Idle: 'Idle'
			},
			onEnter: function($translatePartialLoader, Idle) {
				$translatePartialLoader.addPart('dental');
				Idle.watch();
			},
			onExit: function($translatePartialLoader, Idle) {
				$translatePartialLoader.deletePart('dental');
				Idle.unwatch();
			}
		});
}]);

dental.controller('dentalController', ['$timeout', '$scope', '$state', function ($timeout, $scope, $state) {
	$timeout(function() {
		if ($scope.formStepCompletion.dental) {
			$scope.dentalForm.$setSubmitted();
		}
	});
	$scope.setStepActive('dental');

	$scope.dental = {
		pain: {
			maxlength: 250,
			required: true,
			trim: true,
			type: 'text',
			name: 'dentalPain',
			transRoot: 'DENTAL.PAIN.PAIN'
		},
		duration: {
			maxlength: 250,
			required: true,
			trim: true,
			type: 'text',
			name: 'dentalDuration',
			transRoot: 'DENTAL.DURATION.DURATION'
		},
		swelling: {
			required: true,
			name: 'dentalSwelling',
			transRoot: 'DENTAL.SWELLING.SWELLING',
			options: [
				{ value: 'Y', text: 'DENTAL.SWELLING.SWELLING.OPTIONS.Y' },
				{ value: 'N', text: 'DENTAL.SWELLING.SWELLING.OPTIONS.N' }
			]
		},
		severity: {
			required: true,
			type: 'text',
			pattern: /^[1-9]$|^10$/,
			name: 'dentalSeverity',
			transRoot: 'DENTAL.SEVERITY.SEVERITY'
		}
	};

	$scope.previousPage = function() {
		$state.go('^.medical');
	};

	$scope.nextPage = function() {
		$scope.dentalForm.$setSubmitted();
		if ($scope.dentalForm.$valid) {
			var dayfield = parseInt(t.formModel.patientDobDod);
	        var monthfield = parseInt(t.formModel.patientDobDom);

			if(dayfield<10 && monthfield<10)
				$scope.formModel.patientDobDob = '0'+monthfield+'/0'+dayfield+'/'+t.formModel.patientDobDoy;
			else if(dayfield<10 && monthfield>=10)
				$scope.formModel.patientDobDob = monthfield+'/0'+dayfield+'/'+t.formModel.patientDobDoy;
			else if(dayfield>=10 && monthfield<10)
				$scope.formModel.patientDobDob = '0'+monthfield+'/'+dayfield+'/'+t.formModel.patientDobDoy;
			else
				$scope.formModel.patientDobDob = monthfield+'/'+dayfield+'/'+t.formModel.patientDobDoy;
			$scope.formModel.patientAddressState = $scope.formModel.patientAddressState.value;
			$scope.setStepCompleted('dental');
			$scope.formStepCompletion.dental = true;
			$scope.submitForm().then(function(result) {
				if (result) {
					//$state.go('meteor.language');
					$state.go('^.^.voip');
					//$state.go('^.^.skip');
				}
			}).catch(function(error) {
				if(error.error === 'no-auth') {
					$state.go('config');
				} else if(error.error === 'bad-auth') {
					$state.go('config');
				} else if (error.error === 'bad-session') {
					$state.go('error');
				}
			});
		}
	};

	$rootScope.nextPageVoip = function() {
		$scope.setStepCompleted('dental');
		$scope.formStepCompletion.dental = true;
		$state.go('^.^.voip');
	};
}]);

})();
