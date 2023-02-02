import { FilterType, UpdateType } from '../const.js';
import { remove, render, replace } from '../framework/render';
import { filterTypeToFilter } from '../utils/filter.js';
import FilterView from '../view/filter-view';


export default class FilterPresenter {
  #container = null;
  #filterModel = null;
  #pointsModel = null;

  #filterView = null;

  constructor({ container, filterModel, pointsModel }) {
    this.#container = container;
    this.#filterModel = filterModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FilterType.EVERYTHING,
        name: 'everything',
        count: points.length
      },
      {
        type: FilterType.FUTURE,
        name: 'future',
        count: filterTypeToFilter[FilterType.FUTURE](points).length
      }
    ];
  }

  init() {
    const filters = this.filters;
    const prevFilterView = this.#filterView;

    this.#filterView = new FilterView({
      filters,
      currentFilterType: this.#filterModel.filter,
      onFilterTypeChange: this.#handleFilterTypeChange
    });

    if (prevFilterView === null) {
      render(this.#filterView, this.#container);
      return;
    }

    replace(this.#filterView, prevFilterView);
    remove(prevFilterView);
  }

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
