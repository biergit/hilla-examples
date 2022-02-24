import { Binder, field, StringModel } from '@hilla/form';
import { BinderNode } from '@hilla/form/BinderNode';
import { EndpointError } from '@hilla/frontend';
import '@polymer/iron-icon';
import '@vaadin/button';
import '@vaadin/date-picker';
import '@vaadin/date-time-picker';
import '@vaadin/form-layout';
import '@vaadin/grid';
import { Grid, GridDataProviderCallback, GridDataProviderParams } from '@vaadin/grid';
import '@vaadin/grid/vaadin-grid-sort-column';
import '@vaadin/horizontal-layout';
import '@vaadin/notification';
import { Notification } from '@vaadin/notification';
import '@vaadin/polymer-legacy-adapter';
import '@vaadin/split-layout';
import '@vaadin/text-field';
import '@vaadin/upload';
import { Upload, UploadFile } from '@vaadin/upload';
import '@vaadin/vaadin-icons';
import SampleBook from 'Frontend/generated/com/example/application/data/entity/SampleBook';
import SampleBookModel from 'Frontend/generated/com/example/application/data/entity/SampleBookModel';
import Sort from 'Frontend/generated/dev/hilla/mappedtypes/Sort';
import Direction from 'Frontend/generated/org/springframework/data/domain/Sort/Direction';
import * as SampleBookEndpoint from 'Frontend/generated/SampleBookEndpoint';
import { html } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { View } from '../view';

@customElement('master-detail-book-view')
export class MasterDetailBookView extends View {
  @query('#grid')
  private grid!: Grid;

  @property({ type: Number })
  private gridSize = 0;

  private gridDataProvider = this.getGridData.bind(this);

  private binder = new Binder<SampleBook, SampleBookModel>(this, SampleBookModel);

  render() {
    return html`
      <vaadin-split-layout class="w-full h-full">
        <div class="flex-grow w-full">
          <vaadin-grid
            id="grid"
            class="w-full h-full"
            theme="no-border"
            .size=${this.gridSize}
            .dataProvider=${this.gridDataProvider}
            @active-item-changed=${this.itemSelected}
          >
            <vaadin-grid-column width="68px" flex-grow="0" path="image"
              ><template><img style="height: 64px" src="[[item.image]]" /></template
            ></vaadin-grid-column>
            <vaadin-grid-sort-column auto-width path="name"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="author"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="publicationDate"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="pages"></vaadin-grid-sort-column>
            <vaadin-grid-sort-column auto-width path="isbn"></vaadin-grid-sort-column>
          </vaadin-grid>
        </div>
        <div class="flex flex-col" style="width: 400px;">
          <div class="p-l flex-grow">
            <vaadin-form-layout
              ><label>Image</label>
              <vaadin-upload
                accept="image/*"
                max-files="1"
                style="box-sizing: border-box"
                id="image"
                @upload-request="${(e: CustomEvent) =>
                  this.handleImageUpload(e, this.binder.for(this.binder.model.image))}"
                ><img
                  class="w-full"
                  ?hidden="${!this.binder.value.image}"
                  src="${this.binder.value.image}"
                /> </vaadin-upload
              ><vaadin-text-field label="Name" id="name" ${field(this.binder.model.name)}></vaadin-text-field
              ><vaadin-text-field label="Author" id="author" ${field(this.binder.model.author)}></vaadin-text-field
              ><vaadin-date-picker
                label="Publication date"
                id="publicationDate"
                ${field(this.binder.model.publicationDate)}
              ></vaadin-date-picker
              ><vaadin-text-field label="Pages" id="pages" ${field(this.binder.model.pages)}></vaadin-text-field
              ><vaadin-text-field label="Isbn" id="isbn" ${field(this.binder.model.isbn)}></vaadin-text-field
            ></vaadin-form-layout>
          </div>
          <vaadin-horizontal-layout class="w-full flex-wrap bg-contrast-5 py-s px-l" theme="spacing">
            <vaadin-button theme="primary" @click=${this.save}>Save</vaadin-button>
            <vaadin-button theme="tertiary" @click=${this.cancel}>Cancel</vaadin-button>
          </vaadin-horizontal-layout>
        </div>
      </vaadin-split-layout>
    `;
  }

  private async getGridData(
    params: GridDataProviderParams<SampleBook>,
    callback: GridDataProviderCallback<SampleBook | undefined>
  ) {
    const sort: Sort = {
      orders: params.sortOrders.map((order) => ({
        property: order.path,
        direction: order.direction == 'asc' ? Direction.ASC : Direction.DESC,
        ignoreCase: false,
      })),
    };
    const data = await SampleBookEndpoint.list({ pageNumber: params.page, pageSize: params.pageSize, sort });
    callback(data);
  }

  async connectedCallback() {
    super.connectedCallback();
    this.classList.add('flex', 'flex-col', 'h-full');
    this.gridSize = (await SampleBookEndpoint.count()) ?? 0;
  }

  private async itemSelected(event: CustomEvent) {
    const item: SampleBook = event.detail.value as SampleBook;
    this.grid.selectedItems = item ? [item] : [];

    if (item) {
      const fromBackend = await SampleBookEndpoint.get(item.id!);
      fromBackend ? this.binder.read(fromBackend) : this.refreshGrid();
    } else {
      this.clearForm();
    }
  }

  private async handleImageUpload(e: CustomEvent, binderNode: BinderNode<string, StringModel>) {
    e.preventDefault();
    const upload: Upload = e.target as Upload;
    const file: UploadFile = e.detail.file;
    binderNode.value = window.URL.createObjectURL(file);
    await this.requestUpdate('binder');
    upload.files = [];
  }

  private async save() {
    try {
      const isNew = !this.binder.value.id;
      await this.binder.submitTo(SampleBookEndpoint.update);
      if (isNew) {
        // We added a new item
        this.gridSize++;
      }
      this.clearForm();
      this.refreshGrid();
      Notification.show(`SampleBook details stored.`, { position: 'bottom-start' });
    } catch (error: any) {
      if (error instanceof EndpointError) {
        Notification.show(`Server error. ${error.message}`, { theme: 'error', position: 'bottom-start' });
      } else {
        throw error;
      }
    }
  }

  private cancel() {
    this.grid.activeItem = undefined;
  }

  private clearForm() {
    this.binder.clear();
  }

  private refreshGrid() {
    this.grid.selectedItems = [];
    this.grid.clearCache();
  }
}
