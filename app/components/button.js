import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { hbs } from 'ember-template-imports';
import { Loading } from 'ember-mdi';
import { on } from '@ember/modifier';
import eq from '../helpers/eq';

export const sizes = {
  sm: 'text-sm py-0.5',
  md: 'px-3 py-2',
  lg: 'px-4 py-3',
};

export const iconSizes = {
  sm: 18,
  md: 22,
  lg: 24,
};

export const styles = {
  default: 'border rounded',
  primary: 'border rounded text-primary border-primary',
};

export default class ButtonComponent extends Component {
  static template = hbs`
    <button
      disabled={{this.disabled}}
      type={{this.type}}
      class="
        inline-flex items-center justify-center w-24 min-w-min
        {{get sizes this.size}}
        {{get styles this.style}}
      "
      ...attributes
      {{on 'click' this.handleClick}}
    >
      {{#if this.isPending}}
        <Loading @spin={{true}} @size={{get iconSizes this.size}} />
      {{else if @icon}}
        <@icon @size={{get iconSizes this.size}} />
      {{/if}}
      {{#if this.text}}
        {{this.text}}
      {{/if}}
    </button>
  `;

  @tracked _state = 'default';

  get style() {
    return this.args.style ?? 'default';
  }

  get size() {
    return this.args.size ?? 'md';
  }

  get isActive() {
    return (
      this.args.group &&
      this.args.value &&
      this.args.group.args.value === this.args.value
    );
  }

  get disabled() {
    if (this.args.disabled !== undefined) {
      return this.args.disabled;
    }

    return this.isPending;
  }

  get type() {
    return this.args.type ?? 'button';
  }

  get state() {
    return this.args.state ?? this._state;
  }
  set state(state) {
    this._state = state;
  }

  get isPending() {
    return this.state === 'pending';
  }

  get isFulfilled() {
    return this.state === 'fulfilled';
  }

  get isRejected() {
    return this.state === 'rejected';
  }

  get isSettled() {
    return this.isFulfilled || this.isRejected;
  }

  get text() {
    return this.args[`${this.state}Text`] ?? this.args.text;
  }

  @action
  async handleClick(event) {
    if (typeof this.args.onClick !== 'function') {
      return;
    }

    event.preventDefault();

    try {
      const maybePromise = this.args.onClick(this.args.value);

      if (typeof maybePromise?.then === 'function') {
        this.state = 'pending';

        await maybePromise;

        if (!this.isDestroyed) {
          this.state = 'fulfilled';
        }
      }
    } catch (error) {
      if (!this.isDestroyed) {
        this.state = 'rejected';
      }

      throw error;
    }
  }
}
