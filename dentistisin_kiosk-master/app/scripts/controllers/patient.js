(function(){

'use strict';

var patient = angular.module('patient', ['ui.router', 'ngIdle', 'tooltipInput', 'tooltipDropdown']);

patient.config(['$stateProvider', function ($stateProvider) {
	$stateProvider
		.state('session.form.patient', {
			url: '/patient_info',
			templateUrl: 'views/patient_info.html',
			controller: 'patientController',
			resolve: {
				$translatePartialLoader: '$translatePartialCacheLoader',
				Idle: 'Idle'
			},
			onEnter: function($translatePartialLoader, Idle) {
				$translatePartialLoader.addPart('patient');
				Idle.watch();
			},
			onExit: function($translatePartialLoader, Idle) {
				$translatePartialLoader.deletePart('patient');
				Idle.unwatch();
			}
		});
}]);

patient.controller('patientController', ['$scope', '$state', '$timeout', function ($scope, $state, $timeout) {
	$timeout(function() {
		if ($scope.formStepCompletion.patient) {
			$scope.patientForm.$setSubmitted();
		}
	});
	$scope.setStepActive('patient');

	$scope.patient = {
		name: {
			first: {
				required: true,
				maxlength: 100,
				trim: true,
				type: 'text',
				index: 1,
				name: 'patientNameFirst',
				transRoot: 'PATIENT.NAME.FIRST'
			},
			middle: {
				maxlength: 100,
				trim: true,
				type: 'text',
				index: 2,
				name: 'patientNameMiddle',
				transRoot: 'PATIENT.NAME.MIDDLE'
			},
			last: {
				required: true,
				maxlength: 100,
				trim: true,
				type: 'text',
				index: 3,
				name: 'patientNameLast',
				transRoot: 'PATIENT.NAME.LAST'
			},
			preferred: {
				maxlength: 100,
				trim: true,
				type: 'text',
				index: 4,
				name: 'patientNamePreferred',
				transRoot: 'PATIENT.NAME.PREFERRED'
			}
		},
		address: {
			one: {
				required: true,
				maxlength: 100,
				trim: true,
				type: 'text',
				index: 11,
				name: 'patientAddressOne',
				transRoot: 'PATIENT.ADDRESS.ONE'
			},
			two: {
				maxlength: 100,
				trim: true,
				type: 'text',
				index: 12,
				name: 'patientAddressTwo',
				transRoot: 'PATIENT.ADDRESS.TWO'
			},
			city: {
				required: true,
				maxlength: 100,
				trim: true,
				type: 'text',
				index: 13,
				name: 'patientAddressCity',
				transRoot: 'PATIENT.ADDRESS.CITY'
			},
			state: {
				required: true,
				trim: true,
				index: 14,
				name: 'patientAddressState',
				transRoot: 'PATIENT.ADDRESS.STATE',
				options: [
					{ value: 'AL', text: 'PATIENT.ADDRESS.STATE.OPTIONS.AL' },
					{ value: 'AK', text: 'PATIENT.ADDRESS.STATE.OPTIONS.AK' },
					{ value: 'AZ', text: 'PATIENT.ADDRESS.STATE.OPTIONS.AZ' },
					{ value: 'AR', text: 'PATIENT.ADDRESS.STATE.OPTIONS.AR' },
					{ value: 'CA', text: 'PATIENT.ADDRESS.STATE.OPTIONS.CA' },
					{ value: 'CO', text: 'PATIENT.ADDRESS.STATE.OPTIONS.CO' },
					{ value: 'CT', text: 'PATIENT.ADDRESS.STATE.OPTIONS.CT' },
					{ value: 'DC', text: 'PATIENT.ADDRESS.STATE.OPTIONS.DC' },
					{ value: 'DE', text: 'PATIENT.ADDRESS.STATE.OPTIONS.DE' },
					{ value: 'FL', text: 'PATIENT.ADDRESS.STATE.OPTIONS.FL' },
					{ value: 'GA', text: 'PATIENT.ADDRESS.STATE.OPTIONS.GA' },
					{ value: 'HI', text: 'PATIENT.ADDRESS.STATE.OPTIONS.HI' },
					{ value: 'ID', text: 'PATIENT.ADDRESS.STATE.OPTIONS.ID' },
					{ value: 'IL', text: 'PATIENT.ADDRESS.STATE.OPTIONS.IL' },
					{ value: 'IN', text: 'PATIENT.ADDRESS.STATE.OPTIONS.IN' },
					{ value: 'IA', text: 'PATIENT.ADDRESS.STATE.OPTIONS.IA' },
					{ value: 'KS', text: 'PATIENT.ADDRESS.STATE.OPTIONS.KS' },
					{ value: 'KY', text: 'PATIENT.ADDRESS.STATE.OPTIONS.KY' },
					{ value: 'LA', text: 'PATIENT.ADDRESS.STATE.OPTIONS.LA' },
					{ value: 'ME', text: 'PATIENT.ADDRESS.STATE.OPTIONS.ME' },
					{ value: 'MD', text: 'PATIENT.ADDRESS.STATE.OPTIONS.MD' },
					{ value: 'MA', text: 'PATIENT.ADDRESS.STATE.OPTIONS.MA' },
					{ value: 'MI', text: 'PATIENT.ADDRESS.STATE.OPTIONS.MI' },
					{ value: 'MN', text: 'PATIENT.ADDRESS.STATE.OPTIONS.MN' },
					{ value: 'MS', text: 'PATIENT.ADDRESS.STATE.OPTIONS.MS' },
					{ value: 'MO', text: 'PATIENT.ADDRESS.STATE.OPTIONS.MO' },
					{ value: 'MT', text: 'PATIENT.ADDRESS.STATE.OPTIONS.MT' },
					{ value: 'NE', text: 'PATIENT.ADDRESS.STATE.OPTIONS.NE' },
					{ value: 'NV', text: 'PATIENT.ADDRESS.STATE.OPTIONS.NV' },
					{ value: 'NH', text: 'PATIENT.ADDRESS.STATE.OPTIONS.NH' },
					{ value: 'NJ', text: 'PATIENT.ADDRESS.STATE.OPTIONS.NJ' },
					{ value: 'NM', text: 'PATIENT.ADDRESS.STATE.OPTIONS.NM' },
					{ value: 'NY', text: 'PATIENT.ADDRESS.STATE.OPTIONS.NY' },
					{ value: 'NC', text: 'PATIENT.ADDRESS.STATE.OPTIONS.NC' },
					{ value: 'ND', text: 'PATIENT.ADDRESS.STATE.OPTIONS.ND' },
					{ value: 'OH', text: 'PATIENT.ADDRESS.STATE.OPTIONS.OH' },
					{ value: 'OK', text: 'PATIENT.ADDRESS.STATE.OPTIONS.OK' },
					{ value: 'OR', text: 'PATIENT.ADDRESS.STATE.OPTIONS.OR' },
					{ value: 'PA', text: 'PATIENT.ADDRESS.STATE.OPTIONS.PA' },
					{ value: 'RI', text: 'PATIENT.ADDRESS.STATE.OPTIONS.RI' },
					{ value: 'SC', text: 'PATIENT.ADDRESS.STATE.OPTIONS.SC' },
					{ value: 'SD', text: 'PATIENT.ADDRESS.STATE.OPTIONS.SD' },
					{ value: 'TN', text: 'PATIENT.ADDRESS.STATE.OPTIONS.TN' },
					{ value: 'TX', text: 'PATIENT.ADDRESS.STATE.OPTIONS.TX' },
					{ value: 'UT', text: 'PATIENT.ADDRESS.STATE.OPTIONS.UT' },
					{ value: 'VT', text: 'PATIENT.ADDRESS.STATE.OPTIONS.VT' },
					{ value: 'VA', text: 'PATIENT.ADDRESS.STATE.OPTIONS.VA' },
					{ value: 'WA', text: 'PATIENT.ADDRESS.STATE.OPTIONS.WA' },
					{ value: 'WV', text: 'PATIENT.ADDRESS.STATE.OPTIONS.WV' },
					{ value: 'WI', text: 'PATIENT.ADDRESS.STATE.OPTIONS.WI' },
					{ value: 'WY', text: 'PATIENT.ADDRESS.STATE.OPTIONS.WY' }
				]
			},
			zip: {
				required: true,
				trim: true,
				type: 'text',
				pattern: /^[0-9]{5}$/,
				index: 15,
				name: 'patientAddressZip',
				transRoot: 'PATIENT.ADDRESS.ZIP'
			}
		},
		dob: {
			dob: {
				required: true,
				//type: 'date',
				type: 'text',
				trim: true,
				pattern: /^(0[1-9]|1[012])[- /.]{0,1}(0[1-9]|[12][0-9]|3[01])[- /.]{0,1}(19|20)\d\d$/,
				index: 30,
				name: 'patientDobDob',
				transRoot: 'PATIENT.DOB.DOB'
			}
		},
		sex: {
			sex: {
				required: true,
				trim: true,
				index: 40,
				name: 'patientSexSex',
				transRoot: 'PATIENT.SEX.SEX',
				options: [
					{
						value: 'M',
						text: 'PATIENT.SEX.SEX.OPTIONS.M'
					},
					{
					 	value: 'F',
						text: 'PATIENT.SEX.SEX.OPTIONS.F'
					}
				]
			}
		},
		contact: {
			email: {
				maxlength: 100,
				type: 'email',
				index: 20,
				name: 'patientContactEmail',
				transRoot: 'PATIENT.CONTACT.EMAIL'
			},
			phone: {
				maxlength: 25,
				minlength: 9,
				type: 'text',
				index: 21,
				name: 'patientContactPhone',
				transRoot: 'PATIENT.CONTACT.PHONE'
			},
		},
		insurance: {
			insurance: {
				required: true,
				trim: true,
				index: 50,
				name: 'patientInsuranceInsurance',
				transRoot: 'PATIENT.INSURANCE.INSURANCE',
				options: [
					{
						value: 'Insurance',
						text: 'PATIENT.INSURANCE.INSURANCE.OPTIONS.Insurance'
					},
					{
						value: 'Medicaid',
						text: 'PATIENT.INSURANCE.INSURANCE.OPTIONS.Medicaid'
					},
					{
						value: 'Self',
						text: 'PATIENT.INSURANCE.INSURANCE.OPTIONS.Self'
					}
				]
			}
		}
	};

	$scope.nextPage = function () {
		$scope.patientForm.$setSubmitted();
		if ($scope.patientForm.$valid) {
			$scope.setStepCompleted('patient');
			$scope.formStepCompletion.patient = true;
			$roootScope.patientAddress = $scope.patientForm.patientAddressState;
			$state.go('^.medical');
		}
	};
}]);

})();
