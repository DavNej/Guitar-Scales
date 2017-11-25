var app = {};

const SHARPS = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const FLATS = ['A', 'Bb', 'B', 'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab'];
const DEGREES = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const NOTES = {
'A' : 0,
'B' : 2,
'C' : 3,
'D' : 5,
'E' : 7,
'F' : 8,
'G' : 10};

const flatSymbol = String.fromCharCode(parseInt(0x266D))

const ACCIDENTALS = {
'A' : ['-', '#', flatSymbol],
'B' : ['-', flatSymbol],
'C' : ['-', '#'],
'D' : ['-', '#', flatSymbol],
'E' : ['-', flatSymbol],
'F' : ['-', '#'],
'G' : ['-', '#', flatSymbol]};

const INTERVALS = [
['Root', 'Diminished Second'],
['Minor Second', 'Augmented Root'],
['Major Second', 'Diminished Third'],
['Minor Third', 'Augmented Second'],
['Major Third', 'Diminished Fourth'],
['Perfect Fourth', 'Augmented Third'],
['Augmented Fourth', 'Diminished Fifth'],
['Perfect Fifth', 'Diminished Sixth'],
['Minor Sixth', 'Augmented Fifth'],
['Major Sixth', 'Diminished Seventh'],
['Minor Seventh', 'Augmented Sixth'],
['Major Seventh', 'Diminished Octave']];

const SCALES = {
'Major' : [0, 2, 4, 5, 7, 9, 11],
'Minor pentatonic' : [0, 3, 5, 7, 10],
'Minor natural' : [0, 2, 3, 5, 7, 8, 10],
'Minor melodic' : [0, 2, 3, 5, 7, 9, 11],
'Minor harmonic' : [0, 2, 3, 5, 7, 8, 11]};

const ARPEGGIOS = {
'minor':[0, 3, 4],
'minor-7th':[0, 3, 4, 3],
'major':[0, 4, 3],
'major-7th':[0, 4, 3, 3]};

// const fretWidths = [
// {'num' : 1, 'width' : 8.666},
// {'num' : 2, 'width' : 8.184},
// {'num' : 3, 'width' : 7.726},
// {'num' : 4, 'width' : 7.294},
// {'num' : 5, 'width' : 6.886},
// {'num' : 6, 'width' : 6.491},
// {'num' : 7, 'width' : 6.138},
// {'num' : 8, 'width' : 5.795},
// {'num' : 9, 'width' : 5.471},
// {'num' : 10, 'width' : 5.166},
// {'num' : 11, 'width' : 4.876},
// {'num' : 12, 'width' : 4.604},
// {'num' : 13, 'width' : 4.347},
// {'num' : 14, 'width' : 4.104},
// {'num' : 15, 'width' : 3.875},
// {'num' : 16, 'width' : 3.659},
// {'num' : 17, 'width' : 3.455},
// {'num' : 18, 'width' : 3.263}];