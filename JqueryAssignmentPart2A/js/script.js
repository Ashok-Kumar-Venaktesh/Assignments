$(document).ready(function() {
        $("button").click(function() {
            var movieName = $("#searchInput").val();
            $.ajax({
                url: "http://localhost:8080/search?Title=" + movieName,
                dataType: 'json',
                success: function(data) {
                    //Check 1
                    /*console.log(data);
                    console.log(data.Search[0].Poster);*/
                    for (var i = 0; i < data.Search.length; i++) {
                        //Appending the data can be done two ways
                        /*$('table').append(" <tr> <td> " + data.Search[i].Title + "</td> <td>" + data.Search[i].Year + "</td> <td><img src=" + data.Search[i].Poster + " height='64px' width='64px' alt=" + data.Search[i].Title + "></td> </tr>");
                         */
                        var tempvar = " <tr> <td> " + data.Search[i].Title + "</td> <td>" + data.Search[i].Year + "</td> <td><img src=" + data.Search[i].Poster + " height='64px' width='64px' alt=" + data.Search[i].Title + "></td> </tr>";
                        $('table').append(tempvar);
                    }
                }
            });
        });
    });