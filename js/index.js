const STRING_NOTE = ['e', 'B', 'G', 'D', 'A', 'E'];
const NOTES_SHARP = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const NOTES_FLAT = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
const DEGREES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const flatSymbol = String.fromCharCode(parseInt(0x266D))
const pitches = [{'note': 'A', 'accidentals' : ['-', '#', flatSymbol]},
{'note': 'B', 'accidentals' : ['-', flatSymbol]},
{'note': 'C', 'accidentals' : ['-', '#']},
{'note': 'D', 'accidentals' : ['-', '#', flatSymbol]},
{'note': 'E', 'accidentals' : ['-', flatSymbol]},
{'note': 'F', 'accidentals' : ['-', '#']},
{'note': 'G', 'accidentals' : ['-', '#', flatSymbol]}]

const INTERVALS = [
['Perfect Unison', 'Diminished Second'],
['Minor Second', 'Augmented Unison'],
['Major Second', 'Diminished Third'],
['Minor Third', 'Augmented Second'],
['Major Third', 'Diminished Fourth'],
['Perfect Fourth', 'Augmented Third'],
['Augmented Fourth', 'Diminished Fifth'],
['Perfect Fifth', 'Diminished Sixth'],
['Minor Sixth', 'Augmented Fifth'],
['Major Sixth', 'Diminished Seventh'],
['Minor Seventh', 'Augmented Sixth'],
['Major Seventh', 'Diminished Octave'],
['Perfect Octave', 'Augmented Seventh']];

const SCALES = [
{'name' : 'Major', 'intervals' : [0, 2, 4, 5, 7, 9, 11]},
{'name' : 'Minor pentatonic', 'intervals' : [0, 3, 5, 7, 10]},
{'name' : 'Minor natural', 'intervals' : [0, 2, 3, 5, 7, 8, 10]},
{'name' : 'Minor melodic', 'intervals' : [0, 2, 3, 5, 7, 9, 11]},
{'name' : 'Minor harmonic', 'intervals' : [0, 2, 3, 5, 7, 8, 11]}];

const fretWidths = [{'num' : 1, 'width' : 8.666},
{'num' : 2, 'width' : 8.184},
{'num' : 3, 'width' : 7.726},
{'num' : 4, 'width' : 7.294},
{'num' : 5, 'width' : 6.886},
{'num' : 6, 'width' : 6.491},
{'num' : 7, 'width' : 6.138},
{'num' : 8, 'width' : 5.795},
{'num' : 9, 'width' : 5.471},
{'num' : 10, 'width' : 5.166},
{'num' : 11, 'width' : 4.876},
{'num' : 12, 'width' : 4.604},
{'num' : 13, 'width' : 4.347},
{'num' : 14, 'width' : 4.104},
{'num' : 15, 'width' : 3.875},
{'num' : 16, 'width' : 3.659},
{'num' : 17, 'width' : 3.455},
{'num' : 18, 'width' : 3.263}]




// Namespace application
var application = {};

$(document).ready(function() {
    application.init();
});

application.init = function() {
    createHandle();
    noteMenu();
    scaleMenu();
    updateAccidentalMenu('A');
}

var calculateFretWidth = (fretNum, isIndex) => {
    var totalSize = $('#guitar-handle').width();
    
    if (isIndex){
        return fretWidths[fretNum].width;
    }
    else {
        console.log('ERROR. Please give an index to calculateFretWidth()');
    }
};

//Generate guitar handle
var createHandle = () => {
    // create localisation marks
    for (var i = 1; i <= fretWidths.length; i++){
        var loc = $('<div>')
        .addClass('location')
        .width(calculateFretWidth(i-1, true) + '%')
        .appendTo('#localisation');
    }

    var markedFrets = [3, 5, 7, 9, 12, 15, 17];
    
    markedFrets.forEach((item) => {
        mark(item);
    });
    
    // create frets
    for (var i = 0; i <= fretWidths.length; i++){
        var fret = $('<div>')
            .addClass('fret')
            .attr('data-fret-num', i);
        if (i == 0){
            fret.addClass('open-string');
        }
        else {
            fret.width(calculateFretWidth(i-1, true) + '%');
        }
        // create strings
        for (var j = 0; j < 6; j++){
            var guitarString = $('<div>')
                .addClass('string')
                .attr('data-string-note', STRING_NOTE[j])
                .width('100%');
            if (i == 0){
                guitarString.width('0')
            }
            guitarString.appendTo(fret);

            PlaceNote(guitarString, i);
        }

        fret.appendTo('#guitar-handle');
    }
}

// place dot in marked frets
var mark = (loc) => {
    if(loc == 12){
        var container = $('<div>')
            .addClass('location-12th-container');
        for(var i = 0; i < 2; i++){
            var dot = $('<div>')
                .addClass('location-dot')
                .addClass('location-dot-12th');
                container.append(dot);
        }
        container.appendTo($('.location').eq(loc-1));
    } else {
        var dot = $('<div>')
            .addClass('location-dot')
            .appendTo($('.location').eq(loc-1));
    }
};

// generate note position on strings with note name as data-attribute
var PlaceNote = (guitarString, fretNum) => {
    
    var sharp = getNote(guitarString.attr('data-string-note'), fretNum).sharp;
    var flat = getNote(guitarString.attr('data-string-note'), fretNum).flat;

    var note = $('<div>')
        .addClass('note')
        .attr('data-note-sharp', sharp)
        .attr('data-note-flat', flat)

    if (fretNum == 0){note.addClass('open-string');}

    generateNotesCaption(note, sharp);

    note.appendTo(guitarString);
};

// evaluate note from string and fret
var getNote = (stringName, fretNum) => {
    var stringName = stringName.toUpperCase();
    var sharp = NOTES_SHARP[(NOTES_SHARP.indexOf(stringName) + fretNum) % 12];
    var flat = NOTES_FLAT[(NOTES_FLAT.indexOf(stringName) + fretNum) % 12];
    return {'sharp' : sharp, 'flat': flat};
};

//generate note caption
var generateNotesCaption = (note, dataNote) => {
    note.html('');
    var caption = $('<p>')
        .text(dataNote)
        .appendTo(note);
};


// toggle sharps <=> flats
var displayMode = 'sharp';

var switchDisplay = (accidental) => {
    var notes = $('.note');

    if (accidental == 'sharp'){
        notes.each(function (index, note) {
            generateNotesCaption($(this), $(this).attr('data-note-flat'));
        });
        displayMode = 'flat';
    } else if (accidental == 'flat'){
        notes.each(function (index, note) {
            generateNotesCaption($(this), $(this).attr('data-note-sharp'));
        });
        displayMode = 'sharp';
    }
};


// generate pitch menu
var noteMenu = () => {
    for (var i = 0; i < pitches.length; i++){
        var option = $('<option>')
            .attr('value', pitches[i].note)
            .text(pitches[i].note);
        $('#pitches').append(option);
    }
};

//remove impossible accidentals according to note
var updateAccidentalMenu = () => {
    $('#pitches').change(() => {
        $('#accidentals').html('');
        var selectedPitch = $('#pitches option:selected').val();
        var n = 0;
        while (pitches[n].note != selectedPitch){n++;}

        var allowedAccidentals = pitches[n].accidentals;
        
        for (var i = 0; i < allowedAccidentals.length; i++){
            var option = $('<option>')
                .text(allowedAccidentals[i]);
            if (allowedAccidentals[i] == flatSymbol){
                option.val('b');
            } else if (allowedAccidentals[i] == '-') {
                option.val('');
            } else {
                option.val(allowedAccidentals[i]);
            }
            option.appendTo($('#accidentals'));
        }
    });
};



// Populate scale menu
var scaleMenu = () => {
    for (var i = 0; i < SCALES.length; i++){
        var option = $('<option>')
            .attr('value', SCALES[i].name)
            .text(SCALES[i].name);
        $('#scales').append(option);
    }
};

// set the distance of a note relative to the fundamental
var setRelativeNotes = (fundamental) => {    
    var fundamental = NOTES_SHARP.indexOf(fundamental);
    $('.note').each(function () {
        var distance = Math.abs(NOTES_SHARP.indexOf($(this).attr('data-note-sharp')) - fundamental + 12) % 12;
        // console.log($(this).attr('data-note-sharp'), distance)
        $(this).attr('data-fundamental-distance', distance);
    });
};

// go function
var generateScale = function() {
    var selectedNote = $('#pitches option:selected').val() + $('#accidentals option:selected').val();
    var selectedScale = $('#scales option:selected').val();
    $('.note').removeClass('fundamental');
    
    // console.log(selectedNote)

    var scaleNote = '';
    
    //display fundamental note
    $('.note').each(function(item){
        if ($(this).attr('data-note-sharp') === selectedNote || $(this).attr('data-note-flat') === selectedNote){
            scaleNote = $(this).attr('data-note-sharp');
            $(this).addClass('fundamental');
        }
    });

    setRelativeNotes(scaleNote);
    hideOutOfScaleNotes(scaleNote, selectedScale);
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var hideOutOfScaleNotes = (pitch, scale) => {
    //get intervals
    var n = 0;
    while (SCALES[n].name != scale){
        n++;
    }
    var intervals = SCALES[n].intervals;
    
    //get relative notes in the scale
    var shownNotes = [0];
    // var temp = 0;
    for (var i = 0; i < intervals.length; i++){
        shownNotes.push(intervals[i]);
        // temp += intervals[i];
    }

    //hide unnecessary notes
    $('.note').each(function () {
        
        // console.log($(this).attr('data-note-sharp'), $(this).attr('data-fundamental-distance'))
        if (shownNotes.indexOf(parseInt($(this).attr('data-fundamental-distance'))) == -1){
            $(this).addClass('hidden');
        }
        else {
            $(this).removeClass('hidden');
        }
    });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// var colors = ['#f80c12', '#ee1100', '#ff3311', '#ff4422', '#ff6644', '#ff9933', '#feae2d', '#ccbb33', '#d0c310', '#aacc22', '#69d025', '#22ccaa', '#12bdb9', '#11aabb', '#4444dd', '#3311bb', '#3b0cbd', '#442299'];
// var colors = ['#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
// var colorTest = () => {
//     for(var i = 0; i < colors.length; i++){
//         var div = $('<div>')
//             .addClass('test-colors')
//             .css('background-color', colors[i])
//             .appendTo($('#test'));

//     }
// };

// colorTest();