export default class NotificationMessage {
  message;
  duration;
  type;

  constructor(message, {duration, type} = {}) {
    this.message = message;
    this.duration = duration || 1000;
    this.type = type || 'success';

    this.render();

    this.show = this.show.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.renderNotification();
    this.element = wrapper.firstElementChild;
  }

  renderNotification() {
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
    if (window.notificationTimer) {
      this.destroy();
    }

    if (parentNode) {
      parentNode.append(this.element);
    } else {
      document.body.append(this.element);
    }

    window.notificationTimer = setTimeout(() => this.destroy(), this.duration);
  }

  remove() {
    clearTimeout(window.notificationTimer);
    document.querySelector('.notification')?.remove();
  }

  destroy() {
    this.remove();
    document.querySelector('.notification')?.remove();
  }
}
