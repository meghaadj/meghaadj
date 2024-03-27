const scrollToElementId = (id) => {
  const element = document.getElementById(id);

  if (!element) return;

  element.scrollIntoView({
    behavior: "smooth",
    block: "center",
    inline: "center",
  });
};

export default scrollToElementId;
