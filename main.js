$(document).ready(function() {

  var toggleNewQuote = function() {
    $(".editArea").toggle();
    $("#add-quote").toggle();
    $("#random").toggle();
  };

  var addNewQuote = function() {
    var lastQuote = $(".quote-box:last");
    var newQuoteBox = lastQuote.clone();
    var newQuoteText = $(".input-area").eq(0).val();
    var newQuoteAuthor = $(".input-area").eq(1).val();
    
    newQuoteBox.find(".quote-text").text(newQuoteText);
    newQuoteBox.find(".quote-author").text(newQuoteAuthor);

    lastQuote.after(newQuoteBox);
  };

  var findAuthor = function (triggerElem) {

    var myAuthor = triggerElem.text();
    var otherAuthors = triggerElem.parent().siblings().find(".quote-author");

    otherAuthors.each(function(ind, elem) {
      if ($(elem).text()!=myAuthor) {
        $(elem).parent().hide();
      }
    });

    $("#add-quote").toggle();
    $("#random").toggle();
    $("#reset").toggle();
  };



  
  $("#add-quote").on("click", function() {
    toggleNewQuote();
  });

  $("#submit-button").on("click", function(e) {
    
    if($(".input-area").eq(0).val()!==""&&$(".input-area").eq(1).val()!=="") {
      e.preventDefault();
      toggleNewQuote($(this));
      addNewQuote();
    }
    
    else {
      alert("You must add both quote & author");
    }
  });

  $(".quote-author").on("click", function() {
    findAuthor($(this));
  });

  $("#reset").on("click", function() {
    $("#add-quote").toggle();
    $("#random").toggle();
    $("#reset").toggle();
    $(".quote-box").show();
  });
 
});
