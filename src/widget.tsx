import {
  subclass,
  property,
} from "@arcgis/core/core/accessorSupport/decorators";
import Widget from "@arcgis/core/widgets/Widget";
import { init } from "@arcgis/core/core/watchUtils";

import { tsx } from "@arcgis/core/widgets/support/widget";

import Point from "@arcgis/core/geometry/Point";
import MapView from "@arcgis/core/views/MapView";

type Coordinates = Point | number[] | any;

interface Center {
  x: number;
  y: number;
}

interface State extends Center {
  interacting: boolean;
  scale: number;
}

interface Style {
  textShadow: string;
}

const CSS = {
  base: "recenter-tool",
};

interface RecenterParams extends __esri.WidgetProperties {
  view: MapView;
  initialCenter: number[];
}

@subclass("app.widgets.Recenter")
class Recenter extends Widget {
  constructor(params?: RecenterParams) {
    super(params);
    this._onViewChange = this._onViewChange.bind(this);
  }

  postInitialize() {
    init(this, "view.center, view.interacting, view.scale", () =>
      this._onViewChange()
    );
  }

  //--------------------------------------------------------------------
  //
  //  Properties
  //
  //--------------------------------------------------------------------
  //----------------------------------
  //  view
  //----------------------------------

  @property()
  view!: MapView;

  //----------------------------------
  //  initialCenter
  //----------------------------------

  initialCenter: Coordinates;

  //----------------------------------
  //  state
  //----------------------------------

  @property()
  state!: State;

  //-------------------------------------------------------------------
  //
  //  Public methods
  //
  //-------------------------------------------------------------------

  render() {
    const { x, y, scale } = this.state;
    const styles: Style = {
      textShadow: this.state.interacting
        ? "-1px 0 red, 0 1px red, 1px 0 red, 0 -1px red"
        : "",
    };
    return (
      <div
        bind={this}
        class={CSS.base}
        styles={styles}
        onclick={this._defaultCenter}
      >
        <p>x: {Number(x).toFixed(3)}</p>
        <p>y: {Number(y).toFixed(3)}</p>
        <p>scale: {Number(scale).toFixed(5)}</p>
      </div>
    );
  }

  //-------------------------------------------------------------------
  //
  //  Private methods
  //
  //-------------------------------------------------------------------

  private _onViewChange() {
    let { interacting, center, scale } = this.view;
    this.state = {
      x: center.x,
      y: center.y,
      interacting,
      scale,
    };
  }

  private _defaultCenter() {
    this.view.goTo(this.initialCenter);
  }
}

export default Recenter;
