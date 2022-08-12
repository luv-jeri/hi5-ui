import React, { useContext, createContext, useState } from 'react';
import {
  Modal,
  Title,
  Stack,
  Space,
  Group,
  ColorSwatch,
  Tabs,
  useMantineTheme,
  Radio,
  Text,
  Divider,
  Slider,
  ActionIcon,
} from '@mantine/core';
import {
  IconTypography,
  IconMessageCircle,
  IconSettings,
  IconPalette,
  IconSun,
  IconMoonStars,
} from '@tabler/icons';
import useTheme from '../../config/Theme';
import './Customization.css';

export const CustomizationModalContext = createContext();

const useCustomizationModal = () => {
  return useContext(CustomizationModalContext);
};

const FontSizeSlider = ({ size, key }) => {
  const { changeFontSize } = useTheme();

  const theme = useMantineTheme();

  
  return (
    <div
      key={key}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Title
        order={5}
        style={{
          minWidth: '50px',
        }}
      >
        {size}
      </Title>
      <Slider
        style={{
          flex: 1,
          marginLeft: '10px',
        }}
        value={theme.fontSizes[size]}
        onChange={(value) => changeFontSize(size, value)}
        marks={[{ value: 20 }, { value: 50 }, { value: 80 }]}
      />
    </div>
  );
};

export function CustomizationModalProvider({ children }, ref) {
  const [opened, setOpened] = useState(false);
  const { updateTheme, changeFont } = useTheme();
  const theme = useMantineTheme();

  const swatches = Object.keys(theme.colors).map((color) => (
    <ColorSwatch
      style={{
        cursor: 'pointer',
      }}
      key={color}
      color={theme.colors[color][6]}
      onClick={() => {
        console.log(color);
        updateTheme('primaryColor', color);

        // setOpened(false);
      }}
    />
  ));

  const handleCustomizationModalOpen = () => {
    setOpened(true);
  };

  const value = {
    handleCustomizationModalOpen,
    opened,
    setOpened,
  };
  const fontSizes = ['xs', 'sm', 'md', 'lg', 'xl'];

  return (
    <CustomizationModalContext.Provider value={value}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={<Title order={3}>Customization</Title>}
        size='xl'
      >
        <Stack
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            borderRadius: theme.radius.md,
            justifyContent: 'space-evenly',
            padding: theme.spacing.md,
          })}
        >
          <Tabs defaultValue='colors'>
            <Tabs.List>
              <Tabs.Tab value='colors' icon={<IconPalette size={14} />}>
                Colors
              </Tabs.Tab>

              <Tabs.Tab value='fonts' icon={<IconTypography size={14} />}>
                Fonts
              </Tabs.Tab>

              <Tabs.Tab value='variants' icon={<IconSettings size={14} />}>
                Variants
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='colors' pt='xs'>
              <Title order={5}>Select your favorite Color.</Title>
              <Space h='md' />

              <Group position='center' spacing='xs'>
                {swatches}
              </Group>

              <Divider my='sm' />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {' '}
                <Title order={5}>Dark/Light</Title>
                <Space h='xs' />
                <ActionIcon
                  variant='outline'
                  color={theme.colorScheme === 'dark' ? 'yellow' : 'blue'}
                  onClick={() => {
                    updateTheme(
                      'colorScheme',
                      theme.colorScheme === 'dark' ? 'light' : 'dark'
                    );
                  }}
                  size='lg'
                  title='Toggle color scheme'
                >
                  {theme.colorScheme === 'dark' ? (
                    <IconSun size={18} />
                  ) : (
                    <IconMoonStars size={18} />
                  )}
                </ActionIcon>
              </div>
            </Tabs.Panel>

            <Tabs.Panel value='fonts' pt='xs'>
              <Title order={5}>Select your favorite font.</Title>

              <Radio.Group name='font' value={theme.fontFamily} onChange={changeFont}>
                <Radio
                  value='Poppins'
                  label={
                    <div
                      style={{
                        fontFamily: 'Poppins',
                      }}
                    >
                      Poppins
                    </div>
                  }
                />
                <Radio
                  value='Comfortaa'
                  label={
                    <div
                      style={{
                        fontFamily: 'Comfortaa',
                      }}
                    >
                      Comfortaa
                    </div>
                  }
                />
                <Radio
                  value='Inconsolata'
                  label={
                    <div
                      style={{
                        fontFamily: 'Inconsolata',
                      }}
                    >
                      Inconsolata
                    </div>
                  }
                />
                <Radio
                  value='Montserrat'
                  label={
                    <div
                      style={{
                        fontFamily: 'Montserrat',
                      }}
                    >
                      Montserrat
                    </div>
                  }
                />
                <Radio
                  value='Quicksand'
                  label={
                    <div
                      style={{
                        fontFamily: 'Quicksand',
                      }}
                    >
                      Quicksand
                    </div>
                  }
                />
              </Radio.Group>
              <Divider my='sm' />
              <Title order={5}>Change Font Size</Title>
              <Space h='xs' />
              {fontSizes.map((size) => {
                return <FontSizeSlider size={size} key={size} />;
              })}
            </Tabs.Panel>

            <Tabs.Panel value='settings' pt='xs'>
              Settings tab content
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Modal>
      {children}
    </CustomizationModalContext.Provider>
  );
}

export default useCustomizationModal;
