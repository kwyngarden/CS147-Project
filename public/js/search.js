$("#searchsubmit").click(handleSearch);
$("#searchtext").bind("keypress", function(event) {
    if(event.which == 13) { // enter key
        event.preventDefault();
        handleSearch(event);
    }
});

function handleSearch(e) {
    console.log("Handling search entry");
    var search = $("#searchtext")[0].value;
    var url = "/search/" + encodeURIComponent(search);
    window.location.href = url;
}