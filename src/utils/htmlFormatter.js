export function htmlToText(html) {
  var divContainer = document.createElement("div");
  divContainer.innerHTML = html;

  return divContainer.textContent || divContainer.innerText || "";
}
