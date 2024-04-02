import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

interface TabItem {
    label: string;
    component: JSX.Element;
}

interface TabsComponentProps {
    tabs: TabItem[];
}

export const TabsComponent = ({ tabs }: TabsComponentProps) => {
    if (tabs.length === 0) {
        return null;
    }

    return (
        <Tabs align="center" isFitted>
            <TabList width="100%">
                {tabs.map((tab, index) => (
                    <Tab key={index} textAlign="center" borderRadius={"md"}>
                        {tab.label}
                    </Tab>
                ))}
            </TabList>
            <TabPanels>
                {tabs.map((tab, index) => (
                    <TabPanel p={0} mt={6} key={index}>
                        {tab.component}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
};
