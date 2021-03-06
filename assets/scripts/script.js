//Show date when page loads
var currentDay = $('#currentDay').text(moment().format('dddd, MMM Do YYYY'));

var container = $('#container');

//create columns for standard business hours (9a-5p), columns for input, columns for save buttons
function renderScheduler () {

    var hours = [
       09,
       10,
       11,
       12,
       13,
       14,
       15,
       16,
       17
    ]

    for (var i = 0; i < hours.length; i++) {
        // Create column row
        var columnRow = $('<div>');
        columnRow.addClass('row');

        // Create time column
        var colTime = $('<div>');
        colTime.addClass('col-1 hour');
        colTime.attr('id', hours[i]);
        colTime.text(moment(hours[i], 'HH').format('h a'));

        // Create text column
        var colText = $('<div>');
        colText.addClass('col');

        //Display background based on time of day
        var currentHour = moment().format('HH');
        if (hours[i] < currentHour) {
            colText.addClass('past');
        } else if (hours[i] == currentHour) {
            colText.addClass('present');
        } else {
            colText.addClass('future');
        }

        //Remove extra padding from bootstrap
        colText.css('padding', '0');
        
        //Create form and textbox inside column
        var colForm = $('<form>');
        var formID = "form" + (i + 1);
        var textID = "text" + (i + 1);
        colForm.attr('id', formID);

        var textArea = $('<textarea>');
        textArea.attr('form', formID);
        textArea.attr('id', textID);

        //Show saved text from local
        textArea.text(localStorage.getItem(textID));

        colText.append(colForm);
        colForm.append(textArea);

        // Create save button column
        var colSave = $('<div>');
        colSave.addClass('col-1 saveBtn');

        // Append all elements
        columnRow.append(colTime);
        columnRow.append(colText);
        columnRow.append(colSave);

        container.append(columnRow);
    }

}

//Render scheduler
renderScheduler();

//save entries to local storage
container.on('click', '.saveBtn', function(event) {
    var textArea = $(this).siblings().eq(1).children().children().val();
    var textID = $(this).siblings().eq(1).children().children().attr('id');

    localStorage.setItem(textID, textArea);
});