import TabsClient from "./TabsClient";


type Tab =
  | {
      title: string;
      count?: number;
    }
  | string;

type TabsProps = {
  condition?: boolean;
  dashboard: boolean;
  count?: number;
  width: number;
  altWidth?: number;
  tabs: Tab[];
  data?: any[];
  onClickHandlers?: (
    | ((event?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
    | undefined
  )[];
};

const Tabs: React.FC<TabsProps> = ({
  condition,
  dashboard,
  width = 954,
  altWidth = 988,
  tabs,
  data,
  onClickHandlers,
}) => {
  return (
    <TabsClient
      condition={condition}
      dashboard={dashboard}
      width={width}
      altWidth={altWidth}
      tabs={tabs}
      data={data}
      onClickHandlers={onClickHandlers}
    />
  );
};

export default Tabs;