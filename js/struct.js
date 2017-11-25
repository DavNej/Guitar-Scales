function Board(frets, strings) {
    // Initialization
    if (strings) {
        this.height = strings.length;
        this.stringShift = strings.map(x => SHARPS.indexOf(x)).reverse();
    } else {
        // Default => 6 strings guitar with standard tuning
        this.height = 6;
        this.stringShift = [7, 2, 10, 5, 0, 7];
    }
    this.displayMode = 'sharp';
    this.markedFrets = [3, 5, 7, 9, 12, 15, 17];
    this.numberOfFrets = frets;
    this.display = [];
    this.initialMatrix = [];
    this.notesMatrix = [];

    // Generate a new matrix of this.height x this.numOfFrets
    this.generate = function () {
        for (var i = 0; i < this.height; i++) {
            var line = []
            for (var j = 0; j <= this.numberOfFrets; j++) {
                line.push(
                    (j + this.stringShift[i]) % 12
                );
            }
            this.initialMatrix.push(line);
        }
        this.getNotesName();
        return this.initialMatrix;
    };

    // Hide out of scale notes
    this.getScale = function (note, scale){
        scale = SCALES[scale];
        
        for (var i in scale){
            scale[i] = (scale[i] + getNoteDistance(note)) % 12;
        }
        console.log(note, scale)
        
        var notes = $('.note');
        notes.removeClass('hidden');

        notes.each(function (idx) {
            var distance = Number.parseInt($(this).attr('data-distance'));
            
            if(scale.indexOf(distance) == -1) {
                $(this).addClass('hidden');
            }
        });
    };

    // Return numbers by notes in given matrix
    this.getNotesName = function () {
        this.notesMatrix = [];
        if (this.displayMode == 'sharp') {
            this.display = SHARPS
        } else {
            this.display = FLATS
        }
        for (var i = 0; i < this.initialMatrix.length; i++) {
            var line = this.initialMatrix[i].map(x => this.display[x]);
            this.notesMatrix.push(line);
        }
        return this.notesMatrix;
    };
};


function Render(Board) {

    //Generate guitar handle
    this.createHandle = function() {
        // create localisation marks
        for (var i = 1; i <= Board.numberOfFrets; i++){
            var loc = $('<div>')
            .addClass('location')
            .width(100/Board.numberOfFrets + '%')
            .appendTo('#localisation');
        }
        Board.markedFrets.forEach((item) => {
            fretsMark(item);
        });

        // create frets
        for (var x = 0; x <= Board.numberOfFrets; x++){
            var fret = $('<div>')
                .addClass('fret')
            if (x == 0){
                fret.addClass('open-string');
            }
            else {
                fret.width(100/Board.numberOfFrets + '%');
            }
            // create strings
            for (var y = 0; y < Board.height; y++){
                var guitarString = $('<div>')
                    .addClass('string');
                if (x == 0){
                    guitarString.width('0');
                }
                guitarString.appendTo(fret);

                var note = $('<div>')
                    .addClass('note')
                    .attr('data-x', x)
                    .attr('data-y', y)
                    .attr('data-distance', Board.initialMatrix[y][x]);

                if (x == 0){
                    note.addClass('open-string');
                }
                updateCaption(note, Board.notesMatrix[y][x]);
                note.appendTo(guitarString);
            }
            fret.appendTo('#guitar-handle');
        }
    };

    // Render given matrix
    this.render = function () {
        var notes = $('.note');
        notes.each(function (item) {
            var x = $(this).attr('data-x');
            var y = $(this).attr('data-y');
            updateCaption($(this), Board.notesMatrix[y][x]);
        });
    };

    // Change display between FLAT and SHARP
    this.switchDisplay = function () {
        Board.notesMatrix = Board.getNotesName(Board.notesMatrix)
        if (Board.displayMode == 'sharp'){
            Board.displayMode = 'flat';
        } else if (Board.displayMode == 'flat'){
            Board.displayMode = 'sharp';
        }
        this.render();

    };
};

var getNoteDistance = (noteName) => {
    if (noteName.length > 2) {
        alert('Please do not touch source code');
        return;
    }
    var distance = NOTES[noteName[0]];
    if (noteName[1] == '#') {
        distance = (12 + distance + 1) % 12;
    } else if (noteName[1] == 'b'){
        distance = (12 + distance - 1) % 12;
    }
    return distance;
};