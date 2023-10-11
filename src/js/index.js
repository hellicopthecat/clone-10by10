$(function () {
  const url = "https://cataas.com/cat";
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
      }
    });
});
