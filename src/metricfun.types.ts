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

export type ChartTypeSelected = "Pie" | "Line" | "Area" | "None";
type SelectChartType = {
  type: "SelectChartType";
  id: string;
  value: ChartTypeSelected;
};

// -- ---

type ToggleDarkMode = {
  type: "ToggleDarkMode";
};

type SocialNetwork = "Github"; // | Facebook ...
type LoginWithSocialNetwork = {
  type: "LoginWithSocialNetwork";
  value: SocialNetwork;
};

type Logged = {
  type: "IsLogged";
};

type Logout = {
  type: "Logout";
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
  | Logout
  | ToggleDarkMode
  | ToggleEditable
  | CreateNewMetric
  | DeleteMetric
  | ShowWarning
  | SelectChartType
  | EditMetricName
  | UpdateMetricName
  | UpdateMetric
  | None;

type PieChartDataSets = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
};

type LineChartDataSet = {
  fill: boolean;
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

type ChartDataSets = PieChartDataSets | LineChartDataSet;
export type ChartData = {
  labels: string[];
  datasets: ChartDataSets[];
};

export type ChartsData = {
  area: ChartData;
  line: ChartData;
  pie: ChartData;
};

type Metadata = {
  update: string;
  limit: string;
  resolution: string;
};

//
export type MetricUi = {
  id: string;
  name: string;
  isMetricNameEditable: boolean;
  isEditable: boolean;
  isSavingChanges: boolean;
  showWarning: boolean;
  showUpdateMetricChanges: boolean;
  hasOnSaveErrors: boolean;
  chartTypeSelected: ChartTypeSelected;
  chartsData: ChartsData;
  metadata: Metadata;
  dispatchMsg: DispatchMsg;
};

export interface IState {
  isDark: boolean;
  isLogged: boolean;
  userName: string;
  isEditable: boolean;
  metrics: MetricUi[];
}

export interface IProps extends IState {
  dispatchMsg: DispatchMsg;
}
