console.log('newway.js')

// const NOTES_SHARP = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
// const NOTES_FLAT = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];

// const SCALES = [{'name' : 'Major', 'intervals' : [0, 2, 2, 1, 2, 2, 2, 1]},
// {'name' : 'Minor pentatonic', 'intervals' : [0, 3, 2, 2, 3, 2]},
// {'name' : 'Minor natural', 'intervals' : [0, 2, 1, 2, 2, 1, 2, 2]},
// {'name' : 'Minor melodic', 'intervals' : [0, 2, 1, 2, 2, 2, 2, 1]},
// {'name' : 'Minor harmonic', 'intervals' : [0, 2, 1, 2, 2, 1, 3, 1]}];

const ARPEGGIOS = {
    'minor':[0, 3, 4],
    'minor-7th':[0, 3, 4, 3],
    'major':[0, 4, 3],
    'major-7th':[0, 4, 3, 3]
};

function Board(frets, strings) {
    this.width = frets;
    
    if (strings) {
        this.height = strings.length;
        this.stringShift = strings.map(
            x => NOTES_SHARP.indexOf(x)
        ).reverse();
        
    } else {
        // Default => Guitare with standard tuning
        this.height = 6;
        this.stringShift = [7, 2, 10, 5, 0, 7];
    }
    
    this.matrix = [];
    this.display = [];
    this.rendered = [];

    // Generate a new matrix of height x width
    this.generate = function () {
        for (var i = 0; i < (this.height); i++) {
            var line = []
            for (var j = 0; j < this.width; j++) {
                line.push(
                    (j + this.stringShift[i]) % 12
                );
            }
            this.matrix.push(line);
        }
        return this.matrix;
    }

    // Place notes in matrix
    this.render = function (choice) {
        if (choice == 'flat') {
            this.display = NOTES_FLAT
        } else {
            this.display = NOTES_SHARP
        }
        for (var i = 0; i < (this.height); i++) {
            var line = this.matrix[i]
            line = line.map(x => this.display[x]);
            this.rendered.push(line);
        }
        return this.matrix;
    };

    this.update = function (intervals){
        console.log('intervals', intervals)
        for (var i = 0; i < this.matrix.length; i++) {
            var line = this.matrix[i];
            line = line.map((item) => {
                if (intervals.indexOf(item) == -1){
                    return '*';
                } else {
                    return item;
                }
            });
            this.matrix[i] = line
        }
        console.log(this.matrix)
        
    };
};

// function Scale(){};

var guitar = new Board(18, ['E', 'A', 'D', 'G', 'B', 'E']);
guitar.generate();
guitar.render();
// guitar.update(ARPEGGIOS.minor);
guitar.update(SCALES[1].intervals);
// console.log(guitar)