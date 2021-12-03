export default function initTooltip() {
  const tooltips = document.querySelectorAll("[data-tooltip]");

  tooltips.forEach((item) => {
    item.addEventListener("mouseover", onmouseover);
  });

  function onmouseover(e) {
    const tooltipBox = createTooltipBox(this);

    onmousemove.tooltipBox = tooltipBox;
    this.addEventListener("mousemove", onmousemove);

    onmouseleave.tooltipBox = tooltipBox;
    onmouseleave.e = this;
    this.addEventListener("mouseleave", onmouseleave);
  }

  const onmouseleave = {
    handleEvent() {
      this.tooltipBox.remove();
      this.element.removeEventListener("mouseleave", onmouseleave);
      this.element.removeEventListener("mousemove", onmousemove);
    },
  };

  const onmousemove = {
    handleEvent(event) {
      this.tooltipBox.style.top = event.pageY + 20 + "px";
      this.tooltipBox.style.left = event.pageX + 20 + "px";
    },
  };

  function createTooltipBox(element) {
    const tooltipsBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    tooltipsBox.classList.add("tooltip");
    tooltipsBox.innerText = text;
    document.body.appendChild(tooltipsBox);
    return tooltipsBox;
  }
}