type DeleteMetric = {
  type: "DeleteMetric";
  id: string;
};
type RequestMetricDeletion = {
  type: "RequestMetricDeletion";
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

type SaveMetricChanges = {
  type: "SaveMetricChanges";
  id: string;
  value: boolean;
};

type UpdateMetric = {
  type: "UpdateMetric";
  id: string;
};

type MetricUpdated = {
  type: "MetricUpdated";
  id: string;
};

type NewMetricUpdated = {
  type: "NewMetricUpdated";
  id: string;
  value: MetricData;
};

type MetricDeleted = {
  type: "MetricDeleted";
  id: string;
};

type CreateMetric = {
  type: "CreateMetric";
  id: string;
  value: { name: string; chartTypeSelected: ChartTypeSelected };
};

type ShowMetricUiErrors = {
  type: "ShowMetricUiErrors";
  id: string;
  value: IMetricUi;
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
  value: string;
};

type Logout = {
  type: "Logout";
};

type UpdateMetricList = {
  type: "UpdateMetricList";
  value: IMetricUi[];
};

type ToggleEditable = {
  type: "ToggleEditable";
};

type CreateNewMetricUi = {
  type: "CreateNewMetricUi";
};

type PathUrl = {
  url: string;
};

type NavigeteTo = {
  type: "NavigeteTo";
  value: PathUrl;
};

type None = {
  type: "None";
};

export type DispatchMsg = (msg: Msg) => void;

export type Msg =
  | LoginWithSocialNetwork
  | Logged
  | Logout
  | ToggleDarkMode
  | ToggleEditable
  | CreateNewMetricUi
  | ShowMetricUiErrors
  | DeleteMetric
  | RequestMetricDeletion
  | SelectChartType
  | EditMetricName
  | UpdateMetricName
  | SaveMetricChanges
  | UpdateMetric
  | MetricUpdated
  | UpdateMetricList
  | CreateMetric
  | MetricDeleted
  | NewMetricUpdated
  | NavigeteTo
  | None;

// ========================
// from service
export enum Status {
  nothing = "",
  Ok = "200",
  Conflict = "409",
  Created = "201",
  BadRequest = "400",
}

export type MetricDataSet = {
  label?: string;
  data: number[];
};

export type MetricDataChart = {
  datasets: MetricDataSet[];
  labels?: string[];
};

export type MetricData = {
  id: string;
  name: string;
  chartType: string;
  chartData: MetricDataChart;
  metadata?: Metadata;
};

export type UserDataDecoded = {
  id: number;
  metrics: MetricData[];
};

// end of types used to decode json userData
// -------------------------------------------------
//
export type PieChartDataSets = {
  label: string;
  data: number[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
};

export type LineChartDataSet = {
  fill: boolean;
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
};

export type ChartDataSets = PieChartDataSets | LineChartDataSet;

export type ChartData = {
  labels: string[];
  datasets: ChartDataSets[];
};

export type ChartsData = {
  area: ChartData;
  line: ChartData;
  pie: ChartData;
};

export type Metadata = {
  update?: string;
  limit?: string;
  resolution?: string;
};

type MetricErrorTypes = {
  nameLength: boolean;
  nameEquals: boolean;
  noChartSelected: boolean;
};

type MetricUpdatedData = {
  id: string;
  name: string;
  chartType: ChartTypeSelected;
};

export type MetricId = { id: string };

export interface IMetricUi {
  id: string;
  previousName: string;
  name: string;
  isNewMetric: boolean;
  isMetricNameEditable: boolean;
  isEditable: boolean;
  isSavingChanges: boolean;
  requestMetricDeletion: boolean;
  showMetricSaveCancelCtrls: boolean;
  isValid: boolean;
  errorTypes: MetricErrorTypes;
  previousChartTypeSelected: ChartTypeSelected;
  chartTypeSelected: ChartTypeSelected;
  chartsData: ChartsData;
  metadata: Metadata;
}

export interface IMetricUiCtrls extends IMetricUi {
  dispatchMsg: DispatchMsg;
}

export interface IState {
  isDark: boolean;
  isLogged: boolean;
  userName: string;
  id: number;
  isEditable: boolean;
  updateMetricChanges: MetricUpdatedData;
  saveNewMetricChanges: MetricUpdatedData;
  deleteMetric: MetricId;
  metrics: IMetricUi[];
  navigateTo: PathUrl;
}

export interface IProps extends IState {
  dispatchMsg: DispatchMsg;
}
