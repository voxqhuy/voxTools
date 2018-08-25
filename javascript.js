$(document).ready(function() {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        // open or close navbar
        $('#sidebar, #content').toggleClass('active');
    });

    $('#timeToConvert').change(function() {
    	let time = $(this).val();
    	let hours = time.split(":")[0];
    	let minutes = time.split(":")[1];
    	var decimalTime = hours * 1.0 + minutes * 1.0 / 60;
    	$('#decimalTime').val(decimalTime.toFixed(2));

    });

    $('#currentHours').change(function() {
    	let a = 1;
    	alert($('#currentHours').val());
    });
})