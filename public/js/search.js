$(".searchButton").click(toggleSearch);
$("#searchsubmit").click(handleSearch);
$("#searchtext").bind("keypress", function(event) {
    if(event.which == 13) { // enter key
        event.preventDefault();
        handleSearch(event);
    }
});

function toggleSearch(e) {
	var searchForm = $('.searchform');
	searchForm.toggle(250);
	searchForm.css('clear', 'both');
}

function handleSearch(e) {
    console.log("Handling search entry");
    var search = $("#searchtext")[0].value;
    var url = "/search/" + encodeURIComponent(search);
    window.location.href = url;
    // $.get(url, handleSearchResults);
}

function handleSearchResults(data) {
    console.log("Returned json:");
    console.log(data);
}