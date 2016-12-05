(function(){

'use strict';

var medical = angular.module('medical', ['ui.router', 'ngIdle', 'tooltipCheckbox', 'tooltipInput']);

medical.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('session.form.medical', {
			url: '/medical_info',
			templateUrl: 'views/medical_info.html',
			controller: 'medicalController',
			resolve: {
				$translatePartialLoader: '$translatePartialCacheLoader',
				Idle: 'Idle'
			},
			onEnter: function($translatePartialLoader, Idle) {
				$translatePartialLoader.addPart('medical');
				Idle.watch();
			},
			onExit: function($translatePartialLoader, Idle) {
				$translatePartialLoader.deletePart('medical');
				Idle.unwatch();
			}
		});
}]);

medical.controller('medicalController', ['$timeout', '$scope', '$state', function ($timeout, $scope, $state) {
	$timeout(function() {
		if ($scope.formStepCompletion.medical) {
			$scope.medicalForm.$setSubmitted();
		}
	});
	$scope.setStepActive('medical');

	$scope.medical = {
		conditions: {
			hivAids: {
				name: 'medicalConitionsHivAids',
				//index: 1,
				transRoot: 'MEDICAL.CONDITIONS.HIV_AIDS'
			},
			pregnant: {
				name: 'medicalConditionsPregnant',
				//index: 2,
				transRoot: 'MEDICAL.CONDITIONS.PREGNANT'
			},
			contraceptives: {
				name: 'medicalConditionsContraceptives',
				//index: 3,
				transRoot: 'MEDICAL.CONDITIONS.CONTRACEPTIVES'
			},
			cancer: {
				name: 'medicalConditionsCancer',
				//index: 4,
				transRoot: 'MEDICAL.CONDITIONS.CANCER'
			},
			diabetes: {
				name: 'medicalConditionsDiabetes',
				//index: 5,
				transRoot: 'MEDICAL.CONDITIONS.DIABETES'
			},
			heart: {
				name: 'medicalConditionsHeart',
				//index: 6,
				transRoot: 'MEDICAL.CONDITIONS.HEART'
			},
			blood: {
				name: 'medicalConditionsBlood',
				//index: 7,
				transRoot: 'MEDICAL.CONDITIONS.BLOOD'
			},
			kidneyLiver: {
				name: 'medicalConditionsKidneyLiver',
				//index: 8,
				transRoot: 'MEDICAL.CONDITIONS.KIDNEY_LIVER'
			},
			stomach: {
				name: 'medicalConditionsStomach',
				//index: 9,
				transRoot: 'MEDICAL.CONDITIONS.STOMACH'
			},
			bleeding: {
				name: 'medicalConditionsBleeding',
				//index: 10,
				transRoot: 'MEDICAL.CONDITIONS.BLEEDING'
			},
			psychiatric: {
				name: 'medicalConditionsPsychiatric',
				//index: 11,
				transRoot: 'MEDICAL.CONDITIONS.PSYCHIATRIC'
			},
			radiation: {
				name: 'medicalConditionsRadiation',
				//index: 12,
				transRoot: 'MEDICAL.CONDITIONS.RADIATION'
			}
		},
		medications: {
			maxlength: 1000,
			trim: true,
			type: 'text',
			name: 'medicalMedications',
			//index: 20,
			transRoot: 'MEDICAL.MEDICATIONS.MEDICATIONS'
		},
		allergies: {
			aspirin: {
				name: 'medicalAllergiesAspirin',
				//index: 21,
				transRoot: 'MEDICAL.ALLERGIES.ASPIRIN'
			},
			codeine: {
				name: 'medicalAllergiesCodeine',
				//index: 22,
				transRoot: 'MEDICAL.ALLERGIES.CODEINE'
			},
			penicillin: {
				name: 'medicalAllergiesPenicillin',
				//index: 23,
				transRoot: 'MEDICAL.ALLERGIES.PENICILLIN'
			},
			sulfa: {
				name: 'medicalAllergiesSulfa',
				//index: 24,
				transRoot: 'MEDICAL.ALLERGIES.SULFA'
			},
			other: {
				maxlength: 1000,
				trim: true,
				type: 'text',
				name: 'medicalAllergiesOther',
				//index: 25,
				transRoot: 'MEDICAL.ALLERGIES.OTHER'
			}
		}
	};

	$scope.nextPage = function() {
		$scope.medicalForm.$setSubmitted();
		if ($scope.medicalForm.$valid) {
			$scope.setStepCompleted('medical');
			$scope.formStepCompletion.medical = true;
			$state.go('^.dental');
		}
	};

	$scope.previousPage = function() {
		$state.go('^.patient');
	};
}]);

})();
