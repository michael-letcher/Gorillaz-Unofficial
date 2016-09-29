/* 
 * Function w3Modal
 * Opens selected modal using jQuery
 * Parameters:
 * domElement [String] will be the id tag of the modal
 */
var modalOpen = false;
var modalID;
function toggleModal(domElement) {
    //$(domElement).show();
    $('#' + domElement).toggle();
    console.log("modalOpen BEFORE: " + modalOpen);
    modalOpen = !modalOpen;
    modalID = domElement;
    console.log("modalOpen AFTER: " + modalOpen);
}

// When the user clicks anywhere outside of the modal, close it
$('.w3-modal').click(function (event) {
    if (event.target.id == modalID)
        toggleModal(event.target.id);
});

//When the user presses ESC, close modal
$(document).keyup(function (e) {
    //If ESC is pressed
    if (e.keyCode == 27 && modalOpen) {
        toggleModal(modalID);
    }
});
