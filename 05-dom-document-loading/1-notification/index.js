export default class NotificationMessage {
  static instance;

  message;
  duration;
  type;
  element;
  notificationTimer;

  constructor(message, {duration = 1000, type = 'success'} = {}) {
    if (NotificationMessage.instance) {
      NotificationMessage.instance.update({message, duration, type});
      return NotificationMessage.instance;
    }

    this.update({message, duration, type});
    NotificationMessage.instance = this;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
  }

  update({message, duration, type}) {
    this.message = message;
    this.duration = duration;
    this.type = type;

    this.destroy();
    this.render();
  }

  get template() {
    return `
      <div class="${this.getClassNames()}" style="${this.getDuration()}">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">${this.type}</div>
          <div class="notification-body">
            ${this.message}
          </div>
        </div>
      </div>`;
  }

  getClassNames() {
    return `notification ${this.type}`;
  }

  getDuration() {
    const durationInSeconds = this.duration / 1000;
    return `--value:${durationInSeconds}s`;
  }

  show(parentNode) {
    (parentNode || document.body).append(this.element);

    this.notificationTimer = setTimeout(() => this.destroy(), this.duration);
  }

  remove() {
    clearTimeout(this.notificationTimer);
  }

  destroy() {
    this.remove();
    this.element?.remove();
  }
}
