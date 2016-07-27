$(document).ready(function() {
    
    //Global Variable
    var CONST_URL = "http://localhost:8080/search/"
    var dataLength = '';

    $("#formHeader").hide();

    //Ajax method to get the length of the records for pagination
    $.ajax({
        method: "GET",
        url: CONST_URL,
        success: function(data) {
            dataLength = data.length;
        },
        error: function(err, message) {
            console.log("Error returned", message);
        }
    });

    //Display all the movies
    $("#searchButton").click(function() {

        getMovies(0, 10);

        $("#tbUser").show();
        $('#searchButton').hide();

    });


    //Delete a particular row in the table
    $("#tbUser").on('click', '.btnDelete', function() {

        var a = $('td:first', $(this).parents('tr')).text();
        var deletedRow = $(this).closest('tr').remove();

        $.ajax({
            method: "DELETE",
            url: CONST_URL + (a - 1),
            success: function(data) {
                $(deletedRow).remove();
                alert("Deleted Successfully");
            }
        });

    });


    //Updating the row in the table 
    $("#tbUser").on('click', '#editButton', function() {
        
        $('.deleteButtonClass').hide();
        $('.updateButtonClass').show();
        $('.editButtonClass').hide();
        
        var patchIndex = $('td:first', $(this).parents('tr')).text() - 1;
        var par = $(this).parent().parent();
        var tdId = par.children("td:nth-child(1)");
        var tdTitle = par.children("td:nth-child(2)");
        var tdYear = par.children("td:nth-child(3)");
        var patchData = {};

        //Convert table to inline form
        tdId.html("<input type='text' id='txtId' value='" + tdId.html() + "'/>");
        tdTitle.html("<input type='text' id='txtTitle' value='" + tdTitle.html() + "'/>");
        tdYear.html("<input type='text' id='txtYear' value='" + tdYear.html() + "'/>");

        //Updating the data
        $('#updateButton').click(function() {

            patchData["Title"] = $(txtTitle).val();
            patchData["Year"] = $(txtYear).val();
            patchData["Poster"] = "http://s.ndtvimg.com/images/content/2016/apr/806/dhoni-general.jpg?downsize=764:573&output-quality=80&output-format=jpg";
            
            $.ajax({
                url: CONST_URL + patchIndex,
                method: 'PATCH',
                "content-Type": 'application/json',
                data: patchData,
                success: function(data) {
                    alert("Updated Successfully", par);
                }
            });
        
        });
    });


    //Show the form when user clicks on ADD
    $("#addButton").click(function() {
        
        $('#formHeader').show();
    
    });


    //Add new row to Json 
    $("#submitButton").click(function() {
    
        var lookup = {
            "id": $('#idInput').val(),
            "Title": $('#titleInput').val(),
            "Year": $('#yearInput').val(),
            "Poster": $('#posterInput').val()
        }

        $.ajax({
            url: CONST_URL,
            type: 'POST',
            data: JSON.stringify(lookup),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                console.log(parseInt($('#idInput').val()) - 10, parseInt($('#idInput').val()));
                alert("Added Succefully");

                var t = '<tr class="paginate"><td>' + parseInt($('#idInput').val()) + '</td><td>' + $('#titleInput').val() + '</td><td>' + $('#yearInput').val() + '</td><td><img src=' + $('#posterInput').val() + 'alt =' + $('#titleInput').val() + 'height= 64px width=64px></td><td><button class="btn btn-danger btnDelete deleteButtonClass" width=64px><span class="glyphicon glyphicon-trash"></span>Delete</button>' + '   ' + '<button id="updateButton" class="btn btn-success updateButtonClass" width=64px><span class="glyphicon glyphicon-align-justify"></span>Update</button>' + ' ' + '<button id="editButton" class="btn btn-warning editButtonClass" width=64px> <span class="glyphicon glyphicon-edit">Edit</span> </button> </td></tr>';

                $('table').append(t);
            }
        });
    
    });


    //Get the movie list with start index and limit
    var getMovies = function(start, limit) {
    
        $('#tbUser').find("tr:gt(0)").empty();

        $.ajax({

            method: "GET",
            url: CONST_URL + "?_start=" + start + "&_limit=" + limit,

            success: function(moviesList) {
                var t = '';
                $.each(moviesList, function(i,data) {
                    console.log("Data is",data.id,"index value is",i);

                    t = '<tr class="paginate"><td>' + (parseInt(data.id) + parseInt(1)) + '</td><td>' + data.Title + '</td><td>' + data.Year + '</td><td><img src=' + data.Poster + 'alt =' + data.Title + 'height= 64px width=64px></td><td><button class="btn btn-danger btnDelete deleteButtonClass" width=64px><span class="glyphicon glyphicon-trash"></span>Delete</button>' + '   ' + '<button id="updateButton" class="btn btn-success updateButtonClass" width=64px><span class="glyphicon glyphicon-align-justify"></span>Update</button>' + ' ' + '<button id="editButton" class="btn btn-warning editButtonClass" width=64px> <span class="glyphicon glyphicon-edit">Edit</span> </button> </td> </tr>';

                    $('table').append(t);
                });

                pagination(dataLength);
                $('.updateButtonClass').hide();
            },

            error: function(err, message) {
                console.log("Error returned", message);
            }

        });
    }


    var pagination = function(dataLength) {

        $("#demo5").paginate({
            count: (dataLength / 10),
            start: 1,
            display: 7,
            border: true,
            border_color: '#fff',
            text_color: '#fff',
            background_color: 'black',
            border_hover_color: '#ccc',
            text_hover_color: '#000',
            background_hover_color: '#fff',
            images: false,
            mouse: 'press',
            onChange: function(page) {
                $('._current', '#paginationdemo').removeClass('_current');
                getMovies((page - 1) * 10, 10);
            }
        });

    }

});