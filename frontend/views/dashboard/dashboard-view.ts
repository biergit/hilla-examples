import '@polymer/polymer';
import '@vaadin/board';
import '@vaadin/charts';
import '@vaadin/grid';
import { GridBodyRenderer, GridItemModel } from '@vaadin/grid';
import { GridColumn } from '@vaadin/grid/src/vaadin-grid-column';
import '@vaadin/horizontal-layout';
import '@vaadin/select';
import '@vaadin/icons';
import '@vaadin/vertical-layout';
import ChartSeries from 'Frontend/generated/com/example/application/views/dashboard/ChartSeries';
import PieSeries from 'Frontend/generated/com/example/application/views/dashboard/PieSeries';
import ServiceHealth from 'Frontend/generated/com/example/application/views/dashboard/ServiceHealth';
import Status from 'Frontend/generated/com/example/application/views/dashboard/ServiceHealth/Status';
import * as viewEndpoint from 'Frontend/generated/DashboardEndpoint';
import { html, render } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { View } from '../view';

@customElement('dashboard-view')
export class DashboardView extends View {
  @state()
  private currentUsers = '745';

  @state()
  private currentUsersChange = '+33.7%';

  @state()
  private viewEvents = '54.6k';

  @state()
  private viewEventsChange = '-112.45%';

  @state()
  private conversionRate = '18%';

  @state()
  private conversionRateChange = '+3.9%';

  @state()
  private customMetric = '-123.45';

  @state()
  private customMetricChange = '±0.0%';

  @state()
  private monthNames: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  @state()
  private statusColumnRenderer: GridBodyRenderer<ServiceHealth> = this.renderStatusColumn.bind(this);

  @state()
  private serviceHealthItems?: ReadonlyArray<ServiceHealth>;

  @state()
  private viewEventsSeries?: ReadonlyArray<ChartSeries>;

  @state()
  private responseTimesSeries?: ReadonlyArray<PieSeries>;

  render() {
    return html`
      <main>
        <vaadin-board>
          <vaadin-board-row>
            <vaadin-vertical-layout class="p-l">
              <h2 class="font-normal m-0 text-secondary text-xs">Current users</h2>
              <span class="font-semibold text-3xl">${this.currentUsers}</span>
              <span theme="badge success">
                <iron-icon class="box-border p-xs" icon="vaadin:arrow-up"></iron-icon>
                <span>${this.currentUsersChange}</span>
              </span>
            </vaadin-vertical-layout>
            <vaadin-vertical-layout class="p-l">
              <h2 class="font-normal m-0 text-secondary text-xs">View events</h2>
              <span class="text-3xl font-semibold">${this.viewEvents}</span>
              <span theme="badge error">
                <iron-icon class="box-border p-xs" icon="vaadin:arrow-down"></iron-icon>
                <span>${this.viewEventsChange}</span>
              </span>
            </vaadin-vertical-layout>
            <vaadin-vertical-layout class="p-l">
              <h2 class="font-normal m-0 text-secondary text-xs">Conversion rate</h2>
              <span class="text-3xl font-semibold">${this.conversionRate}</span>
              <span theme="badge success">
                <iron-icon class="box-border p-xs" icon="vaadin:arrow-up"></iron-icon>
                <span>${this.conversionRateChange}</span>
              </span>
            </vaadin-vertical-layout>
            <vaadin-vertical-layout class="p-l">
              <h2 class="font-normal m-0 text-secondary text-xs">Custom metric</h2>
              <span class="text-3xl font-semibold">${this.customMetric}</span>
              <span theme="badge">
                <iron-icon class="box-border p-xs" icon="vaadin:arrow-up"></iron-icon>
                <span>${this.customMetricChange}</span>
              </span>
            </vaadin-vertical-layout>
          </vaadin-board-row>
          <vaadin-board-row>
            <vaadin-vertical-layout class="p-l" theme="spacing-l">
              <vaadin-horizontal-layout class="justify-between w-full">
                <vaadin-vertical-layout>
                  <h2 class="text-xl m-0">View events</h2>
                  <span class="text-secondary text-xs">Cumulative (city/month)</span>
                </vaadin-vertical-layout>
                <!-- Needs aria-label -->
                <vaadin-select style="width: 100px;" value="2021">
                  <template>
                    <vaadin-list-box>
                      <vaadin-item>2019</vaadin-item>
                      <vaadin-item>2020</vaadin-item>
                      <vaadin-item>2021</vaadin-item>
                    </vaadin-list-box>
                  </template>
                </vaadin-select>
              </vaadin-horizontal-layout>
              ${this.viewEventsSeries &&
              html`
                <vaadin-chart
                  .additionalOptions=${{
                    xAxis: { crosshair: true },
                    yAxis: { min: 0 },
                    plotOptions: { series: { pointPlacement: 'on' } },
                  }}
                  .categories=${this.monthNames}
                  type="area"
                >
                  ${this.viewEventsSeries.map(
                    (viewEventSeries) =>
                      html`<vaadin-chart-series
                        .title=${viewEventSeries.name}
                        .values=${viewEventSeries.data}
                      ></vaadin-chart-series>`
                  )}
                </vaadin-chart>
              `}
            </vaadin-vertical-layout>
          </vaadin-board-row>
          <vaadin-board-row>
            <vaadin-vertical-layout class="p-l" theme="spacing-l">
              <vaadin-horizontal-layout>
                <vaadin-vertical-layout>
                  <h2 class="text-xl m-0">Service health</h2>
                  <span class="text-secondary text-xs">Input / output</span>
                </vaadin-vertical-layout>
              </vaadin-horizontal-layout>
              ${this.serviceHealthItems &&
              html`
                <vaadin-grid height-by-rows .items="${this.serviceHealthItems}" theme="no-border">
                  <vaadin-grid-column
                    auto-width
                    flex-grow="0"
                    header=""
                    .renderer=${this.statusColumnRenderer}
                  ></vaadin-grid-column>
                  <vaadin-grid-column flex-grow="1" header="City" path="city"></vaadin-grid-column>
                  <vaadin-grid-column auto-width flex-grow="0" header="Input" path="input"></vaadin-grid-column>
                  <vaadin-grid-column auto-width flex-grow="0" header="Output" path="output"></vaadin-grid-column>
                </vaadin-grid>
              `}
            </vaadin-vertical-layout>
            <vaadin-vertical-layout class="p-l" theme="spacing-l">
              <vaadin-horizontal-layout>
                <vaadin-vertical-layout>
                  <h2 class="text-xl m-0">Response times</h2>
                  <span class="text-secondary text-xs">Average across all systems</span>
                </vaadin-vertical-layout>
              </vaadin-horizontal-layout>
              ${this.responseTimesSeries &&
              html`
                <vaadin-chart type="pie">
                  <vaadin-chart-series title="Response times" .values=${this.responseTimesSeries}></vaadin-chart-series>
                </vaadin-chart>
              `}
            </vaadin-vertical-layout>
          </vaadin-board-row>
        </vaadin-board>
      </main>
    `;
  }

  renderStatusColumn(root: HTMLElement, _column: GridColumn, data: GridItemModel<ServiceHealth>) {
    const item: ServiceHealth = data!.item;
    const status = this.formatStatus(item.status);
    render(
      html`<span
        aria-label="Status: ${status}"
        theme=${this.getStatusTheme(item.status)}
        title="Status: ${status}"
      ></span>`,
      root
    );
  }

  formatStatus(status: Status): string {
    if (status == Status.OK) {
      return 'Ok';
    } else if (status == Status.EXCELLENT) {
      return 'Excellent';
    } else if (status == Status.FAILING) {
      return 'Failing';
    }
    return status;
  }

  getStatusTheme(status: Status): string {
    const theme = 'badge primary small';
    if (status === Status.FAILING) {
      return theme + ' error';
    }
    if (status === Status.EXCELLENT) {
      return theme + ' success';
    }
    return theme;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.serviceHealthItems = await viewEndpoint.serviceHealthItems();
    this.viewEventsSeries = await viewEndpoint.viewEventsSeries();
    this.responseTimesSeries = await viewEndpoint.responseTimesSeries();
  }
}
