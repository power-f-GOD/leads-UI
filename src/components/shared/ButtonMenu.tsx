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
        classes={{ paper: 'backdrop-blur-sm bg-white/70 dark:bg-black/50' }}
        MenuListProps={useMemo(
          () => ({
            'aria-labelledby': 'button-menu'
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
