const columns = document.querySelectorAll(".column");

document.addEventListener("keydown", (event) => {
  if (event.code.toLowerCase() === "space") {
    setRandomColours();
  }
});

const generateColorBtn = document.querySelector(".generate-color");

generateColorBtn.addEventListener("click", () => {
  setRandomColours();
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type === "lock") {
    const node =
      event.target.tagName.toLowerCase() === "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock-open");
    node.classList.toggle("fa-lock");
  } else if (type === "copy") {
    copyToClickboard(event.target.textContent);
  }
});


function copyToClickboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => {
      alert("Сopied!");
    })
    .catch((err) => {
      alert("Something goes wrong...");
      console.error("Something goes wrong...", err);
    });
}

function setRandomColours(isInitial) {
  const colors = isInitial ? getColorsFromHash() : [];
  columns.forEach((column, index) => {
    const isLocked = column.querySelector("i").classList.contains("fa-lock");
    const name = column.querySelector("h2");
    const button = column.querySelector("button");

    if (isLocked) {
      colors.push(name.textContent);
      return;
    }

    const color = isInitial
      ? colors[index]
        ? colors[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colors.push(color);
    }

    name.textContent = color;
    column.style.background = color;

    setNameColor(name, color);
    setNameColor(button, color);
  });
  updateColorsHash(colors);
}


function setNameColor(name, color) {
  const luminance = chroma(color).luminance();
  name.style.color = luminance > 0.5 ? "black" : "white";
}

function updateColorsHash(colors = []) {
  document.location.hash = colors
    .map((column) => column.toString().substring(1))
    .join("-");
}

function getColorsFromHash() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColours(true);
