$(function () {
  const url = "https://cataas.com/cat";

  // tag of cats
  const transCat = (mood) => {
    $(".img p").show();
    $(".img img").hide();
    fetch(`${url}/${mood}`)
      .then((response) => response.url)
      .then((data) => {
        $(".img p").hide();
        $(".img img").show();
        $(".img img").attr("src", data);
        $(".subtitle p:eq(1)").text(mood).slideDown();
      });
  };

  // number motion
  function slideMotion() {
    $(".subtitle p:eq(0)").slideUp().hide();
    $(".number").each(function (a) {
      const div = $(this);
      const styles = {
        transform: `translateX(${a <= 4 ? -100 : 100}%)`,
        transition: "ease-in-out 0.5s",
      };
      setTimeout(
        function () {
          div.css(styles);
        },
        a <= 4 ? a * 100 : (a - 5) * 100
      );
    });
    $(".back p").slideDown().show();
  }

  //back btn
  $(".back p").on("click", function () {
    $(".number").each(function (a) {
      const div = $(this);
      const styles = {
        transform: "translateX(0%)",
        transition: "ease-in-out 0.5s",
      };
      div.css(styles);
    });
    $(".back p").slideUp(function () {
      fetch(`${url}`)
        .then((response) => response.url)
        .then((data) => {
          if (!data) {
            $(".img p").show();
            $(".img img").hide();
          } else {
            $(".img img").show();
            $(".img img").attr("src", data);
            $(".img p").hide();
            $(".subtitle p:eq(0)").slideDown();
          }
        });
      $(".subtitle p:eq(1)").slideUp();
    });
  });

  //click fnc
  $(".number").on("click", function () {
    slideMotion();
    if (this.innerText.slice(1, 3) === "10") {
      transCat("tired");
    } else if (this.innerText.slice(1, 3) === "9") {
      transCat("happy");
    } else if (this.innerText.slice(1, 3) === "8") {
      transCat("sad");
    } else if (this.innerText.slice(1, 3) === "7") {
      transCat("angry");
    } else if (this.innerText.slice(1, 3) === "6") {
      transCat("hungry");
    } else if (this.innerText.slice(1, 3) === "5") {
      transCat("afraid");
    } else if (this.innerText.slice(1, 3) === "4") {
      transCat("play");
    } else if (this.innerText.slice(1, 3) === "3") {
      transCat("cute");
    } else if (this.innerText.slice(1, 3) === "2") {
      transCat("baby");
    } else if (this.innerText.slice(1, 3) === "1") {
      transCat("kitten");
    }
  });
});
