function handleTabClicked(event) {
    const tabCategory = event.target.id;
    const content = document.querySelector(`.content.${tabCategory}`);
    const contents = document.querySelectorAll(`.content`);
    for (let current of contents) {
        if (current === content) {
            current.classList.add("active");
        } else {
            current.classList.remove("active");
        }
    }
    console.log(content)
}


