import { IState, IMetricUi, Msg } from "./metricfun.types";
import {
  updateMetricUiData,
  getDefaultMetricUiData,
  validateMetricUserInputs,
} from "./metricDataHelpers";

export function getInitialState(): IState {
  return {
    id: 0,
    isDark: false,
    isLogged: false,
    userName: "",
    isEditable: false,
    deleteMetric: { id: "" },
    updateMetricChanges: {
      id: "",
      name: "",
      chartType: "None",
    },
    saveNewMetricChanges: {
      id: "",
      name: "",
      chartType: "None",
    },
    navigateTo: { url: "" },
    metrics: [],
  };
}

export function metricsReducer(msg: Msg) {
  return (metric: IMetricUi): IMetricUi => {
    switch (msg.type) {
      case "ToggleEditable":
        return {
          ...metric,
          isEditable: !metric.isEditable,
          name: metric.previousName,
          chartTypeSelected: metric.previousChartTypeSelected,
          isMetricNameEditable: false,
          requestMetricDeletion: false,
          showMetricSaveCancelCtrls: false,
        };
      case "RequestMetricDeletion":
        return metric.id === msg.id
          ? { ...metric, requestMetricDeletion: !metric.requestMetricDeletion }
          : metric;
      case "EditMetricName":
        return metric.id === msg.id
          ? {
              ...metric,
              isMetricNameEditable: !metric.isMetricNameEditable,
              showMetricSaveCancelCtrls: true,
            }
          : metric;
      case "UpdateMetricName":
        return metric.id === msg.id ? { ...metric, name: msg.value } : metric;
      case "SelectChartType":
        return metric.id === msg.id
          ? {
              ...metric,
              chartTypeSelected: msg.value,
              showMetricSaveCancelCtrls: true,
            }
          : metric;
      case "SaveMetricChanges":
        // cancelled by the user, reset values
        return metric.id === msg.id
          ? {
              ...metric,
              name: metric.previousName,
              chartTypeSelected: metric.previousChartTypeSelected,
              isMetricNameEditable: false,
              showMetricSaveCancelCtrls: false,
              errorTypes: {
                nameLength: false,
                nameEquals: false,
                noChartSelected: false,
              },
            }
          : metric;
      case "ShowMetricUiErrors":
        return metric.id === msg.id ? msg.value : metric;
      // -- with service
      case "CreateMetric":
      case "UpdateMetric":
      case "DeleteMetric":
        return metric.id === msg.id
          ? {
              ...metric,
              isSavingChanges: true,
              isMetricNameEditable: false,
              showMetricSaveCancelCtrls: false,
              requestMetricDeletion: false,
            }
          : metric;
      case "MetricUpdated":
        return metric.id === msg.id
          ? {
              ...metric,
              isValid: false,
              previousName: metric.name,
              previousChartTypeSelected: metric.chartTypeSelected,
              isSavingChanges: false,
              errorTypes: {
                nameLength: false,
                nameEquals: false,
                noChartSelected: false,
              },
            }
          : metric;
      case "NewMetricUpdated":
        return metric.id === msg.id
          ? {
              ...metric,
              ...updateMetricUiData(msg.value),
              isEditable: true,
            }
          : metric;
      case "None":
        return metric;
      default:
        return metric;
    }
  };
}

export function stateReducer(state: IState, msg: Msg): IState {
  console.info("reducer - msg ", msg);
  switch (msg.type) {
    case "LoginWithSocialNetwork":
      // TODO should be updated when real login is done
      // for now, just set the state with a fake user
      return { ...state, id: 120034, isLogged: true, userName: "Alice" };
    case "NavigeteTo":
      return { ...state, navigateTo: msg.value };
    case "Logout":
      return {
        ...getInitialState(),
      };
    case "ToggleDarkMode":
      return { ...state, isDark: !state.isDark };
    case "UpdateMetricList":
      // when we get the user metrics list
      // from Service
      return {
        ...state,
        metrics: msg.value,
      };
    case "ToggleEditable":
      return {
        ...state,
        isEditable: !state.isEditable,
        metrics: state.metrics
          .filter(({ isNewMetric }) => !isNewMetric)
          .map(metricsReducer(msg)),
      };
    case "CreateNewMetricUi":
      // show a new metric box
      return {
        ...state,
        metrics: [getDefaultMetricUiData(), ...state.metrics],
      };
    case "RequestMetricDeletion":
    case "EditMetricName":
    case "UpdateMetricName":
    case "SelectChartType":
    case "MetricUpdated":
    case "NewMetricUpdated":
      return {
        ...state,
        updateMetricChanges: {
          name: "",
          id: "",
          chartType: "None",
        },
        saveNewMetricChanges: {
          name: "",
          id: "",
          chartType: "None",
        },
        metrics: state.metrics.map(metricsReducer(msg)),
      };
    case "SaveMetricChanges":
      const cancelled = !msg.value;
      if (cancelled) {
        return {
          ...state,
          metrics: state.metrics.map(metricsReducer(msg)),
        };
      } else {
        // should validate metric
        const metric: IMetricUi = validateMetricUserInputs(
          state.metrics.find((metric) => metric.id === msg.id) ||
            getDefaultMetricUiData()
        );

        if (metric.isValid) {
          const property = metric.isNewMetric
            ? "saveNewMetricChanges"
            : "updateMetricChanges";
          // use Api service to update metric changes
          return {
            ...state,
            metrics: state.metrics.map(
              metricsReducer({ type: "UpdateMetric", id: metric.id })
            ),
            [property]: {
              id: metric.id,
              name: metric.name,
              chartType: metric.chartTypeSelected,
            },
          };
        }
        // show metric errors
        return {
          ...state,
          metrics: state.metrics.map(
            metricsReducer({
              type: "ShowMetricUiErrors",
              id: metric.id,
              value: metric,
            })
          ),
        };
      }
    case "MetricDeleted":
      // remove metric from the list
      return {
        ...state,
        metrics: state.metrics.filter(({ id }) => id !== msg.id),
      };
    case "CreateMetric":
      // submit metric changes to the service
      return {
        ...state,
        metrics: state.metrics.map(metricsReducer(msg)),
      };
    case "DeleteMetric":
      // when the user delete a metric
      const metricFromList: IMetricUi =
        state.metrics.find(({ id }) => id === msg.id) ||
        getDefaultMetricUiData();

      if (metricFromList.isNewMetric) {
        // we do not need to comunicate this to the service
        // so we just delete it from the metrics list
        return {
          ...state,
          metrics: state.metrics.filter(({ id }) => id !== msg.id),
        };
      } else {
        // we need DELETE using the Api
        return {
          ...state,
          deleteMetric: { id: msg.id },
          metrics: state.metrics.map(metricsReducer(msg)),
        };
      }
    case "None":
      return state;
  }
  //
  return state;
}
