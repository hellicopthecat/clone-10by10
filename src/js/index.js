$(function () {
  const url = "https://cataas.com/cat";
  const imgSize = "?width=500&height=400";
  fetch(`${url}${imgSize}`)
    .then((response) => response.url)
    .then((data) => {
      if (!data) {
        $(".img p").show();
        $(".img img").hide();
      } else {
        $(".img img").show();
        $(".img img").attr("src", data);
        $(".img p").hide();
      }
    });

  const transCat = (mood) => {
    $(".img p").show();
    $(".img img").hide();
    fetch(`${url}/${mood}${imgSize}`)
      .then((response) => response.url)
      .then((data) => {
        $(".img p").hide();
        $(".img img").show();
        $(".img img").attr("src", data);
      });
  };

  $(".number").on("click", function () {
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
    } else transCat();
  });
});
