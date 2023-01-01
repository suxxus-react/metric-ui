type DeleteMetric = {
  type: "DeleteMetric";
  id: string;
};
type ShowWarning = {
  type: "ToggleShowWarning";
  id: string;
};

type EditMetricName = {
  type: "EditMetricName";
  id: string;
};

type UpdateMetricName = {
  type: "UpdateMetricName";
  id: string;
  value: string;
};
type RenameMetric = {
  type: "RenameMetric";
  id: string;
};

export type ChartTypeSelected = "Pie" | "Line" | "Area" | "None";
type SelectChartType = {
  type: "SelectChartType";
  id: string;
  chartType: ChartTypeSelected;
};

// -- ---

type ToggleDarkMode = {
  type: "ToggleDarkMode";
};

type LoginWithSocialNetwork = {
  type: "LoginWithSocialNetwork";
  value: string;
};

type Logged = {
  type: "IsLogged";
};

type ToggleEditable = {
  type: "ToggleEditable";
};

type CreateNewMetric = {
  type: "CreateNewMetric";
};

type UpdateMetric = {
  type: "UpdateMetric";
  value: boolean;
};

type None = {
  type: "None";
};

export type DispatchMsg = (msg: Msg) => Msg;

export type Msg =
  | LoginWithSocialNetwork
  | Logged
  | ToggleDarkMode
  | ToggleEditable
  | CreateNewMetric
  | DeleteMetric
  | ShowWarning
  | SelectChartType
  | EditMetricName
  | UpdateMetricName
  | UpdateMetric
  | RenameMetric
  | None;

type Metadata = {
  update: string;
  limit: string;
  resolution: string;
};

export type MetricUi = {
  id: string;
  name: string;
  isMetricNameEditable: boolean;
  isEditable: boolean;
  showWarning: boolean;
  showUpdateMetricChanges: boolean;
  chartTypeSelected: ChartTypeSelected;
  metadata: Metadata;
  handleClick: DispatchMsg;
  handleOnChange: DispatchMsg;
};

export interface IState {
  isDark: boolean;
  isLogged: boolean;
  userName: string;
  isEditable: boolean;
}

export interface IProps extends IState {
  handleClick: DispatchMsg;
  handleOnChange: DispatchMsg;
}
