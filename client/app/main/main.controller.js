'use strict';

angular.module('medicationReminderApp')
	.filter('formatTime', function() {
		return function(input, twentyFour) {
			input = input || '';
			var output = moment(input).format('LT');
	
			// Conditional for a 24 hour clock
			if (twentyFour) {
				output = moment(input).format('HH:mm');
			}

			return output;
		}
	})
	.filter('getDate', function() {
		return function(input) {
			input = input || "";
			var output = moment.utc(input).format('MMMM Do');

			return output
		}
	})
	.controller('MainCtrl', function ($scope, $http, $window) {
		// initialize calendar
	    $(document).ready(function() {
	        $('#calendar').fullCalendar({
	        	titleFormat: '[' + ']',
	        	header: {
	        		 center: 'today prev,next',
	        		 right: ""
	        	}
	        })
	    });

	    var start = moment().format('MM/DD/YYYY'),
	        end = moment().add(1, 'day').format('MM/DD/YYYY');

	    $http.get('/api/medications?start=' + start + '&end=' + end).then(function (meds) {
	        $scope.meds = meds.data;

	        // initialize the missed medications
	        setMissedMeds($scope.meds);
	    });

	    // initialize the time to prevent lag
	    $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
	    $window.setInterval(function () {
	        $scope.currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
	        $scope.$apply();
	        checkMedTimeWindow($scope.meds);
	    }, 1000);

	    // check if the medication is past the current time and create property
	    var setMissedMeds = function(meds) {
	        for (var i=0; i<meds.length; i++) {
	        	var currentTime = moment();
	        	// 5 minute grace period before med is considered missed
	        	var medTime = moment(meds[i].time).add(5, 'minutes');
	        	
	        	if (currentTime.isBefore(medTime)) {
	        		meds[i].missed = false;
	        	} else {
	        		meds[i].missed = true;
	        	}
	        }
	    }

	    // check if within the 5 minute range for when the user needs to take the medication
	    var checkMedTimeWindow = function(meds) {
	    	for (var i=0; i<meds.length; i++) {
	    		var deltaTime = moment.duration("00:05:00");
	    		var medTimeBegin = moment(meds[i].time).subtract(5, 'minutes');
	    		var medTimeEnd = moment(meds[i].time).add(5, 'minutes');

	    		if (moment().isBetween(medTimeBegin, medTimeEnd)){
	    			meds[i].openTimeWindow = true;

	    			// change notification sound after 5 minutes
	    			if (!meds[i].completed && !meds[i].missed && moment(meds[i].time).isBefore(moment())) {
	    				var notification = angular.element(document.getElementById(''+meds[i]._id));
	    				notification.attr('src', notification.attr('data-second-src'));
	    			}
	    		} else {
	    			meds[i].openTimeWindow = false;
	    		}
	    	}
	    }

	    // create toggle between completion and undo
	    $scope.setMedToComplete = function() {
	    	this.m.completed = !this.m.completed;
	    	this.m.buttonContent = (this.m.buttonContent == "Undo" ? "Complete" : "Undo");
	    	// this is where you would insert the completion status into mongodb
	    }	

	    // Retrieve the remaining time and display it on the inactive button for the future meds
	    $scope.getRemainingTime = function() {
	    	var now = moment(new Date); //todays date
			var end = moment(this.m.time); // another date
			var duration = moment.duration(now.diff(end));
			var diff = duration.humanize();
			return diff + " left"
	    }
	    
	    // Preset format to 12 hours and create toggle to display 24 hours
	    $scope.twentyFour = false;
	    $scope.toggleFormat = function() {
	    	$scope.twentyFour = ($scope.twentyFour == true ? false : true);
	    	return 
	    }

	});
