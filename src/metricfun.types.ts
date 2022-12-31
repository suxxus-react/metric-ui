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

type ToggleDarkMode = {
  type: "ToggleDarkMode";
};

type Logged = {
  type: "IsLogged";
};

type None = {
  type: "None";
};
export type DispatchMsg = (msg: Msg) => Msg;

export type Msg =
  | Logged
  | ToggleDarkMode
  | DeleteMetric
  | ShowWarning
  | EditMetricName
  | UpdateMetricName
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
  isDeleted: boolean;
  isEditable: boolean;
  showWarning: boolean;
  metadata: Metadata;
  handleClick: DispatchMsg;
  handleOnChange: DispatchMsg;
};

export type State = {
  isDark: boolean;
  isLogged: boolean;
  userName: string;
  isEditable: boolean;
  //
  handleClick: DispatchMsg;
  // toggleEditable: () => void;
  // createNewMetric: () => void;
  // loginWithAccount: () => void;
};
