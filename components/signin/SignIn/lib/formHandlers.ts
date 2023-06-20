export function handleLoginPage() {
  let inBox = document.getElementById("innerbox");
  inBox!.style.transform = "rotateY(-180deg)";
  inBox!.style.transformStyle = "preserve-3d";
}

export function handleSignUpPage() {
  let inBox = document.getElementById("innerbox");
  inBox!.style.transform = "rotateY(0deg)";
  inBox!.style.transformStyle = "preserve-3d";
}