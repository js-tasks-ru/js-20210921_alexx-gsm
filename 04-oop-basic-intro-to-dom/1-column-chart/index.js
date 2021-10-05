export default class ColumnChart {
  chartData;
  chartHeight;
  element;

  constructor(chartData) {
    this.chartHeight = 50;
    this.initChart(chartData);
  }

  update(chartData) {
    this.initChart(chartData);
  }

  initChart(chartData) {
    this.chartData = chartData || {};
    this.render();
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.renderChart();
    this.element = wrapper.firstElementChild;
  }

  renderChart() {
    const isLoadling = !this.chartData?.data?.length;

    return `
      <div class="column-chart${isLoadling ? ' column-chart_loading' : ''}" style="--chart-height: ${this.chartHeight}">
        ${this.renderTitle()}
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.getTotalValue()}</div>
          <div data-element="body" class="column-chart__chart">
          ${this.renderChartBody()}
          </div>
        </div>
      </div>
    </div>`;
  }

  renderTitle() {
    return `
    <div class="column-chart__title">
      Total ${this.chartData?.label || ''}
      ${this.renderViewAllLink()}
    </div>`;
  }

  renderViewAllLink() {
    return this.chartData?.data?.length ? '' : `<a class="column-chart__link" href="${this.chartData?.link}">View all</a>`;
  }

  renderChartBody() {
    if (!this.chartData?.data?.length) {
      return this.renderSkeleton();
    }

    return this.getChartValues().map(this.renderChartElement.bind(this)).join('');
  }

  renderChartElement({percent, value}) {
    return `<div style="--value: ${value}" data-tooltip="${percent}"></div>`;
  }


  renderSkeleton() {
    return `
      <svg width="299" height="109" viewBox="0 0 299 109" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="147" height="24" fill="#F5F6F8"/>
        <rect y="59" width="9" height="50" fill="#ECEEF3"/>
        <rect x="10" y="74" width="9" height="35" fill="#ECEEF3"/>
        <rect x="20" y="87" width="9" height="22" fill="#ECEEF3"/>
        <rect x="30" y="70" width="9" height="39" fill="#ECEEF3"/>
        <rect x="40" y="87" width="9" height="22" fill="#ECEEF3"/>
        <rect x="50" y="79" width="9" height="30" fill="#ECEEF3"/>
        <rect x="60" y="70" width="9" height="39" fill="#ECEEF3"/>
        <rect x="70" y="59" width="9" height="50" fill="#ECEEF3"/>
        <rect x="90" y="87" width="9" height="22" fill="#ECEEF3"/>
        <rect x="100" y="79" width="9" height="30" fill="#ECEEF3"/>
        <rect x="110" y="74" width="9" height="35" fill="#ECEEF3"/>
        <rect x="120" y="98" width="9" height="11" fill="#ECEEF3"/>
        <rect x="130" y="59" width="9" height="50" fill="#ECEEF3"/>
        <rect x="140" y="98" width="9" height="11" fill="#ECEEF3"/>
        <rect x="150" y="70" width="9" height="39" fill="#ECEEF3"/>
        <rect x="160" y="79" width="9" height="30" fill="#ECEEF3"/>
        <rect x="170" y="87" width="9" height="22" fill="#ECEEF3"/>
        <rect x="180" y="74" width="9" height="35" fill="#ECEEF3"/>
        <rect x="190" y="79" width="9" height="30" fill="#ECEEF3"/>
        <rect x="200" y="98" width="9" height="11" fill="#ECEEF3"/>
        <rect x="210" y="70" width="9" height="39" fill="#ECEEF3"/>
        <rect x="220" y="74" width="9" height="35" fill="#ECEEF3"/>
        <rect x="230" y="64" width="9" height="45" fill="#ECEEF3"/>
        <rect x="240" y="79" width="9" height="30" fill="#ECEEF3"/>
        <rect x="250" y="98" width="9" height="11" fill="#ECEEF3"/>
        <rect x="260" y="79" width="9" height="30" fill="#ECEEF3"/>
        <rect x="270" y="98" width="9" height="11" fill="#ECEEF3"/>
        <rect x="280" y="74" width="9" height="35" fill="#ECEEF3"/>
        <rect x="290" y="92" width="9" height="17" fill="#ECEEF3"/>
        <rect x="80" y="98" width="9" height="11" fill="#ECEEF3"/>
      </svg>`;
  }

  destroy() {
    this.element = null;
  }

  remove() {
    this.element = null;
  }

  getTotalValue() {
    const {value, formatHeading} = this.chartData;

    return typeof formatHeading === 'function' ? formatHeading(new Intl.NumberFormat().format(value)) : value;
  }

  getChartValues() {
    const {data} = this.chartData;
    const maxValue = Math.max(...data);
    const k = this.chartHeight / maxValue;

    return data.map(value => ({
      percent: (value / maxValue * 100).toFixed(0) + '%',
      value: String(Math.floor(value * k))
    }));
  }
}
