export default function scrollToId(id, className = null, timeOut = null) {
    const currentStepElement = document.getElementById(id);
    if (currentStepElement) {
        currentStepElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        if (className) {
            currentStepElement.classList.add(className);
            if (timeOut) {
                setTimeout(_ => {
                    currentStepElement.classList.remove(className);
                }, timeOut)
            }
        }
    }
}
