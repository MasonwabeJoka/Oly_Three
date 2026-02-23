import dynamic from "next/dynamic";

type Tab =
  | {
      title: string;
      count?: number;
    }
  | string;

type TabsProps = {
  activeTabIndex?: number;
  condition?: boolean;
  dashboard: boolean;
  count?: number;
  width: number;
  collageViewWidth?: number;
  tabs: Tab[];
  data?: any[];
  onClickHandlers?: ((event?: React.MouseEvent) => void)[];
};

const TabsClient = dynamic(() => import("./TabsClient"), { ssr: false });

const Tabs: React.FC<TabsProps> = ({
  condition,
  dashboard,
  width = 954,
  collageViewWidth = 988,
  tabs,
  data,
  onClickHandlers,
  activeTabIndex,
}) => {
  return (
    <TabsClient
      condition={condition}
      dashboard={dashboard}
      width={width}
      collageViewWidth={collageViewWidth}
      tabs={tabs}
      data={data}
      onClickHandlers={onClickHandlers}
      activeTabIndex={activeTabIndex}
    />
  );
};

export default Tabs;
