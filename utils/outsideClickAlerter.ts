export default function AvatarContainerClickHandler() {
  let popUp = document.getElementById("popUp");

  const handleClickOutside = (event: Event) => {
    if (
      !popUp?.contains(event.target) &&
      popUp?.nextSibling?.children[0] != event.target &&
      popUp?.nextSibling?.children[0].children[0].children[0] !=
        event.target &&
      popUp?.nextSibling?.children[0].children[1].children[0] != event.target
    ) {
      popUp!.style.display = "none";
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  if (popUp!.style.display == "" || popUp!.style.display == "none") {
    popUp.style.display = "block";
    document.addEventListener("mousedown", handleClickOutside);
  } else popUp!.style.display = "none";
};
