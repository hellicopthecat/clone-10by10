$(function () {
  $(".menu").on("click", function () {
    const title = $(".title");
    const menu = $(".menu");
    $(".menu-list").slideToggle(function () {
      const style = {backgroundColor: "#af7832", color: "white"};
      $(title).css(style);
      $(menu).css(style);
      if ($(".menu-list").is(":hidden")) {
        $(title).css({backgroundColor: "", color: ""});
        $(menu).css({backgroundColor: "", color: ""});
      }
    });
  });
});
