$(".searchButton").click(toggleSearch);
$("#searchsubmit").click(handleSearch);

function toggleSearch(e) {
	var searchForm = $('.searchform');
	searchForm.toggle(250);
	searchForm.css('clear', 'both');
}

function handleSearch(e) {
    var search = $("#searchtext")[0].value;
    var url = "/search/" + encodeURIComponent(search);
    $.get(url, handleSearchResults);
}

function handleSearchResults(data) {
    console.log("Returned json:");
    console.log(data);
}