// Place dot in marked frets
var fretsMark = (loc) => {
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
    return 1;
};

// Generate menu
var populateMenu = (optionList, element) => {
    for (var i in optionList){
        var option = $('<option>')
            .attr('value', i)
            .text(i);
        $(element).append(option);
    }
    return 1;
};

// Remove impossible accidentals according to note
var updateAccidentalMenu = () => {
    $('#notes').change(() => {
        $('#accidentals').html('');
        var selectedNote = $('#notes option:selected').val();

        var allowedAccidentals = ACCIDENTALS[selectedNote];
        
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
    return 1;
};

// Update notes caption
var updateCaption = (noteElement, noteName) => {
    // if (noteName.indexOf('b') != -1){
    //     noteName = noteName[0] + flatSymbol;
    // }
    noteElement.html('');
    var caption = $('<p>')
        .text(noteName)
        .appendTo(noteElement);
    return 1;
};

var resetNoteColor = () => {
    $('.note').css('background-color', '#002642');
};

var changeNoteColor = function (distance, color) {
    var notes = $('.note')

    $('.note').each(function(item){
        if ($(this).attr('data-distance') == distance){
            $(this).css('background-color', color);
        }
    });
    return 1;
};