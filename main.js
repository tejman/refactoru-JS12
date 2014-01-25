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

var showRandom = function() {
  var allQuotes = $(".quote-box");
  var randomIndex = Math.floor(Math.random()*(allQuotes.length));
  var ourQuote = allQuotes.eq(randomIndex).clone();
  
  $(".dark-back").append(ourQuote.addClass("light-box"));
  $(".dark-back").show();
};

var sortByRating = function() {
  var allQuotes = $(".quote-box").clone();
  
  $("#reset").after(
    $(allQuotes.toArray()
      .sort(function(a,b) {
        return $(b).attr("data-rating") - $(a).attr("data-rating");
      })
    ).addClass("sorted")
  );
  
  $(".quote-box").hide();
  $(".sorted").show();
  $("#sort-rating").hide();
  $("#reset").show();
  $("#random").hide();
  $("#add-quote").hide();

};

var addRating = function(elem) {
  elem.after("<textarea cols='2' rows='1' class='rating-input' type='text' maxlength='1'></textarea><a class='rate' href='#'>Rate!</a>")
  elem.hide();

};

var submitRating = function(elem) {
  var ourQuote = elem.closest(".quote-box");
  var userRating = parseInt(elem.siblings(".rating-input").val());
  var currentRating = parseInt(ourQuote.attr("data-rating"));
  var totalVotes = parseInt(ourQuote.attr("data-votes"));
 
  var newSum = ((currentRating*totalVotes)+userRating);
  totalVotes++;
  var newRating = Math.round((newSum/totalVotes));

  ourQuote.attr("data-votes", totalVotes.toString());
  ourQuote.attr("data-rating", newRating.toString());

  elem.siblings(".rating").text(newRating.toString());  
  elem.siblings(".rating-input").remove();
  elem.siblings(".rating").show();
  elem.remove();
  
};

var confirmDelete = function(elem) {
  elem.text("Confirm Delete");
  undoElem = elem.clone();
  undoElem.text("Undo?");
  undoElem.css("backgroundColor", "#0B0");
  undoElem.addClass("undo");
  elem.addClass("confirm");
  elem.after(undoElem);
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

  $(document).on("click", ".quote-author", function() {
    findAuthor($(this));
  });

  $(document).on("click", "#reset", function() {
    $(".sorted").remove();
    $("#add-quote").show();
    $("#random").show();
    $("#reset").hide();
    $(".quote-box").show();
    $("#sort-rating").show();
  });

  $(document).on("click", "#random", function() {
    showRandom();

  });
 
  $(document).on("click", ".dark-back", function() {
    $(this).toggle();
    $(this).text("");
  });

  $(document).on("click", "#sort-rating", function(){
    sortByRating();
  });

  $(document).on("click", ".rating", function() {
    addRating($(this));
  });

  $(document).on("click", ".rate", function(e) {
    e.preventDefault();
    submitRating($(this));
  });

  $(document).on("click", ".delete", function() {
    confirmDelete($(this));
  });

  $(document).on("click", ".confirm", function(){
    $(this).closest(".quote-box").remove();

  });

  $(document).on("click", ".undo", function(){


  });

});
