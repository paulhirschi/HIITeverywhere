//***
// Document ready function to pre-load audio (bell)
//***

// Bell sound to be played when countdown ends
var bell = new Audio('audio/desk_bell.mp3');

var loadAudio = function() {
  bell.play();
};

// $(document).ready(function() {

//   console.log("Page Loaded");
// });

//***
// Workout Array Variables
//***
var upperWorkouts = [
  "Pushups",
  "Wide-Arm Pushups",
  "Close-Arm Pushups",
  "Straight Arm Planks",
  "Plank to Pushup",
  "Tricep Dips",
  "Burpees",
  "Walkdown Planks",
  "Pike Pushups",
  "Dive Bomber Pushups"
];

var lowerWorkouts = [
  "Squats",
  "Jumping Squats",
  "Lunges",
  "Jumping Lunges",
  "Mtn. Climbers",
  "Jumping Jacks",
  "Flutter Kicks",
  "Wall Sit",
  "Burpees",
  "Leg Lifts"
];

var coreWorkouts = [
  "Flutter Kicks",
  "Plank",
  "Plank to Pushup",
  "Burpees",
  "Russian Twist",
  "Bicycles",
  "Alt. Heel Touchers",
  "Mtn. Climbers",
  "Leg Lifts",
  "In & Outs"
];

var fullBodyWorkouts = [
  "Flutter Kicks",
  "Plank",
  "Burpees",
  "Russian Twist",
  "Bicycles",
  "Alt. Heel Touchers",
  "Mtn. Climbers",
  "Leg Lifts",
  "In & Outs",
  "Squats",
  "Jumping Squats",
  "Lunges",
  "Jumping Lunges",
  "Jumping Jacks",
  "Wall Sit",
  "Pushups",
  "Wide-Arm Pushups",
  "Close-Arm Pushups",
  "Straight Arm Planks",
  "Plank to Pushup",
  "Tricep Dips",
  "Walkdown Planks",
  "Pike Pushups",
  "Dive Bomber Pushups"
];

// Store user selected workout variable here to be used in workout
var currentWorkout;

//***
// Workout Duration Varibles
//***
var beginnerDuration = 20;
var averageDuration = 30;
var proDuration = 40;
var insaneDuration = 60;

// Store user selected duration variable here to be used by the counter
var workoutDuration;

//***
// Flip Clock Variables and Script
//***
var $rest = $('.rest');
var workoutClock;

// Start & Stop Button Variables
var $startTime = $('.startTime');

// Function to toggle button
var toggleButton = function() {
  $startTime.toggle();
};

// Function to toggle rest message
var toggleRest = function() {
  $rest.toggle();
};

// Initially hide the rest message
$rest.hide();

// Function used in stop callback to reset the clock, toggle the button, iterate through and show next workout, and show the rest message. Also calls message when workout complete.
var i = 1;
var resetClock = function() {
  toggleButton();
  $rest.fadeIn();
  workoutClock.setTime(workoutDuration);
  if (i <= 9) {
    $('.currentWorkout').text(currentWorkout[i++]);
  } else {
    $('.currentWorkout').text("Awesome Workout!");
    $('.startTime').hide();
    $('.rest').hide();
    $('.workClock').hide();
  }
};



// Main clock object, methods, and callbacks
var workClock = function() {
  workoutClock = $('.workClock').FlipClock(workoutDuration, {
    clockFace: 'MinuteCounter',
    countdown: true,
    autoStart: false,
    callbacks: {
      stop: function() {
        setTimeout(resetClock, 1500);
        bell.play();
      },
      start: function() {
        toggleRest();
      },
    }
  });
};

//***
// This function is created to randomly shuffle an array.  I use it to shuffle the currentWorkout so the exercises appear in a random order.  It is called the Fisher-Yates (aka Knuth) Shuffle, probably named after its creators. Its super handy.
//***
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

//***
// Begin application and load bell audio. Then dynamically load next page so varaible is maintained.
//***


$('#beginApplication').click(function() {
  $('html').load('zoneSelect.html');
});


//***
// Set the currentWorkouts variable to the user choice. Then dynamically load next page so varaible is maintained.
//***
$('#upperWorkouts').click(function() {
  $('html').load('skillLevel.html');
  currentWorkout = upperWorkouts;
});

$('#lowerWorkouts').click(function() {
  $('html').load('skillLevel.html');
  currentWorkout = lowerWorkouts;
});

$('#coreWorkouts').click(function() {
  $('html').load('skillLevel.html');
  currentWorkout = coreWorkouts;
});

$('#fullBodyWorkouts').click(function() {
  $('html').load('skillLevel.html');
  currentWorkout = fullBodyWorkouts;
});

//***
// Set the workoutDuration variable to the user choice. Then dynamically load next page so varaible is maintained and call workClock() to start the workout timer and shuffle the currentWorkout randomly.
//***
$('#beginnerDuration').click(function() {
  $('html').load('workout.html', function() {
    workClock();
    shuffle(currentWorkout);
    $('.currentWorkout').append(currentWorkout[0]);
  });
  workoutDuration = beginnerDuration;
});

$('#averageDuration').click(function() {
  $('html').load('workout.html', function() {
    workClock();
    shuffle(currentWorkout);
    $('.currentWorkout').append(currentWorkout[0]);
  });
  workoutDuration = averageDuration;
});

$('#proDuration').click(function() {
  $('html').load('workout.html', function() {
    workClock();
    shuffle(currentWorkout);
    $('.currentWorkout').append(currentWorkout[0]);
  });
  workoutDuration = proDuration;
});

$('#insaneDuration').click(function() {
  $('html').load('workout.html', function() {
    workClock();
    shuffle(currentWorkout);
    $('.currentWorkout').append(currentWorkout[0]);
  });
  workoutDuration = insaneDuration;
});

// Start the workout clock, toggle the button, hide the rest message on button press
$('.startTime').click(function() {
  workoutClock.start();
  toggleButton();
  $rest.hide();
});