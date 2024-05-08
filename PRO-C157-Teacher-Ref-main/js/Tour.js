AFRAME.registerComponent("tour", {
  init: function () {
    this.placesContainer = this.el;   
    this.createCards();
  },
  tick: function () {
    const { state } = this.el.getAttribute("tour");

    if (state === "view") {
      this.hideEl([this.placesContainer]);
      this.showView();
    }
  },
  hideEl: function (elList) {
    elList.map(el => {
      el.setAttribute("visible", false);
    });
  },

  showView: function () {
    const { selectedCard } = this.data;

    //Set the 360 degree image to the sky element.
    const skyEl = document.querySelector("#main-container");

    skyEl.setAttribute("material", {
      src: `./assets/360_images/${selectedCard}/place-0.jpg`,
      color: "white"
    });
  },

  createCards: function () {
    const thumbNailsRef = [
      {
        id: "c1",
        title: "Spider-Man Comic 1",
        url: "./assets/thumbnails/c1.jpeg",
      },
      {
        id: "c2",
        title: "Spider-Man Comic 2",
        url: "./assets/thumbnails/c2.jpeg",
      },

      {
        id: "c3",
        title: "Spider-Man Comic 3",
        url: "./assets/thumbnails/c3.webp",
      },
      {
        id: "c4",
        title: "Spider-Man Comic 4",
        url: "./assets/thumbnails/c4.jpeg",
      },
    ];
    
    let prevoiusXPosition = -60;

    for (var item of thumbNailsRef) {
      const posX = prevoiusXPosition + 25;
      const posY = 10;
      const posZ = -40;
      const position = { x: posX, y: posY, z: posZ };
      prevoiusXPosition = posX;

      // Border Element
      const borderEl = this.createBorder(position, item.id);

      // Thumbnail Element
      const thumbNail = this.createThumbNail(item);
      borderEl.appendChild(thumbNail);

      // Title Text Element
      const titleEl = this.createTitleEl(position, item);
      borderEl.appendChild(titleEl);

      this.placesContainer.appendChild(borderEl);
    }
  },
  createBorder: function (position, id) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("id", id);
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "ring",
      radiusInner: 11,
      radiusOuter: 11.25,
    });
    entityEl.setAttribute("position", position);
    entityEl.setAttribute("material", {
      color: "#000000",
      opacity: 1,
    });

    return entityEl;
  },
  createThumbNail: function (item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("visible", true);
    entityEl.setAttribute("geometry", {
      primitive: "circle",
      radius: 11,
    });
    entityEl.setAttribute("material", { src: item.url });

    return entityEl;
  },
  createTitleEl: function (position, item) {
    const entityEl = document.createElement("a-entity");
    entityEl.setAttribute("text", {
      font: "exo2bold",
      align: "center",
      width: 70,
      color: "#e65100",
      value: item.title,
    });
    const elPosition = position;
    elPosition.y = -20;
    entityEl.setAttribute("position", elPosition);
    entityEl.setAttribute("visible", true);
    return entityEl;
  },
});
