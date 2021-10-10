$(document).ready(function() {

  var animating = false;
  var cardsCounter = 0;
  var numOfCards = data.length;
  var decisionVal = 80;
  var pullDeltaX = 0;
  var deg = 0;
  var $card, $cardReject, $cardLike;
  var correct = false;
  var score = 0;

  function pullChange() {
    animating = true;
    deg = pullDeltaX / 10;
    $card.css("transform", "translateX("+ pullDeltaX +"px) rotate("+ deg +"deg)");

    var opacity = pullDeltaX / 100;
    var rejectOpacity = (opacity >= 0) ? 0 : Math.abs(opacity);
    var likeOpacity = (opacity <= 0) ? 0 : opacity;
    $cardReject.css("opacity", rejectOpacity);
    $cardLike.css("opacity", likeOpacity);
  };

  function release() {
    
    if ( (pullDeltaX >= decisionVal && ($card.attr("recyclable")==="true"))) {
      $card.addClass("to-right");
      //console.log("Item is recyclable, moving to right");
      correct = true;
      score++;
    } 
    else if (pullDeltaX <= -decisionVal && ($card.attr("recyclable")==="false")) {
      $card.addClass("to-left");
      correct = true;
      score++;
      //console.log("Item is not recyclable, moving to left");
    }

    // Math.abs(pullDeltaX) >= decisionVal
    if (correct) {
      $card.addClass("inactive");

      setTimeout(function() {
        $card.addClass("below").removeClass("inactive to-left to-right");
        cardsCounter++;
        if (cardsCounter === numOfCards) {
          cardsCounter = 0;
          $(".demo__card").removeClass("below");
        }
      }, 300);
    }
    correct = false;
    document.getElementById("score").innerText = "Score: "+score+" / "+(cardsCounter+1);

    if (Math.abs(pullDeltaX) < decisionVal || !(correct)) {
      $card.addClass("reset");
      $card.find('.demo__card__btm').find('.demo__card__text').css("opacity",1);
    }

    setTimeout(function() {
      $card.attr("style", "").removeClass("reset")
        .find(".demo__card__choice").attr("style", "");

      pullDeltaX = 0;
      animating = false;
    }, 300);
  };

  $(document).on("mousedown touchstart", ".demo__card:not(.inactive)", function(e) {
    if (animating) return;

    $card = $(this);
    $cardReject = $(".demo__card__choice.m--reject", $card);
    $cardLike = $(".demo__card__choice.m--like", $card);
    var startX =  e.pageX || e.originalEvent.touches[0].pageX;

    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      pullDeltaX = (x - startX);
      if (!pullDeltaX) return;
      pullChange();
    });

    $(document).on("mouseup touchend", function() {
      $(document).off("mousemove touchmove mouseup touchend");
      if (!pullDeltaX) return; // prevents from rapid click events
      release();
    });
  });

});

