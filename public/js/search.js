$("#searchsubmit").click(handleSearch);

function handleSearch(e) {
    var search = $("#searchtext")[0].value;
    var url = "/search/" + encodeURIComponent(search);
    $.get(url, handleSearchResults);
}

function handleSearchResults(data) {
    console.log("Returned json:");
    console.log(data);
}