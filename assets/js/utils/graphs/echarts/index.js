import * as echarts from "echarts/core";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
} from "echarts/components";
// Features like Universal Transition and Label Layout
import { LabelLayout, UniversalTransition } from "echarts/features";
// Import the Canvas renderer
// Note that introducing the CanvasRenderer or SVGRenderer is a required step
import { CanvasRenderer } from "echarts/renderers";

// Register the required components
echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
  ToolboxComponent,
  DataZoomComponent,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

function render(target, option) {
  const theme =
    document.documentElement.getAttribute("data-bs-theme") === "dark" ? "dark" : null;
  const chart = echarts.init(target, theme);

  // https://echarts.apache.org/en/api.html#echartsInstance.setOption
  // https://github.com/apache/echarts/issues/6202#issuecomment-315054637
  // https://stackoverflow.com/a/72211534
  chart.setOption({ backgroundColor: "transparent", ...option }, true);

  return chart;
}

export function embed(target, option) {
  let chart = render(target, option);

  new MutationObserver(() => {
    chart.dispose();
    chart = render(target, option);
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-bs-theme"],
  });

  window.addEventListener("resize", () => {
    if (chart) {
      chart.resize();
    }
  });
}
