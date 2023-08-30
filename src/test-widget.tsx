import {
  property,
  subclass,
} from "@arcgis/core/core/accessorSupport/decorators";
import { tsx } from "@arcgis/core/widgets/support/widget";
import Widget from "@arcgis/core/widgets/Widget";

const CSS = {
  base: "redline-widget esri-widget--panel esri-widget",
  button: "btn btn-white btn-sm btn-primary pull-right",
  loading: "esri-icon-loading-indicator esri-rotating",
};

@subclass("app.TestWidget")
class Test extends Widget {
  constructor() {
    super();

    setInterval(() => {
      this.processing = !this.processing;
    }, 5000);
  }

  @property()
  processing = false;

  render() {
    return <div class={CSS.base}>{this.processing ? "True" : "False"}</div>;
  }
}

export default Test;
