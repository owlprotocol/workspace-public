import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button, HStack } from "@chakra-ui/react";

export default {
    title: "Atoms/Button",
    component: Button,
    argTypes: {
        variant: {
            options: ["", "form", "hollow", "cancel"],
            control: { type: "select" },
        },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args: any) => (
    <HStack>
        <Button>Regular Button</Button>
        <Button {...args}>Variants Button</Button>
    </HStack>
);
export const Main = Template.bind({});

Main.args = {
    variant: "form",
    disabled: false,
};
