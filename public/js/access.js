$(function(){
    var $hotels = $('#hotels');

    var hotelTemplate = "" +
    "<li>" +
    "<p><strong>Name:</strong> {{name}}</p>" +
    "<p><strong>State:</strong> {{state}}</p>" +
    "<p><strong>Address:</strong> {{address}}</p>" +
    "<p><strong>Description:</strong> {{description}}</p>" +
    "<p><strong>Rooms:</strong> {{rooms}}</p>" +
    "<p><strong>Amount:</strong> {{amount}}</p>" +
    "<button data-id='{{id}}' class=''>Book Now</button>"
    "</li>"
    
    function addHotel(hotel) {
        $hotels.append(Mustache.render(hotelTemplate,hotel));
    }


    //-------------- To Get Data from the API --------------------------- 
    $.ajax ({
        type: 'GET',
        url: 'http://localhost:3000/HotelListing',
        success: function(hotels) {
            $.each(hotels,function(i,hotel){
                addHotel(hotel);
            });
        },
        error: function() {
            alert('error loading new hotel')
        }
    });


    $(document).ready(function(){
        $.ajaxSetup({ cache: false });
        $('#search').keyup(function(){
         $('#result2').html('');
         $('#state').val('');
         var searchField = $('#search').val();
         var expression = new RegExp(searchField, "i");
         $.getJSON('http://localhost:3000/HotelListing', function(data) {
          $.each(data, function(key, value){
           if (value.name.search(expression) != -1 || value.state.search(expression) != -1)
           {
            $('#result2').append('<li class="list-group-item link-class"><strong>Name:</strong> '+value.name+' <br> State:'+value.state+' <br> Address:'+value.address+' <br> Description:'+value.Description+' <br> No of Rooms:'+value.rooms+' <br> Amount:'+value.amount+'</li>');
           }
          });   
         });
        });

        $('#result2').on('click', 'li', function() {
            var click_text = $(this).text().split('|');
            $('#search').val($.trim(click_text[0]));
            $("#result2").html('');
           });

       });
});