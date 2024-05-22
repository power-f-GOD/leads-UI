import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import { memo, useCallback, useMemo, useState } from 'react';

import type {
  ButtonProps,
  ButtonTypeMap,
  ExtendButtonBase,
  IconButtonProps,
  IconButtonTypeMap,
  MenuItemProps,
  MenuProps
} from '@mui/material';
import type { FC, Key, MouseEvent, ReactNode } from 'react';

import type { ButtonMenuOption } from 'src/types/shared';

import { SVGIcon } from './SVGIcon';
import { Text } from './Text';

const _ButtonMenu: FC<{
  flatButtonProps?: ButtonProps;
  iconButtonProps?: IconButtonProps;
  menuProps?: MenuProps;
  menuItemProps?: MenuItemProps;
  buttonConstantContent?: string | number | JSX.Element;
  buttonClassName?: string;
  options: ButtonMenuOption[];
  flatButton?: boolean;
  iconButton?: boolean;
  children?: ReactNode | ReactNode[];
  popoverPosition?: 'left' | 'center' | 'right';
}> = ({
  children,
  flatButton,
  flatButtonProps,
  iconButtonProps,
  buttonConstantContent,
  buttonClassName,
  menuProps,
  menuItemProps,
  options,
  popoverPosition = 'right'
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedOption, setSelectedOption] = useState(
    options[0]?.value || '- Select -'
  );
  const open = !!anchorEl;
  const isFlatButton = !!flatButton || !!flatButtonProps;
  const buttonProps = !isFlatButton ? iconButtonProps : flatButtonProps;
  const ButtonComponent = !isFlatButton
    ? IconButton
    : (Button as ExtendButtonBase<ButtonTypeMap> &
        ExtendButtonBase<IconButtonTypeMap>);

  const handleClick = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const renderOptions = useCallback<
    (option: ButtonMenuOption, i: number) => JSX.Element | null
  >(
    (option, i) =>
      !option.value ? null : (
        <MenuItem
          {...(menuItemProps || {})}
          className={`transition ${menuItemProps?.className || ''} ${
            option.className || ''
          }`}
          key={option.value || option.icon || i}
          disabled={option.disabled}
          title={option.title}
          style={{ color: option.color as string }}
          onClick={(e) => {
            handleClose();
            if (option.value) setSelectedOption(option?.value || '');
            if (option.action) option.action(e);
          }}>
          {option.value}
          {option.icon ? (
            <SVGIcon
              name={option.icon}
              key={option.icon}
              size="1.25em"
              className="ml-4"
            />
          ) : option.emoji ? (
            <Text className="ml-3 text-lg" key={option.emoji as Key}>
              {option.emoji}
            </Text>
          ) : (
            ''
          )}
        </MenuItem>
      ),
    [handleClose, menuItemProps]
  );

  return (
    <>
      <ButtonComponent
        {...(buttonProps || {})}
        id="button-menu"
        aria-controls="button-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        // color={buttonProps?.color || 'primary'}
        className={`text-capitalize disabled:bg-transparent ${
          buttonClassName || buttonProps?.className || ''
        }`}>
        {children || buttonConstantContent || selectedOption}
        {isFlatButton && <SVGIcon name="ellipsis" className="ml-1" />}
      </ButtonComponent>

      <Menu
        {...(menuProps || {})}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        disableRestoreFocus
        onClose={handleClose}
        sx={{
          '& .MuiPaper-root': {
            marginLeft: '1.25rem',
            marginTop: '-0.75rem',
            borderRadius: '0.75rem',
            padding: '0.5rem',
            boxShadow: '0 0.25rem 0.75rem 0 rgba(0, 0, 0, 0.1)'
          }
        }}
        MenuListProps={useMemo(
          () => ({
            'aria-labelledby': 'button-menu',
            sx: {
              '&': {
                padding: '0'
              },
              '.MuiMenuItem-root': {
                fontSize: '0.75rem',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.5rem'
              }
            }
          }),
          []
        )}
        anchorOrigin={useMemo(
          () => ({
            vertical: 'top',
            horizontal: popoverPosition
          }),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          []
        )}
        transformOrigin={useMemo(
          () => ({
            vertical: 'top',
            horizontal: 'left'
          }),
          // eslint-disable-next-line react-hooks/exhaustive-deps
          []
        )}>
        {options.map(renderOptions)}
      </Menu>
    </>
  );
};

export const ButtonMenu = memo(_ButtonMenu);
