$(function(){

    var $hotels = $('#hotels');
    var $name = $('#name');
    var $state = $('#state');
    var $address = $('#address');
    var $description = $('#description');
    var $rooms = $('#rooms');
    var $amount = $('#amount');

    var hotelTemplate= $('#hotel-template').html();
    
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

    //-------------- To Add Data from the API ---------------------------
    $('#add-hotel').on('click',function( ){
        var hotel = {
            name: $name.val(),
            state: $state.val(),
            address: $address.val(),
            description: $description.val(),
            rooms: $rooms.val(),
            amount: $amount.val(),
        };
    $.ajax ({
        type:'POST',
        url:'http://localhost:3000/HotelListing',
        data:hotel,
        success:function(newHotel) {
            addHotel(newHotel);
            alert('Hotel Successfully Added');
        },
        error:function() {
            alert('Error Adding Hotel');
        }
    });
    });
//-------------- To Delete Data from the API ---------------------------  
    $hotels.delegate('.remove', 'click', function() {
        var $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3000/HotelListing/' + $(this).attr('data-id'),
            success: function () {
                $li.fadeOut(300, function() {
                    $(this).remove();
                });
            }
        });
    });

//-------------- To Edit Data in the API ---------------------------
$hotels.delegate('.editHotel', 'click', function() {
    var $li = $(this).closest('li');
    $li.find('input.name').val( $li.find('span.name').html() );
    $li.find('input.state').val( $li.find('span.state').html() );
    $li.find('input.address').val( $li.find('span.address').html() );
    $li.find('input.description').val( $li.find('span.description').html() );
    $li.find('input.rooms').val( $li.find('span.rooms').html() );
    $li.find('input.amount').val( $li.find('span.amount').html() );
    $li.addClass('edit');
});
$hotels.delegate('.cancelEdit', 'click', function() {
    $(this).closest('li').removeClass('edit');
});
$hotels.delegate('.saveEdit', 'click', function() {
    var $li = $(this).closest('li');
    var hotel = {
        name: $li.find('input.name').val(),
        state: $li.find('input.state').val(),
        address: $li.find('input.address').val(),
        description: $li.find('input.description').val(),
        rooms: $li.find('input.rooms').val(),
        amount: $li.find('input.amount').val()
    }
    $.ajax ({
        type:'PUT',
        url:'http://localhost:3000/HotelListing/' + $li.attr('data-id'),
        data:hotel,
        success:function(newHotel) {
            $li.find('span.name').html(hotel.name);
            $li.find('span.state').html(hotel.state);
            $li.find('span.address').html(hotel.address);
            $li.find('span.description').html(hotel.description);
            $li.find('span.rooms').html(hotel.rooms);
            $li.find('span.amount').html(hotel.amount);
            $li.removeClass('edit');
            alert('Hotel Successfully Updated');
        },
        error:function() {
            alert('Error Updating Hotel');
        }
    })
});
})
