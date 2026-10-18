(function () {
  var S = window.SITE;
  if (!S) return;

  function waLink(message) {
    return "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(message || S.whatsappMessage);
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Page title and description
  document.title = S.name + " | Homes in Accra";
  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", S.subtext);

  // Text fields: <element data-bind="key">
  document.querySelectorAll("[data-bind]").forEach(function (node) {
    var value = S[node.getAttribute("data-bind")];
    if (typeof value === "string") node.textContent = value;
  });

  // Links
  document.querySelectorAll("[data-wa]").forEach(function (node) {
    node.setAttribute("href", waLink());
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener");
  });
  document.querySelectorAll("[data-tel]").forEach(function (node) {
    node.setAttribute("href", "tel:" + S.phoneTel);
  });
  document.querySelectorAll("[data-maps]").forEach(function (node) {
    node.setAttribute("href", "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(S.mapsQuery));
  });

  // Stats
  var stats = document.getElementById("stats-items");
  if (stats) {
    S.stats.forEach(function (s) {
      var box = el("div", "stat");
      box.appendChild(el("div", "stat-value", s.value));
      box.appendChild(el("div", "stat-label", s.label));
      stats.appendChild(box);
    });
  }

  // Services
  var services = document.getElementById("service-items");
  if (services) {
    S.services.forEach(function (s, i) {
      var tile = el("article", "tile" + (i === 1 ? " tile-lime" : ""));
      tile.appendChild(el("span", "tile-num", "0" + (i + 1)));
      tile.appendChild(el("h3", "", s.title));
      tile.appendChild(el("p", "", s.text));
      services.appendChild(tile);
    });
  }

  // Listings
  var listings = document.getElementById("listing-items");
  if (listings) {
    S.listings.forEach(function (item) {
      var card = el("article", "card");
      card.appendChild(el("div", "card-img"));
      var body = el("div", "card-body");
      var top = el("div", "card-top");
      top.appendChild(el("span", "tag", item.type));
      top.appendChild(el("span", "card-location", item.location));
      body.appendChild(top);
      body.appendChild(el("h3", "", item.title));
      body.appendChild(el("p", "card-price", item.price));
      var enquire = el("a", "btn btn-lime btn-block", "Enquire on WhatsApp");
      enquire.setAttribute("href", waLink("Hello, I'm interested in the " + item.title + " in " + item.location + "."));
      enquire.setAttribute("target", "_blank");
      enquire.setAttribute("rel", "noopener");
      body.appendChild(enquire);
      card.appendChild(body);
      listings.appendChild(card);
    });
  }

  // Reasons
  var reasons = document.getElementById("reasons");
  if (reasons) {
    S.reasons.forEach(function (r) {
      reasons.appendChild(el("li", "", r));
    });
  }
})();
