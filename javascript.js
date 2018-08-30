(function($) {
    $.fn.invisible = function() {
        return this.each(function() {
            $(this).css("visibility", "hidden");
        });
    }

    $.fn.visible = function () {
        return this.each(function() {
            $(this).css("visibility", "visible");
        });
    }
}(jQuery));

$(document).ready(function() {

    let areCurrentHoursValid = false;
    let isStartedTimeValid = false;

    $('#sidebar').mCustomScrollbar({
        theme: "minimal"
    });

    $('#sidebarCollapse').on('click', function () {
        // open or close navbar
        $('#sidebar, #content').toggleClass('active');
    });

    $('#timeToConvert').change(function() {
        if ($(this).val()) {
            let time = $(this).val();
            let hours = time.split(":")[0];
            let minutes = time.split(":")[1];
            var decimalTime = hours * 1.0 + minutes * 1.0 / 60;
            $('#decimalTime').val(decimalTime.toFixed(2));
        }
    });

    $('#currentHours').change(function() {
        var regex = '\d+\.*\d*';
        var currentHours = $(this).val();

        if (/^\d+(\.\d+)?$/.test(currentHours)) {
            if (parseFloat(currentHours) > 20) {
                areCurrentHoursValid = false;
                $('#currentHoursError').text('You should not work more than 20 hours a week');
                $('#currentHoursError').visible();
            } else {
                // we can calculate
                areCurrentHoursValid = true;
                $('#currentHoursError').invisible();
            }
        } else {
            areCurrentHoursValid = false;
            $('#currentHoursError').text('Please enter a valid number');
            $('#currentHoursError').visible();
        }

        tryCalculatingTimeOut();
    });

    $('#startingTime').change(function() {
        if ($(this).val()) {
            isStartedTimeValid = true;
        } else {
            isStartedTimeValid = false;
        }

        tryCalculatingTimeOut();
    });

    function tryCalculatingTimeOut() {
        if (areCurrentHoursValid && isStartedTimeValid) {
            let currentHours = parseFloat($('#currentHours').val());
            let leftoverHours = 20.0 - currentHours;
            let leftoverMinutes = leftoverHours * 60;
            
            let startingTime = $('#startingTime').val();
            let startingHour = startingTime.split(":")[0];
            var startingMinute = startingTime.split(":")[1];
            let minutes = parseInt(startingMinute) + parseInt(startingHour) * 60;

            minutes = minutes + leftoverMinutes - 1;
            let endingHour = parseInt(minutes % 60 > 24 ? minutes % 60 - 24 : minutes / 60);
            let endingMinute = minutes % 60;
            let endingMinuteString = endingMinute < 10 ? '0' + endingMinute.toString() : endingMinute.toString();

            // update the clock out time
            $('#endingTime').val(endingHour.toString() + ':' + endingMinuteString);
        }
    }
})

