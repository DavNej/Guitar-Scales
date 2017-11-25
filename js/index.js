$(document).ready(function() {
    app.init();
});

app.init = function() {
    
    populateMenu(NOTES, '#notes');
    populateMenu(SCALES, '#scales');
    // populateMenu(ARPEGGIOS, '#arpeggios');
    updateAccidentalMenu();

    var guitar = new Board(18, ['E', 'A', 'D', 'G', 'B', 'E']);
    guitar.generate();
    app.guitar = guitar;

    var render = new Render(guitar);
    render.createHandle();
    app.render = render;
};

app.switchDisplay = () => {
    app.render.switchDisplay();
};
// Go function
app.go = () => {
    var selectedNote = $('#notes option:selected').val() + $('#accidentals option:selected').val();
    var selectedScale = $('#scales option:selected').val();

    var distanceToRoot = getNoteDistance(selectedNote);
    
    var scale = app.guitar.getScale(selectedNote, selectedScale);
    
    resetNoteColor();
    changeNoteColor(distanceToRoot, 'red');
    changeNoteColor((distanceToRoot + 7) % 12 , 'green');
};