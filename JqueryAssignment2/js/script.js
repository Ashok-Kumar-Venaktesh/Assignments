$(document).ready(function() {

    $('form').hide();
    console.log("Document is ready");
    $("#searchButton").click(function() {
        getMovies(0, 10);
    });
    $("#tbUser").on('click', '.btnDelete', function() {
        console.log("Delete Button has been pressed");
        var a = $('td:first', $(this).parents('tr')).text();
        $(this).closest('tr').remove();
        $.ajax({
            method: "DELETE",
            url: 'http://localhost:8080/search/' + (a - 1),
            success: function(data) {
                alert("Deleted Successfully");
            }
        });
    });


    $("#tbUser").on('click', '#editButton', function() {
        var patchIndex = $('td:first', $(this).parents('tr')).text();
        console.log("Edit Button has been pressed");
        $('deleteButton').hide();
        var par = $(this).parent().parent();
        var tdId = par.children("td:nth-child(1)");
        var tdTitle = par.children("td:nth-child(2)");
        var tdYear = par.children("td:nth-child(3)");

        tdId.html("<input type='text' id='txtId' value='" + tdId.html() + "'/>");
        tdTitle.html("<input type='text' id='txtTitle' value='" + tdTitle.html() + "'/>");
        tdYear.html("<input type='text' id='txtYear' value='" + tdYear.html() + "'/>");
        console.log($(txtId).val());
        console.log($(txtTitle).val());
        console.log($(txtYear).val());

        console.log("patch index", patchIndex);

        var patchData = {};
        //patchData["Id"] = $();
        
        $('#updateButton').click(function() {
            patchData["Title"] = $(txtTitle).val();
            patchData["Year"] = $(txtYear).val();
            patchData["Poster"] = "http://s.ndtvimg.com/images/content/2016/apr/806/dhoni-general.jpg?downsize=764:573&output-quality=80&output-format=jpg";

            console.log(patchData["Title"],patchData["Year"],patchData["Poster"]);
            $.ajax({
                url: 'http://localhost:8080/search/' + patchIndex.trim(),
                method: 'PATCH',
                "content-Type": 'application/json',
                data: patchData,
                success: function(data) {
                    alert("Updated Successfully");
                }
            });
        });
    });

    $("#addButton").click(function() {

        //$('table').append(form);

        $('form').show();

    });

    $("#submitButton").click(function() {
        var lookup = {
            "id": $('#idInput').val(),
            "Title": $('#titleInput').val(),
            "Year": $('#yearInput').val(),
            "Poster": $('#posterInput').val()
        }

        $.ajax({
            url: 'http://localhost:8080/search',
            type: 'post',
            data: JSON.stringify(lookup),
            contentType: 'application/json',
            dataType: 'json',
            success: function(data) {
                alert("Added Succefully");
                location.reload();
            }
        });
    })

    var getMovies = function(start, end) {
        var movieName = $("#searchInput").val();
        /*$('tbUser').find('tr').hide();*/
        $('#tbUser').empty();
        $.ajax({
            method: "GET",
            url: 'http://localhost:8080/search',
            success: function(data) {
                dataLength = data.length;
                //console.log(dataLength);
                var t = '';
                $.each(data.slice(start, end), function(i, value) {
                    //console.log("Start, end", start, end, data.slice(start, end));
                    t = '<tr class="paginate"><td>' + (parseInt(data[i + start].id) + parseInt(1)) + '</td><td>' + data[i + start].Title + '</td><td>' + data[i + start].Year + '</td><td><img src=' + data[i + start].Poster + 'alt =' + data[i + start].Title + 'height= 64px width=64px></td><td><button class="btn btn-danger btnDelete" width=64px><span class="glyphicon glyphicon-trash"></span>Delete</button>' + '   ' + '<button id="updateButton" class="btn btn-success" width=64px><span class="glyphicon glyphicon-trash"></span>Update</button>' + ' ' + '<button id="editButton" class="btn btn-warning" width=64px> <span class="glyphicon glyphicon-edit">Edit</span> </button> </td></tr>';
                    $('table').append(t);
                })
                pagination(dataLength);
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
                //$('#p' + page).addClass('_current').show();
                getMovies((page - 1) * 10, page * 10);
                //$('._current', '#paginationdemo').addClass('_current');
            }
        });

    }
});
