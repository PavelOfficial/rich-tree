import { action, computed, observable } from 'mobx';

import { VirtualScrollStoreOptions } from './types';

export class VirtualScrollStore {
  @observable
  scrollAreaHeight: number;

  @observable
  scrollPosition: number;

  @observable
  itemHeight: number;

  @observable
  itemsTotal: number;

  constructor(options: VirtualScrollStoreOptions) {
    this.scrollAreaHeight = 0;
    this.itemHeight = options.itemHeight ?? 0;
    this.scrollPosition = 0;
    this.itemsTotal = options.itemsTotal;
  }

  @action
  setScrollAreaHeight(height: number) {
    this.scrollAreaHeight = height;
  }

  @action
  setScrollPosition(scrollPosition: number) {
    this.scrollPosition = scrollPosition;
  }

  @action
  setItemHeight(itemHeight: number) {
    this.itemHeight = itemHeight;
  }

  @action
  setItemsTotal(itemsTotal: number) {
    this.itemsTotal = itemsTotal;
  }

  @computed
  get from() {
    return Math.floor(this.scrollPosition / this.itemHeight);
  }

  @computed
  get to() {
    const to = this.from + Math.ceil(this.scrollAreaHeight / this.itemHeight) + 1;

    return Math.min(to, this.itemsTotal);
  }

  @computed
  get range() {
    return {
      from: this.from,
      to: this.to,
    };
  }

  @computed
  get contentHeight() {
    return this.itemsTotal * this.itemHeight;
  }

  @computed
  get pads() {
    const paddingBottom = this.contentHeight - (this.range.to + 1) * this.itemHeight;
    return {
      paddingTop: this.range.from * this.itemHeight,
      paddingBottom: Math.max(0, paddingBottom),
    };
  }
}
